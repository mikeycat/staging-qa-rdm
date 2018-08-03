import "reflect-metadata";
import {createConnection} from "typeorm";

import * as express from 'express';
const path = require('path');
const bodyParser = require('body-parser');
import { 
    ActiveTestsRouter,
    TestSuitesRouter,
    TestCasesRouter,
    BrowsersRouter,
    LinesOfServiceRouter,
    OperatingSystemsRouter,
    PlatformsRouter,
    ResultsRouter,
    SessionsRouter
} from './routes';

import {
    queueJob,
    nightlyJob
} from './cronjobs';

createConnection().then(async connection => {

    // Create a new express application instance
    const app: express.Application = express();
    // The port the express app will listen on
    const port: string = process.env.PORT || "3000";

    // Parsers for POST data
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // Point static path to dist
    app.use(express.static(path.join(__dirname, './../dist')));

    // Mount the ActiveTestsController at the /api/active-tests route
    app.use('/api/active-tests', ActiveTestsRouter);
    // Mount the BrowserController at the /api/browsers route
    app.use('/api/browsers', BrowsersRouter);
    // Mount the OperatingSystemsController at the /api/operating-systems route
    app.use('/api/operating-systems', OperatingSystemsRouter);
    // Mount the PlatformsController at the /api/platforms route
    app.use('/api/platforms', PlatformsRouter);
    // Mount the LineOfServicesController at the /api/line-of-services route
    app.use('/api/lines-of-service/', LinesOfServiceRouter);
    // Mount the BrowserController at the /api/browsers route
    app.use('/api/results', ResultsRouter);
    // Mount the BrowserController at the /api/browsers route
    app.use('/api/sessions', SessionsRouter);
    // Mount the TestCasesController at the /api/test-suites route
    app.use('/api/test-cases', TestCasesRouter);
    // Mount the TestSuitesController at the /api/test-suites route
    app.use('/api/test-suites', TestSuitesRouter);

    // Catch all other routes and return the index file
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './../dist/index.html'));
    });

    // Serve the application at the given port
    app.listen(port, () => {
        // Success callback
        console.log(`Listening at http://localhost:${port}/`);
        queueJob.start();
        nightlyJob.start();
    });
    
}).catch(error => console.log(error));
