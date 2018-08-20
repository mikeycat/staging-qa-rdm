import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from "../../../../../node_modules/@angular/forms";
import { TestCase, OperatingSystem, TestSuite, Browser } from "../../../../entity";
import { TestSuitesService, TestCasesService, OperatingSystemsService, BrowsersService, SessionsService, NotificationsService } from "../../../services";
import { BrowsersModal } from "../..";
import { MatDialogRef, MAT_DIALOG_DATA } from "../../../../../node_modules/@angular/material";
import { NgProgress } from "../../../../../node_modules/ngx-progressbar";

@Component({
    selector: 'test-cases-modal',
    templateUrl: './test-cases-modal.html'
})
export class TestCasesModal implements OnInit {

    form: FormGroup;
    testSuitesCtrl: FormControl;
    browsersCtrl: FormControl;
    operatingSystemsCtrl: FormControl;

    testSuites: TestSuite[] = [];
    browsers: Browser[] = [];
    operatingSystems: OperatingSystem[] = [];

    notify: boolean = false;

    model: TestCase = {};

    constructor(
        private formBuilder: FormBuilder,
        private testSuitesService: TestSuitesService,
        private browserService: BrowsersService,
        private operatingSystemService: OperatingSystemsService,
        private testCasesService: TestCasesService,
        private sessionsService: SessionsService,
        private notificationsService: NotificationsService,
        public dialogRef: MatDialogRef<BrowsersModal>,
        public ngProgress: NgProgress,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

    }

    ngOnInit() {
        this.testSuitesCtrl = new FormControl('', [Validators.required]);
        this.browsersCtrl = new FormControl('', [Validators.required]);
        this.operatingSystemsCtrl = new FormControl('', [Validators.required]);

        this.form = this.formBuilder.group({
            test_suite: this.testSuitesCtrl,
            browser: this.browsersCtrl,
            operating_system: this.operatingSystemsCtrl
        });

        this.load();
    }

    load() {
        this.ngProgress.start();
        this.testSuitesService.getAll().then(testSuites => {
            this.testSuites = testSuites;
            this.ngProgress.inc();
            this.browserService.getAll().then(browsers => {
                this.browsers = browsers;
                this.ngProgress.inc();
                this.operatingSystemService.getAll().then(operatingSystems => {
                    this.operatingSystems = operatingSystems;
                    this.ngProgress.done();
                }).catch(err => {
                    console.log(err);
                    this.ngProgress.done();
                });
            }).catch(err => {
                console.log(err);
                this.ngProgress.done();
            });
        }).catch(err => {
            console.log(err);
            this.ngProgress.done();
        });
    }

    reset() {
        if (this.data) {
            this.load();
        } else {
            this.form.reset();
            this.notify = false;
        }
    }

    submit() {
        this.ngProgress.start();
        this.model.test_suite = this.form.get('test_suite').value;
        this.model.browser = this.form.get('browser').value;
        this.model.operating_system = this.form.get('operating_system').value;

        if (this.model.id) {
            this.testCasesService.update(this.model).then(result => {
                this.ngProgress.done();
                if (result) {
                    this.dialogRef.close();
                } else {
                    console.log("Browser issue.");
                }
            }).catch(err => {
                console.log(err);
            });
        } else {
            this.testCasesService.insert(this.model).then(result => {
                if (this.notify) {
                    this.sessionsService.getCurrent().then(session => {
                        this.notificationsService.insert({test_case: result, user: session.user}).then(() => {
                            this.ngProgress.done();
                            this.dialogRef.close();
                        }).catch(err => {
                            console.log(err);
                        });
                    }).catch(err => {
                        console.log(err);
                    });
                } else {
                    this.ngProgress.done();
                    this.dialogRef.close();
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }
}