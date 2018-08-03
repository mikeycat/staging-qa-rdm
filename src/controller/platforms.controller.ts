/* src/controller/platforms.controller.ts */

import { getManager } from "typeorm";
import { logger } from "../logger";

import { Platform } from '../entity';

export class PlatformsController {
    static getAll():Promise<Platform[]> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(Platform);
            repository.find().then(platforms => {
                resolve(platforms);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static getById(id: number):Promise<Platform> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(Platform);
            repository.findOne(id).then(platform => {
                resolve(platform);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static insert(platform: Platform):Promise<number> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(Platform);
            const newPlatform = repository.create(platform);
            repository.save(newPlatform).then(platform => {
                resolve(platform.id);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static update(platform: Platform):Promise<boolean> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(Platform);
            repository.findOne(platform.id).then(selectedPlatform => {
                if (platform.name != null) {
                    selectedPlatform.name = platform.name;
                }
                if (platform.value != null) {
                    selectedPlatform.value = platform.value;
                }
                repository.save(selectedPlatform).then(() => {
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
    static delete(platform: Platform):Promise<boolean> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(Platform);
            repository.findOne(platform.id).then(selectedPlatform => {
                repository.remove(selectedPlatform).then(() => {
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