/* src/routes/active-tests.router.ts */

import { Router, Request, Response } from 'express';
import { logger } from "../logger";

import { ActiveTest } from '../entity';
import { ActiveTestsController } from '../controller';


// Assign router to the express.Router() instance
const router: Router = Router();

/* GET /api/active-tests */
/* Get All Active Test */
router.get('/', (req: Request, res: Response) => {
    ActiveTestsController.getAll().then((activeTests: ActiveTest[]) => {
        res.status(200).json(activeTests);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* GET /api/active-tests/:id */
/* Get Active Test with ID */
router.get('/:id', (req: Request, res: Response) => {
    ActiveTestsController.getById(parseInt(req.params.id)).then((activeTest: ActiveTest) => {
        // resond with active test
        res.status(200).json(activeTest);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/active-tests/insert */
/* Insert Active Test */
router.post('/insert', (req: Request, res: Response) => {
    ActiveTestsController.insert(req.body).then((id: number) => {
        // resond with new active test id
        res.status(200).json({id: id});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/active-tests/update */
/* Update Active Test */
router.post('/update', (req: Request, res: Response) => {
    ActiveTestsController.update(req.body).then((success: boolean) => {
        // respond with successful update
        res.status(200).json({success: success});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/active-tests/delete */
/* Delete Active Test */
router.post('/delete', (req: Request, res: Response) => {
    ActiveTestsController.delete(req.body).then((success: boolean) => {
        // respond with successful delete
        res.status(200).json({success: success});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

// Export the express.Router() instance to be used by server.ts
export const ActiveTestsRouter: Router = router;
