/* src/controller/browsers.controller.ts */

import { getManager } from "typeorm";
import { logger } from "../logger";

import { Browser } from '../entity';

export class BrowsersController {
    static getAll():Promise<Browser[]> {
        return new Promise((resolve, reject) => {
            const browserRepository = getManager().getRepository(Browser);
            browserRepository.find({ relations: ["operating_systems"] }).then(browsers => {
                resolve(browsers);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static getById(id: number):Promise<Browser> {
        return new Promise((resolve, reject) => {
            const browserRepository = getManager().getRepository(Browser);
            browserRepository.findOne(id, { relations: ["operating_systems"] }).then(browser => {
                resolve(browser);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static insert(browser: Browser):Promise<number> {
        return new Promise((resolve, reject) => {
            const browserRepository = getManager().getRepository(Browser);
            const newBrowser = browserRepository.create(browser);
            browserRepository.save(newBrowser).then(browser => {
                resolve(browser.id);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static update(browser: Browser):Promise<boolean> {
        return new Promise((resolve, reject) => {
            const browserRepository = getManager().getRepository(Browser);
            browserRepository.findOne(browser.id).then(selectedBrowser => {
                if (browser.name != null) {
                    selectedBrowser.name = browser.name;
                }
                if (browser.value != null) {
                    selectedBrowser.value = browser.value;
                }
                if (browser.operating_systems != null) {
                    selectedBrowser.operating_systems = browser.operating_systems;
                }
                browserRepository.save(selectedBrowser).then(() => {
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
    static delete(browser: Browser):Promise<boolean> {
        return new Promise((resolve, reject) => {
            const browserRepository = getManager().getRepository(Browser);
            browserRepository.findOne(browser.id).then(selectedBrowser => {
                browserRepository.remove(selectedBrowser).then(() => {
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