/* src/routes/test-suites.router.ts */

import { Router, Request, Response } from 'express';
import { logger } from "../logger";

import { TestSuite } from '../entity';
import { TestSuitesController } from '../controller';


// Assign router to the express.Router() instance
const router: Router = Router();

/* GET /api/test-suites */
/* Get All Test Suites */
router.get('/', (req: Request, res: Response) => {
    TestSuitesController.getAll().then((testSuites: TestSuite[]) => {
        // respond with all test suites
        res.status(200).json(testSuites);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* GET /api/test-suites/:id */
/* Get Test Suite with ID */
router.get('/:id', (req: Request, res: Response) => {
    TestSuitesController.getById(parseInt(req.params.id)).then((testSuite: TestSuite) => {
        // resond with test suite
        res.status(200).json(testSuite);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/test-suites/insert */
/* Insert Test Suite */
router.post('/insert', (req: Request, res: Response) => {
    TestSuitesController.insert(req.body).then((id: number) => {
        // resond with id of new test suite
        res.status(200).json({id: id});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/test-suites/update */
/* Update Test Suite */
router.post('/update', (req: Request, res: Response) => {
    TestSuitesController.update(req.body).then((success: boolean) => {
        // respond with successful update
        res.status(200).json({success: success});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/test-suites/delete */
/* Delete Test Suite */
router.post('/delete', (req: Request, res: Response) => {
    TestSuitesController.delete(req.body).then((success: boolean) => {
        // respond with successful delete
        res.status(200).json({success: success});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

// Export the express.Router() instance to be used by server.ts
export const TestSuitesRouter: Router = router;