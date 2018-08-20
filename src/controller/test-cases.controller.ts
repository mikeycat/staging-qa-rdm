/* src/controller/test-cases.controller.ts */

import { getManager } from "typeorm";
import { logger } from "../logger";

import { TestCase, TestSuite } from '../entity';
import { ActiveTestsController } from './active-tests.controller';
import { resolve } from "url";

export class TestCasesController {
    /**
     * Get All Test Cases.
     *
     * @returns Array of Test Cases.
     */
    static getAll():Promise<TestCase[]> {
        return new Promise((resolve, reject) => {
            const testCasesRepository = getManager().getRepository(TestCase);
            testCasesRepository.find({
                order: {
                    id: "ASC"
                },
                relations: [
                    "test_suite",
                    "browser",
                    "operating_system",
                    "results"
                ]
            }).then(testCase => {
                resolve(testCase);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    /**
     * Get All Test Cases. Group by Test Suite.
     *
     * @returns Array of Test Cases
     */
    static getAllGroupByTestSuite():Promise<TestCase[]> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(TestCase);
            repository.createQueryBuilder("test_case")
                      .leftJoinAndSelect(TestSuite, "test_suite", 'test_suite.id = "testSuiteId"')
                      .select('test_suite')
                      .addSelect("SUM(test_case.passed)", "passed")
                      .addSelect("SUM(test_case.failed)", "failed")
                      .addSelect("SUM(test_case.error)", "error")
                      .groupBy('"testSuiteId"')
                      .addGroupBy('test_suite.id')
                      .getRawMany().then((testCases) => {

                let rtn: TestCase[] = [];
                testCases.forEach((element, index) => {
                    rtn.push({
                        date: null,
                        operating_system: null,
                        browser: null,
                        passed: element.passed,
                        failed: element.failed,
                        error: element.error,
                        test_suite: {
                            id: element.test_suite_id,
                            name: element.test_suite_name,
                            app_id: element.test_suite_app_id,
                            app_code: element.test_suite_app_code,
                            test_suite: element.test_suite_test_suite
                        }
                    });

                    if (index == (testCases.length - 1)) {
                        resolve(rtn);
                    }
                });
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    /**
     * Get All Test Cases. Group by Date.
     *
     * @returns Array of Test Cases
     */
    static getAllGroupByDate():Promise<TestCase[]> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(TestCase);
            repository.createQueryBuilder("test_case")
                      .select('"date"', "date")
                      .addSelect("SUM(test_case.passed)", "passed")
                      .addSelect("SUM(test_case.failed)", "failed")
                      .addSelect("SUM(test_case.error)", "error")
                      .groupBy('"date"')
                      .getRawMany().then(testCases => {

                resolve(testCases);
            });
        });
    }
    /**
     * Get Test Cases by Test Suite
     *
     * @param testSuite TestSuite value
     * @returns TestCases
     */
    static getByTestSuite(testSuite: TestSuite):Promise<TestCase[]> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(TestCase);
            repository.find({
                where: {
                    test_suite: testSuite
                },
                order: {
                    id: "ASC"
                },
                relations: [
                    "test_suite",
                    "browser",
                    "operating_system"
                ]
            }).then(testCases => {
                resolve(testCases);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    /**
     * Get Test Cases by Date
     *
     * @param Date date value
     * @returns TestCases
     */
    static getByTestSuiteGroupDate(testSuite: TestSuite):Promise<TestCase[]> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(TestCase);
            repository.createQueryBuilder("test_case")
                      .leftJoinAndSelect(TestSuite, "test_suite", 'test_suite.id = "testSuiteId"')
                      .select('test_suite')
                      .addSelect('"date"', "date")
                      .addSelect("SUM(test_case.passed)", "passed")
                      .addSelect("SUM(test_case.failed)", "failed")
                      .addSelect("SUM(test_case.error)", "error")
                      .where('test_suite.id = :id', { id: testSuite.id })
                      .groupBy('"testSuiteId"')
                      .addGroupBy('"date"')
                      .addGroupBy('test_suite.id')
                      .getRawMany().then((testCases) => {

                let rtn: TestCase[] = [];
                testCases.forEach((element, index) => {
                    rtn.push({
                        date: element.date,
                        operating_system: null,
                        browser: null,
                        passed: element.passed,
                        failed: element.failed,
                        error: element.error,
                        test_suite: {
                            id: element.test_suite_id,
                            name: element.test_suite_name,
                            app_id: element.test_suite_app_id,
                            app_code: element.test_suite_app_code,
                            test_suite: element.test_suite_test_suite
                        }
                    });

                    if (index == (testCases.length - 1)) {
                        resolve(rtn);
                    }
                });
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    /**
     * Get Test Cases Total by Test Suite
     *
     * @param testSuite TestSuite value
     * @returns TestCases
     */
    static getTotalsByTestSuite(testSuite: TestSuite):Promise<TestCase[]> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(TestCase);
            repository.createQueryBuilder("test_case")
                      .select("SUM(test_case.passed)", "passed")
                      .addSelect("SUM(test_case.failed)", "failed")
                      .addSelect("SUM(test_case.error)", "error")
                      .where('"testSuiteId" = :id', { id: testSuite.id })
                      .getRawOne().then(testCases => {

                resolve(testCases);
            }).catch(err => {
                logger.error(err);
                reject(err);
            })
        });
    }
    /**
     * Get Test Cases Totals
     *
     * @param testSuite TestSuite value
     * @returns TestCases
     */
    static getAllTotals():Promise<TestCase[]> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(TestCase);
            repository.createQueryBuilder("test_case")
                      .leftJoinAndSelect("test_case.test_suite", "test_suite")
                      .select('"testSuiteId"', "test_suite_id")
                      .addSelect("test_suite.name", "name")
                      .addSelect("SUM(test_case.passed)", "passed")
                      .addSelect("SUM(test_case.failed)", "failed")
                      .addSelect("SUM(test_case.error)", "error")
                      .groupBy('"testSuiteId"')
                      .addGroupBy('"name"')
                      .getRawMany().then(testCases => {

                resolve(testCases);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    /**
     * Get Test Case with given id value.
     *
     * @param id id value for Test Case wanted.
     * @returns Test Case
     */
    static getById(id: number):Promise<TestCase> {
        return new Promise((resolve, reject) => {
            const testCasesRepository = getManager().getRepository(TestCase);
            testCasesRepository.findOne(id, {
                order: {
                    id: "ASC"
                },
                relations: [
                    "test_suite",
                    "browser",
                    "operating_system"
                ]
            }).then(testCase => {
                resolve(testCase);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    /**
     * Insert a Test Case
     *
     * @param result Test Case values to insert
     * @return id value of newly created test case
     */
    static insert(testCase: TestCase):Promise<number> {
        return new Promise((resolve, reject) => {
            const testCasesRepository = getManager().getRepository(TestCase);
            const newTestCase = testCasesRepository.create(testCase);
            testCasesRepository.save(newTestCase).then(testCase => {
                ActiveTestsController.insert({test_case: testCase}).then(result => {
                    resolve(testCase.id);
                }).catch(err => {
                    logger.error(err);
                    reject(err);
                });
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    /**
     * Update a Test Case
     *
     * @param session Test Case values to update
     * @return boolean of successful update of a test case
     */
    static update(testCase: TestCase):Promise<boolean> {
        return new Promise((resolve, reject) => {
            const testCasesRepository = getManager().getRepository(TestCase);

            if (typeof testCase == 'undefined') {
                resolve();
                return;
            }

            testCasesRepository.findOne(testCase.id).then(selectedTestCase => {
                if (testCase.date != null) {
                    if (!Date.parse(testCase.date)) {
                        let tmp = new Date(Date.now());
                        testCase.date = tmp.toISOString();
                    }
                    selectedTestCase.date = testCase.date;
                }
                if (testCase.passed != null) {
                    selectedTestCase.passed = testCase.passed;
                }
                if (testCase.failed != null) {
                    selectedTestCase.failed = testCase.failed;
                }
                if (testCase.error != null) {
                    selectedTestCase.error = testCase.error;
                }
                if (testCase.test_suite != null) {
                    selectedTestCase.test_suite = testCase.test_suite;
                }
                if (testCase.browser != null) {
                    selectedTestCase.browser = testCase.browser;
                }
                if (testCase.operating_system != null) {
                    selectedTestCase.operating_system = testCase.operating_system;
                }
                if (testCase.results != null) {
                    selectedTestCase.results = testCase.results;
                }
                testCasesRepository.save(selectedTestCase).then(() => {
                    resolve(true);
                }).catch(err => {
                    if (err.code == '23505') {
                        resolve();
                        return;
                    }
                    logger.error(err);
                    reject(err);
                });
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    /**
     * Delete a Test Case
     *
     * @param session Test Case to delete
     * @return boolean of successful delete of a test case
     */
    static delete(testCase: TestCase):Promise<boolean> {
        return new Promise((resolve, reject) => {
            const testCasesRepository = getManager().getRepository(TestCase);
            testCasesRepository.findOne(testCase.id).then(selectedTestCase => {
                testCasesRepository.remove(selectedTestCase).then(() => {
                    resolve(true);
                }).catch(err => {
                    logger.error(err);
                    reject(err);
                });
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
}