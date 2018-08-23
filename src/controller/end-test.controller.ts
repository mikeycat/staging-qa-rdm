/* src/controller/end-test.controller.ts */

import { logger } from '../logger';
import { TestCase, ActiveTest, Result } from '../entity';
import { ActiveTestsController, CronJobsController } from './';
import { ResultsController } from '.';
import { TestCasesController } from './test-cases.controller';
const request = require('request');

export interface IEndTestResult {
    test_suite_name?: string;
    configuration?: string;
    test_cases?: string;
    passed?: string;
    failed?: string;
    errors?: string;
    start_time?: string;
    end_time?: string;
    detailed_logs?: string[];
    screenshots_and_video?: string[];
}

export class EndTestController {
    /**
     * Get End Test Execution Api Url
     *
     * @returns String of Api Url
     */
    static getExecutionUrl(testCase: TestCase):string {
        return "https://endtest.io/api.php?action=runTestSuite&appId=" + testCase.test_suite.app_id +
        "&appCode=" + testCase.test_suite.app_code + "&testSuite=" + testCase.test_suite.test_suite + "&selectedPlatform=" + testCase.operating_system.platform.value +
        "&selectedOs=" + testCase.operating_system.value + "&selectedBrowser=" + testCase.browser.value +
        "&selectedResolution=d&selectedLocation=sanfrancisco&selectedQuitOnError=q0&selectedCases=all&writtenAdditionalNotes=";
    }
    /**
     * Get EndTest Fetch Results Api Url
     *
     * @returns String of Api Url
     */
    static getFetchUrl(activeTest: ActiveTest):string {
        return "https://endtest.io/api.php?action=getResults&appId=" + activeTest.test_case.test_suite.app_id +
        "&appCode=" + activeTest.test_case.test_suite.app_code + "&&hash=" + activeTest.hash + "&format=json";
    }
    /**
     * Execute Test Case
     *
     * @returns String of hash value from endtest
     */
    static executeTestCase(testCase: TestCase):Promise<string> {
        return new Promise((resolve, reject) => {
            request(this.getExecutionUrl(testCase), (err, res, body: string) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (body.length < 25 || body.length > 30) {
                    reject(body);
                    return;
                }
                resolve(body);
                return;
            });
        });
    }
    /**
     * Execute Active Test
     *
     * @returns Boolean of successful execution
     */
    static executeActiveTest(activeTest: ActiveTest):Promise<boolean> {
        return new Promise((resolve, reject) => {
            ActiveTestsController.countHash().then(num => {
                if (num < CronJobsController.MAX_QUEUE) {
                    this.executeTestCase(activeTest.test_case).then(hash => {
                        activeTest.hash = hash;
                        ActiveTestsController.update(activeTest).then(result => {
                            resolve(result);
                        }).catch(err => {
                            logger.error(err);
                            reject(err);
                        });
                    }).catch(err => {
                        logger.error(err);
                        resolve();
                    });
                } else {
                    resolve();
                }
            });
        });
    }
    /**
     * Fetch Results from Test Case
     *
     * @returns TestCase of results from endtest
     */
    static getResultsTestCase(activeTest: ActiveTest):Promise<TestCase> {
        return new Promise((resolve, reject) => {
            request(this.getFetchUrl(activeTest), (err, res, body) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (body == "Test is still running.") {
                    resolve();
                    return;
                }

                if (body == "Erred.") {
                    ActiveTestsController.delete(activeTest).then(() => {
                        TestCasesController.delete(activeTest.test_case).then(() => {
                            resolve();
                            return;
                        }).catch(err => {
                            logger.error(err);
                            reject(err);
                        });
                    }).catch(err => {
                        logger.error(err);
                        reject(err);
                    });
                }

                try {
                    var result = JSON.parse(body);
                } catch (e) {
                    resolve();
                    return;
                }

                body = <IEndTestResult>result;
                activeTest.test_case.date = body.end_time;
                activeTest.test_case.passed = body.passed;
                activeTest.test_case.failed = body.failed;
                activeTest.test_case.error = body.errors;

                this.parseDetailedLogs(body.detailed_logs).then(results => {
                    if (results.length == 0) {
                        activeTest.test_case.results = [];
                        resolve(activeTest.test_case);
                        return;
                    }

                    results.forEach((result, index) => {
                        ResultsController.insert(result).then(result => {
                            results[index] = result;

                            if (index == (results.length - 1)) {
                                activeTest.test_case.results = results;
                                resolve(activeTest.test_case);
                            }
                        }).catch(err => {
                            logger.error(err);
                            reject(err);
                        })
                    });
                }).catch(err => {
                    logger.error(err);
                    reject(err);
                });
            });
        });
    }
    /**
     * Parse Results from EndTest Api
     *
     * @returns Result[] from endtest api
     */
    static parseDetailedLogs(detailed_logs: string[]): Promise<Result[]>  {
        return new Promise((resolve, reject) => {
            let results: Result[] = [];
            detailed_logs.forEach((element, index) => {
                if (element.indexOf('[FAILED]') !== -1) {
                    results.push({
                        error_code: 1,
                        value: element
                    });
                } else if (element.indexOf('[ERROR]') !== -1) {
                    results.push({
                        error_code: 2,
                        value: element
                    });
                }
                if (index == (detailed_logs.length - 1)) {

                    resolve(results);
                }
            });
        });
    }
    /**
     * Fetch Results from EndTest
     *
     * @returns TestCase completed with results
     */
    static fetchResults(activeTest: ActiveTest):Promise<TestCase> {
        return new Promise((resolve, reject) => {
            this.getResultsTestCase(activeTest).then(result => {
                resolve(result);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
}