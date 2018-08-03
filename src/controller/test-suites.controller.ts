/* src/controller/sessions.controller.ts */

import { getManager } from "typeorm";
import { logger } from "../logger";

import { TestSuite } from '../entity';

export class TestSuitesController {
    /**
     * Get All Test Suites.
     * 
     * @returns Array of Test Suites.
     */
    static getAll():Promise<TestSuite[]> {
        return new Promise((resolve, reject) => {
            const testSuitesRepository = getManager().getRepository(TestSuite);
            testSuitesRepository.find({ relations: ["line_of_service"] }).then(testSuites => {
                resolve(testSuites);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    /**
     * Get Test Suite with given id value.
     * 
     * @param id id value for Test Suite wanted.
     * @returns Test Suite
     */
    static getById(id: number):Promise<TestSuite> {
        return new Promise((resolve, reject) => {
            const testSuitesRepository = getManager().getRepository(TestSuite);
            testSuitesRepository.findOne(id, { relations: ["line_of_service"] }).then(testSuite => {
                resolve(testSuite);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    /**
     * Insert a Test Suite
     * 
     * @param testSuite Test Suite values to insert
     * @return id value of newly created test suite   
     */
    static insert(testSuite: TestSuite):Promise<number> {
        return new Promise((resolve, reject) => {
            const testSuitesRepository = getManager().getRepository(TestSuite);
            const newTestSuite = testSuitesRepository.create(testSuite);
            testSuitesRepository.save(newTestSuite).then(session => {
                resolve(session.id);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    /**
     * Update a Test Suite
     * 
     * @param testSuite Test Suite values to update
     * @return boolean of successful update of a test suite    
     */
    static update(testSuite: TestSuite):Promise<boolean> {
        return new Promise((resolve, reject) => {
            const testSuitesRepository = getManager().getRepository(TestSuite);
            testSuitesRepository.findOne(testSuite.id).then(selectedTestSuite => {
                if (testSuite.name != null) {
                    selectedTestSuite.name = testSuite.name;
                }
                if (testSuite.app_id != null) {
                    selectedTestSuite.app_id = testSuite.app_id;
                }
                if (testSuite.app_code != null) {
                    selectedTestSuite.app_code = testSuite.app_code;
                }
                if (testSuite.test_suite != null) {
                    selectedTestSuite.test_suite = testSuite.test_suite;
                }
                if (testSuite.test_cases != null) {
                    selectedTestSuite.test_cases = testSuite.test_cases;
                }
                testSuitesRepository.save(selectedTestSuite).then(() => {
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
    /**
     * Delete a Session
     * 
     * @param testSuite Test Suite to delete
     * @return boolean of successful delete of a test suite    
     */
    static delete(testSuite: TestSuite):Promise<boolean> {
        return new Promise((resolve, reject) => {
            const testSuitesRepository = getManager().getRepository(TestSuite);
            testSuitesRepository.findOne(testSuite.id).then(selectedTestSuite => {
                testSuitesRepository.remove(selectedTestSuite).then(() => {
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