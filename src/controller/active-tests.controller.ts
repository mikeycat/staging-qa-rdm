/* src/controller/active-tests.controller.ts */

import { getManager, IsNull, Not } from "typeorm";
import { logger } from "../logger";
import { ActiveTest } from '../entity';
import { TestCasesController } from "./test-cases.controller";
import { NotificationsController } from "./notifications.controller";

export class ActiveTestsController {
    static getAll():Promise<ActiveTest[]> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(ActiveTest);
            repository.find({
                relations: [
                    "test_case",
                    "test_case.test_suite",
                    "test_case.browser",
                    "test_case.operating_system",
                    "test_case.operating_system.platform",
                    "test_case.notifications"
                ]
            }).then(activeTests => {
                resolve(activeTests);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static getAllLimit(limit: number): Promise<ActiveTest[]> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(ActiveTest);
            repository.find({
                take: limit,
                relations: [
                    "test_case",
                    "test_case.test_suite",
                    "test_case.browser",
                    "test_case.operating_system",
                    "test_case.operating_system.platform",
                    "test_case.notifications"
                ]
            }).then(activeTests => {
                resolve(activeTests);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static getAllHash(): Promise<ActiveTest[]> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(ActiveTest);
            repository.find({
                where: {
                    hash: Not(IsNull())
                },
                relations: [
                    "test_case",
                    "test_case.test_suite",
                    "test_case.browser",
                    "test_case.operating_system",
                    "test_case.operating_system.platform",
                    "test_case.notifications"
                ]
            }).then(activeTests => {
                resolve(activeTests);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static getAllHashLimit(limit: number): Promise<ActiveTest[]> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(ActiveTest);
            repository.find({
                where: {
                    hash: Not(null)
                },
                take: limit,
                relations: [
                    "test_case",
                    "test_case.test_suite",
                    "test_case.browser",
                    "test_case.operating_system",
                    "test_case.operating_system.platform",
                    "test_case.notifications"
                ]
            }).then(activeTests => {
                resolve(activeTests);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static getAllNullHashLimit(limit: number): Promise<ActiveTest[]> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(ActiveTest);
            repository.find({
                where: {
                    hash: IsNull()
                },
                take: limit,
                relations: [
                    "test_case",
                    "test_case.test_suite",
                    "test_case.browser",
                    "test_case.operating_system",
                    "test_case.operating_system.platform",
                    "test_case.notifications"
                ]
            }).then(activeTests => {
                resolve(activeTests);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static getById(id: number):Promise<ActiveTest> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(ActiveTest);
            repository.findOne(id, {
                relations: [
                    "test_case",
                    "test_case.test_suite",
                    "test_case.browser",
                    "test_case.operating_system",
                    "test_case.operating_system.platform",
                    "test_case.notifications"
                ]
            }).then(activeTest => {
                resolve(activeTest);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static insert(activeTest: ActiveTest):Promise<number> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(ActiveTest);
            const newActiveTest = repository.create(activeTest);
            repository.save(newActiveTest).then(activeTest => {
                resolve(activeTest.id);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static update(activeTest: ActiveTest):Promise<boolean> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(ActiveTest);
            repository.findOne(activeTest.id).then(selectedActiveTest => {
                if (activeTest.hash != null) {
                    selectedActiveTest.hash = activeTest.hash;
                }
                if (activeTest.test_case != null) {
                    selectedActiveTest.test_case = activeTest.test_case;
                }
                repository.save(selectedActiveTest).then(() => {
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
    static delete(activeTest: ActiveTest):Promise<boolean> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(ActiveTest);
            repository.findOne(activeTest.id, {
                relations: [
                    "test_case",
                    "test_case.test_suite",
                    "test_case.notifications",
                    "test_case.notifications.user"
                ]
            }).then(selectedActiveTest => {
                if (selectedActiveTest.test_case.notifications.length > 0) {
                    NotificationsController.send(selectedActiveTest.test_case).then(() => {
                        repository.remove(selectedActiveTest).then(() => {
                            resolve(true);
                        }).catch(err => {
                            logger.error(err);
                            reject(err);
                        });
                    }).catch(err => {
                        logger.error(err);
                        reject(err);
                    })
                } else {
                    repository.remove(selectedActiveTest).then(() => {
                        resolve(true);
                    }).catch(err => {
                        logger.error(err);
                        reject(err);
                    });
                }
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static countRows():Promise<number> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(ActiveTest);
            repository.count().then(num => {
                resolve(num);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static findAndCountHash():Promise<any> {
        return new Promise((resolve, reject ) => {
            const repository = getManager().getRepository(ActiveTest);
            repository.findAndCount({
                hash: Not(IsNull())
            }).then(value => {
                resolve(value);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static countHash():Promise<number> {
        return new Promise((resolve, reject ) => {
            const repository = getManager().getRepository(ActiveTest);
            repository.count({
                hash: Not(IsNull())
            }).then(num => {
                resolve(num);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static countNullHash():Promise<number> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(ActiveTest);
            repository.count({
                hash: IsNull()
            }).then(num => {
                resolve(num);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static findAndCountNullHash():Promise<any> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(ActiveTest);
            repository.findAndCount({
                hash: IsNull()
            }).then(value => {
                resolve(value);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
}