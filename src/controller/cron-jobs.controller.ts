/* src/controller/cron-jobs.controller.ts */

import { logger } from "../logger";
import { ActiveTestsController } from './active-tests.controller';
import { EndTestController } from './end-test.controller';
import { TestCasesController } from "./test-cases.controller";
import { TestSuitesController } from "./test-suites.controller";
import { OperatingSystemsController } from "./operating-systems.controller";
import { TestCase } from "../entity";

export class CronJobsController {
    static MAX_QUEUE: number = 8;

    static handleQueue():Promise<any> {
        return new Promise((resolve, reject) => {
            ActiveTestsController.countHash().then(hashNum => {
                console.log("Runs - " + hashNum);

                ActiveTestsController.countNullHash().then(num => {
                    console.log("Queued - " + num);
                    console.log("Max - " + (this.MAX_QUEUE - hashNum));
    
                    if (hashNum < this.MAX_QUEUE) {
                        ActiveTestsController.getAllNullHashLimit(this.MAX_QUEUE - num).then(activeTests => {
                            activeTests.forEach((activeTest, index) => {
                                EndTestController.executeActiveTest(activeTest).then(result => {
                                    if (index == activeTests.length) {
                                        resolve(result);
                                    }
                                }).catch(err => {
                                    logger.error(err);
                                    reject(err);
                                });
                            })
                        }).catch(err => {
                            logger.error(err);
                            reject(err);
                        })
                    }
    
                }).catch(err => {
                    logger.error(err);
                    reject(err);
                });

                if (hashNum > 0) {
                    ActiveTestsController.getAllHash().then(activeTests => {
                        activeTests.forEach((activeTest, index) => {
                            EndTestController.fetchResults(activeTest).then(testCase => {
                                if (typeof testCase != "undefined") {
                                    console.log("Cron Job - Update Test Case");
                                    TestCasesController.update(testCase).then(() => {
                                        console.log("Cron Job - Active Test Delete");
                                        ActiveTestsController.delete(activeTest).then(result => {
                                            if (index == (activeTests.length - 1)) {
                                                resolve(result);
                                            }
                                        }).catch(err => {
                                            logger.error("..." + err);
                                            reject(err);
                                        });
                                    }).catch(err => {
                                        logger.error("...." + err);
                                        reject(err);
                                    });
                                } else {
                                    if (index == (activeTests.length - 1)) {
                                        resolve(true);
                                    }
                                }                           
                            }).catch(err => {
                                logger.error(err);
                                reject(err);
                            });
                        });
                    }).catch(err => {
                        logger.error(err);
                        reject(err);
                    })
                }
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }


    static handleNightly(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            OperatingSystemsController.getAll().then(operatingSystems => {
                TestSuitesController.getAll().then(testSuites => {
                    testSuites.forEach((testSuite, index) => {
                        var operatingSystem = operatingSystems[Math.floor(Math.random() * operatingSystems.length)];
                        var browser = operatingSystem.browsers[Math.floor(Math.random() * operatingSystem.browsers.length)];

                        let testCase: TestCase = {
                            test_suite: testSuite,
                            operating_system: operatingSystem,
                            browser: browser
                        }

                        TestCasesController.insert(testCase).then(result => {
                            if (index == (testSuites.length - 1)) {
                                resolve(true);
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
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
}