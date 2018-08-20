/* src/controller/results.controller.ts */

import { getManager } from "typeorm";
import { logger } from "../logger";

import { Result } from '../entity';

export class ResultsController {
    /**
     * Get All Results.
     *
     * @returns Array of Operating Systems.
     */
    static getAll():Promise<Result[]> {
        return new Promise((resolve, reject) => {
            const resultsRepository = getManager().getRepository(Result);
            resultsRepository.find().then(results => {
                resolve(results);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    /**
     * Get Result with given id value.
     *
     * @param id id value for Result wanted.
     * @returns Result
     */
    static getById(id: number):Promise<Result> {
        return new Promise((resolve, reject) => {
            const resultsRepository = getManager().getRepository(Result);
            resultsRepository.findOne(id).then(result => {
                resolve(result);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    /**
     * Insert a Result
     *
     * @param result Result values to insert
     * @return id value of newly created result
     */
    static insert(result: Result):Promise<Result> {
        return new Promise((resolve, reject) => {
            const resultsRepository = getManager().getRepository(Result);
            const newResult = resultsRepository.create(result);
            resultsRepository.findOne(newResult).then(result => {
                if (typeof result == "undefined") {
                    resultsRepository.save(newResult).then(result => {
                        resolve(result);
                    }).catch(err => {
                        logger.error(err);
                        reject(err);
                    });
                } else {
                    resolve(result);
                }
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    /**
     * Update a Result
     *
     * @param result Result values to update
     * @return boolean of successful update of a result
     */
    static update(result: Result):Promise<boolean> {
        return new Promise((resolve, reject) => {
            const resultsRepository = getManager().getRepository(Result);
            resultsRepository.findOne(result.id).then(selectedResult => {
                if (result.value != null) {
                    selectedResult.value = result.value;
                }
                if (result.test_cases != null) {
                    selectedResult.test_cases = result.test_cases;
                }
                resultsRepository.save(selectedResult).then(() => {
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
     * Delete a Result
     *
     * @param Result Result to delete
     * @return boolean of successful delete of an operating system
     */
    static delete(result: Result):Promise<boolean> {
        return new Promise((resolve, reject) => {
            const resultsRepository = getManager().getRepository(Result);
            resultsRepository.findOne(result.id).then(selectedResult => {
                resultsRepository.remove(selectedResult).then(() => {
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