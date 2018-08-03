const CronJob = require('cron').CronJob;
import { CronJobsController } from './../controller';

export const nightlyJob = new CronJob({
    cronTime: '0 0 * * *', // Every night at midnight
    onTick: () => {
        CronJobsController.handleNightly().then(() => { 
            // Continue running
        }).catch(err => {
            console.log(err);
            nightlyJob.stop();
        })
    },
    onComplete: () => {
        console.log("Cron Job - Nightly - [STOPPED]");
    },
    start: false,
    runOnInit: false,
    timeZone: 'America/New_York'
});