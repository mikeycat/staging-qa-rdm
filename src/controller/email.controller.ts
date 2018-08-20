/* src/controller/email.controller.ts */

import { logger } from "../logger";
import { TestCase, User } from "../entity";
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

export class EmailController {

    static sendCompletedTestCase(testCase: TestCase, user: User): Promise<any> {
        return new Promise((resolve, reject) => {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                auth: {
                    type: 'OAuth2',
                    user: 'diquaassurance@gmail.com',
                    pass: 'tester123',
                    clientId: '128097668197-g17i4bcaq11t7lv8vhsfmnel2vhbhcff.apps.googleusercontent.com',
                    clientSecret: '0hXwum8JCpx0HR0Gn-_2ALIx',
                    refreshToken: '1/_F3LshYdsN0YRq-V9ZYnTSZ_aolwRFjZbrodXTfLS5g',
                    accessToken: 'ya29.Glv_BXigR_fNZ8vQGt3sLgEu5d3PAEnW5DeYjYnaktYlrGqhgPuhFalowokyTULmn_lr1p4EjfuaAE9nZDxMu3P73HsM1HywlrUs6mZg4BBURoYbz9s5jDgdHjeT'
                }
            });

            var mailOptions = {
                from: 'diquaassurance@gmail.com',
                to: user.email,
                subject: 'Test Case Completion',
                html: "Test Case: " + testCase.test_suite.name + "<br>" +
                      "Passed: " + testCase.passed + "<br>" +
                      "Failed: " + testCase.failed + "<br>" +
                      "Error: " + testCase.error + "<br>",
            }

            transporter.sendMail(mailOptions, (err, res) => {
                if (err) {
                    logger.error(err);
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

}