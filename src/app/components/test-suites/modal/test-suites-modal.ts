import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { LineOfService, TestSuite } from "../../../../entity";
import { LinesOfServiceService, TestSuitesService } from "../../../services";
import { NgProgress } from "ngx-progressbar";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: 'test-suites-modal',
    templateUrl: './test-suites-modal.html'
})
export class TestSuitesModal implements OnInit {

    model: TestSuite = {name: '', app_id: null, app_code: null, test_suite: null, line_of_service: null};
    urlFormGroup: FormGroup;
    infoFormGroup: FormGroup;
    confirmFormGroup: FormGroup;

    insert: boolean = true;

    linesOfService: LineOfService[] = [];

    constructor(
        private formBuilder: FormBuilder, 
        private linesOfServiceService: LinesOfServiceService, 
        private testSuiteService: TestSuitesService,
        public dialogRef: MatDialogRef<TestSuitesModal>,
        public ngProgress: NgProgress,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        
    }

    ngOnInit() {
        if (this.data) {
            this.insert = false;
        }

        this.urlFormGroup = this.formBuilder.group({
            urlCtrl: ['', Validators.required]
        });
        this.infoFormGroup = this.formBuilder.group({
            nameCtrl: ['', Validators.required],
            lineOfServiceCtrl: ['', Validators.required]
        });
        this.confirmFormGroup = this.formBuilder.group({
            nameCtrl: new FormControl({value: '', disabled: true}, Validators.required),
            serviceCtrl: new FormControl({value: '', disabled: true}, Validators.required),
            appIdCtrl: new FormControl({value: '', disabled: true}, Validators.required),
            appCodeCtrl: new FormControl({value: '', disabled: true}, Validators.required),
            testSuiteCtrl: new FormControl({value: '', disabled: true}, Validators.required)
        });
        this.load();
    }

    load() {
        this.linesOfServiceService.getAll().then(linesOfService => {
            this.linesOfService = linesOfService;

            if (!this.insert) {
                this.testSuiteService.getById(this.data.id).then(testSuite => {
                    this.model = testSuite;

                    this.infoFormGroup.get('nameCtrl').setValue(testSuite.name);
                    this.confirmFormGroup.get('nameCtrl').setValue(testSuite.name);
                    this.infoFormGroup.get('lineOfServiceCtrl').setValue(testSuite.line_of_service);
                    this.confirmFormGroup.get('serviceCtrl').setValue(testSuite.line_of_service.name);
                    this.confirmFormGroup.get('appIdCtrl').setValue(testSuite.app_id);
                    this.confirmFormGroup.get('appCodeCtrl').setValue(testSuite.app_code);
                    this.confirmFormGroup.get('testSuiteCtrl').setValue(testSuite.test_suite);
                }).catch(err => {
                    console.log(err);
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    urlComplete() {
        let url = this.urlFormGroup.get('urlCtrl').value;
        this.confirmFormGroup.get('appIdCtrl').setValue(
            parseInt(url.split("&appId=")[1].split("&appCode=")[0])
        );
        this.confirmFormGroup.get('appCodeCtrl').setValue(
            parseInt(url.split("&appId=")[1].split("&appCode=")[1].split("&testSuite=")[0])
        );
        this.confirmFormGroup.get('testSuiteCtrl').setValue(
            parseInt(url.split("&appId=")[1].split("&appCode=")[1].split("&testSuite=")[1].split("&")[0])
        );
        console.log(this.confirmFormGroup.getRawValue());
    }

    infoComplete() {
        this.confirmFormGroup.get('nameCtrl').setValue(
            this.infoFormGroup.get('nameCtrl').value
        );
        this.confirmFormGroup.get('serviceCtrl').setValue(
            this.infoFormGroup.get('lineOfServiceCtrl').value.name
        )
        console.log(this.confirmFormGroup.getRawValue());
    }

    submit() {
        this.ngProgress.start();
        this.model.name = this.confirmFormGroup.get('nameCtrl').value;
        this.model.app_id = this.confirmFormGroup.get('appIdCtrl').value;
        this.model.app_code = this.confirmFormGroup.get('appCodeCtrl').value;
        this.model.test_suite = this.confirmFormGroup.get('testSuiteCtrl').value;
        this.model.line_of_service = this.infoFormGroup.get('lineOfServiceCtrl').value;

        this.testSuiteService.insert(this.model).then(result => {
            this.ngProgress.done();
            if (result.id > 0) {
                this.dialogRef.close();
            } else {
                console.log("Test Suite Issue");
            }
        }).catch(err => {
            this.ngProgress.done();
            console.log(err);
        });
    }
}