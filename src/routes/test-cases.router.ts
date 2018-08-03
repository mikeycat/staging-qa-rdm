/* src/routes/test-cases.router.ts */

import { Router, Request, Response } from 'express';
import { logger } from "../logger";

import { TestCase } from '../entity';
import { TestCasesController } from '../controller';


// Assign router to the express.Router() instance
const router: Router = Router();

/* GET /api/test-cases */
/* Get All Test Cases */
router.get('/', (req: Request, res: Response) => {
    TestCasesController.getAll().then((testCases: TestCase[]) => {
        // respond with all test cases
        res.status(200).json(testCases);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* GET /api/test-cases/group/test-suite */
/* Get All Test Cases and Group by Test Suite */
router.get('/group/test-suite', (req: Request, res: Response) => {
    TestCasesController.getAllGroupByTestSuite().then((testCases: TestCase[]) => {
        // respond with all test cases
        res.status(200).json(testCases);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* GET /api/test-cases/group/date */
/* Get All Test Cases and Group by Date */
router.get('/group/date', (req: Request, res: Response) => {
    TestCasesController.getAllGroupByDate().then((testCases: TestCase[]) => {
        // respond with all test cases
        res.status(200).json(testCases);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* GET /api/test-cases/totals */
/* Get Test Cases Totals */
router.get('/totals', (req: Request, res: Response) => {
    TestCasesController.getAllTotals().then((testCases) => {
        // respond with all test cases
        res.status(200).json(testCases);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* GET /api/test-cases/:id */
/* Get Test Case with ID */
router.get('/:id', (req: Request, res: Response) => {
    TestCasesController.getById(parseInt(req.params.id)).then((testCase: TestCase) => {
        // resond with test cases
        res.status(200).json(testCase);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* GET /api/test-cases/test-suite/:id/totals */
/* Get Test Cases with Test Suite ID */
router.get('/test-suite/:id/totals', (req: Request, res: Response) => {
    TestCasesController.getTotalsByTestSuite({id: parseInt(req.params.id)}).then((testCases: TestCase[]) => {
        // respond with all test cases
        res.status(200).json(testCases);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* GET /api/test-cases/test-suite/:id/date */
/* Get Test Cases with Test Suite ID Group By Date */
router.get('/test-suite/:id/date', (req: Request, res: Response) => {
    TestCasesController.getByTestSuiteGroupDate({id: parseInt(req.params.id)}).then((testCases: TestCase[]) => {
        // respond with all test cases
        res.status(200).json(testCases);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* GET /api/test-cases/test-suite/:id */
/* Get Test Cases with Test Suite ID */
router.get('/test-suite/:id', (req: Request, res: Response) => {
    TestCasesController.getByTestSuite({id: parseInt(req.params.id)}).then((testCases: TestCase[]) => {
        // respond with all test cases
        res.status(200).json(testCases);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/test-cases/insert */
/* Insert Test Case */
router.post('/insert', (req: Request, res: Response) => {
    TestCasesController.insert(req.body).then((id: number) => {
        // respond with id of new test case
        res.status(200).json({id: id});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/test-cases/update */
/* Update Test Case */
router.post('/update', (req: Request, res: Response) => {
    TestCasesController.update(req.body).then((success: boolean) => {
        // respond with successful update
        res.status(200).json({success: success});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/test-cases/delete */
/* Delete Test Case */
router.post('/delete', (req: Request, res: Response) => {
    TestCasesController.delete(req.body).then((success: boolean) => {
        // respond with successful delete
        res.status(200).json({success: success});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

// Export the express.Router() instance to be used by server.ts
export const TestCasesRouter: Router = router;