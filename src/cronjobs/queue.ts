const CronJob = require('cron').CronJob;
import { CronJobsController } from './../controller';

export const queueJob = new CronJob({
    cronTime: '*/5 * * * *', // Every 5 minutes
    onTick: () => {
        CronJobsController.handleQueue().then(() => {
            //Continue running
        }).catch(err => {
            console.log(err);
            queueJob.stop();
        });
    },
    onComplete: () => {
        console.log("Cron Job - Queue - [STOPPED]");
    },
    start: false,
    runOnInit: false,
    timeZone: 'America/New_York'
});