/* src/routes/results.router.ts */

import { Router, Request, Response } from 'express';
import { logger } from "../logger";

import { Result } from '../entity';
import { ResultsController } from '../controller';


// Assign router to the express.Router() instance
const router: Router = Router();

/* GET /api/results */
/* Get All Results */
router.get('/', (req: Request, res: Response) => {
    ResultsController.getAll().then((results: Result[]) => {
        // respond with all results
        res.status(200).json(results);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* GET /api/results/:id */
/* Get Result with ID */
router.get('/:id', (req: Request, res: Response) => {
    ResultsController.getById(parseInt(req.params.id)).then((result: Result) => {
        // resond with result
        res.status(200).json(result);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/results/insert */
/* Insert Result */
router.post('/insert', (req: Request, res: Response) => {
    ResultsController.insert(req.body).then((result: Result) => {
        // resond with id of new result
        res.status(200).json(result);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/results/update */
/* Update Result */
router.post('/update', (req: Request, res: Response) => {
    ResultsController.update(req.body).then((success: boolean) => {
        // respond with successful update
        res.status(200).json({success: success});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/results/delete */
/* Delete Result */
router.post('/delete', (req: Request, res: Response) => {
    ResultsController.delete(req.body).then((success: boolean) => {
        // respond with successful delete
        res.status(200).json({success: success});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

// Export the express.Router() instance to be used by server.ts
export const ResultsRouter: Router = router;