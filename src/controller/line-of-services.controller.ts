/* src/controller/line-of-service.ts */

import { getManager } from "typeorm";
import { logger } from "../logger";

import { LineOfService } from '../entity';

export class LineOfServicesController {
    static getAll():Promise<LineOfService[]> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(LineOfService);
            repository.find().then(lineOfServices => {
                resolve(lineOfServices);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static getById(id: number):Promise<LineOfService> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(LineOfService);
            repository.findOne(id).then(lineOfService => {
                resolve(lineOfService);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static insert(lineOfService: LineOfService):Promise<number> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(LineOfService);
            const newLineOfService = repository.create(lineOfService);
            repository.save(newLineOfService).then(lineOfService => {
                resolve(lineOfService.id);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static update(lineOfService: LineOfService):Promise<boolean> {
        return new Promise((resolve, reject) => {
        const repository = getManager().getRepository(LineOfService);
            repository.findOne(lineOfService.id).then(selectedLineOfService => {
                if (lineOfService.name != null) {
                selectedLineOfService.name = lineOfService.name;
                }
                repository.save(selectedLineOfService).then(() => {
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
    static delete(lineOfService: LineOfService):Promise<boolean> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(LineOfService);
            repository.findOne(lineOfService.id).then(selectedLineOfService => {
                repository.remove(selectedLineOfService).then(() => {
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
