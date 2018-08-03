/* src/controller/operating-systems.controller.ts */

import { getManager } from "typeorm";
import { logger } from "../logger";

import { OperatingSystem } from '../entity';

export class OperatingSystemsController {
    /**
     * Get All Operating Systems.
     * 
     * @returns Array of Operating Systems.
     */
    static getAll():Promise<OperatingSystem[]> {
        return new Promise((resolve, reject) => {
            const operatingSystemsRepository = getManager().getRepository(OperatingSystem);
            operatingSystemsRepository.find({ relations: ["browsers", "platform"] }).then(operatingSystems => {
                resolve(operatingSystems);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    /**
     * Get Operating System with given id value.
     * 
     * @param id id value for Operating System wanted.
     * @returns Operating System
     */
    static getById(id: number):Promise<OperatingSystem> {
        return new Promise((resolve, reject) => {
            const operatingSystemsRepository = getManager().getRepository(OperatingSystem);
            operatingSystemsRepository.findOne(id, { relations: ["browsers", "platform"] }).then(operatingSystem => {
                resolve(operatingSystem);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    /**
     * Insert an Operating System
     * 
     * @param operatingSystem Operating System values to insert
     * @return id value of newly created operating system     
     */
    static insert(operatingSystem: OperatingSystem):Promise<number> {
        return new Promise((resolve, reject) => {
            const operatingSystemsRepository = getManager().getRepository(OperatingSystem);
            const newOperatingSystem = operatingSystemsRepository.create(operatingSystem);
            operatingSystemsRepository.save(newOperatingSystem).then(operatingSystem => {
                console.log(operatingSystem);
                resolve(operatingSystem.id);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    /**
     * Update an Operating System
     * 
     * @param operatingSystem Operating System values to update
     * @return boolean of successful update of an operating system     
     */
    static update(operatingSystem: OperatingSystem):Promise<boolean> {
        return new Promise((resolve, reject) => {
            const operatingSystemsRepository = getManager().getRepository(OperatingSystem);
            operatingSystemsRepository.findOne(operatingSystem.id).then(selectedOperatingSystem => {
                if (operatingSystem.name != null) {
                    selectedOperatingSystem.name = operatingSystem.name;
                }
                if (operatingSystem.value != null) {
                    selectedOperatingSystem.value = operatingSystem.value;
                }
                if (operatingSystem.platform != null) {
                    selectedOperatingSystem.platform = operatingSystem.platform;
                }
                if (operatingSystem.browsers != null) {
                    selectedOperatingSystem.browsers = operatingSystem.browsers;
                }
                operatingSystemsRepository.save(selectedOperatingSystem).then(() => {
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
     * Delete an Operating System
     * 
     * @param operatingSystem Operating System to delete
     * @return boolean of successful delete of an operating system      
     */
    static delete(operatingSystem: OperatingSystem):Promise<boolean> {
        return new Promise((resolve, reject) => {
            const operatingSystemsRepository = getManager().getRepository(OperatingSystem);
            operatingSystemsRepository.findOne(operatingSystem.id).then(selectedOperatingSystem => {
                operatingSystemsRepository.remove(selectedOperatingSystem).then(() => {
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