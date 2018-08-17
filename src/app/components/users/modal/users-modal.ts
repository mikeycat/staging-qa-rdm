import { Component, Inject } from '@angular/core';
import { BrowsersService, OperatingSystemsService } from './../../../services';
import { Browser, OperatingSystem } from './../../../../entity';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgProgress } from 'ngx-progressbar';

@Component({
    selector: 'users-modal',
    templateUrl: './users-modal.html'
})
export class UsersModal {

    form: FormGroup;
    nameCtrl: FormControl;
    valueCtrl: FormControl;
    operatingSystemsCtrl: FormControl;
    model: Browser = {};
    operatingSystems: OperatingSystem[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private browserService: BrowsersService,
        private operatingSystemService: OperatingSystemsService,
        public dialogRef: MatDialogRef<UsersModal>,
        public ngProgress: NgProgress,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

    }

    ngOnInit() {
        this.nameCtrl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
        this.valueCtrl = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]);
        this.operatingSystemsCtrl = new FormControl('', [Validators.required]);

        this.form = this.formBuilder.group({
            name: this.nameCtrl,
            value: this.valueCtrl,
            operating_systems: this.operatingSystemsCtrl
        });

        this.load();
    }

    getNameErrorMessage() {
        return this.nameCtrl.hasError('required') ? 'You must enter a value' :
            this.nameCtrl.hasError('minlength') ? 'Name must be longer than 3 characters' :
                this.nameCtrl.hasError('maxlength') ? 'Name must not be longer than 20 characters' : '';
    }

    getValueErrorMessage() {
        return this.valueCtrl.hasError('required') ? 'You must enter a value' :
            this.valueCtrl.hasError('minlength') ? 'Value must be longer than 2 characters' :
                this.valueCtrl.hasError('maxlength') ? 'Value must not be longer than 15 characters' : '';
    }

    getOperatingSystemsErrorMessage() {
        return this.operatingSystemsCtrl.hasError('required') ? 'You must select an Operating System' : '';
    }

    load() {
        this.ngProgress.start();
        this.operatingSystemService.getAll().then(platforms => {
            this.operatingSystems = platforms;

            if (this.data) {
                this.browserService.getById(this.data.id).then(os => {
                    this.model = os;
                    this.form.get('name').setValue(this.model.name);
                    this.form.get('value').setValue(this.model.value);
                    this.form.get('operating_systems').setValue(this.model.operating_systems);
                    this.operatingSystemsCtrl.setValue(this.model.operating_systems);
                    console.log(this.operatingSystemsCtrl.value);
                    this.ngProgress.done();
                }).catch(err => {
                    console.log(err);
                    this.ngProgress.done();
                });
            } else {
                this.ngProgress.done();
            }
        });
    }

    reset() {
        if (this.data.id) {
            this.load();
        } else {
            this.form.reset();
        }
    }

    submit() {
        this.ngProgress.start();
        this.model.name = this.form.get('name').value;
        this.model.value = this.form.get('value').value;
        this.model.operating_systems = this.form.get('operating_systems').value;
        console.log(this.model);
        if (this.model.id) {
            this.browserService.update(this.model).then(result => {
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
            this.browserService.insert(this.model).then(result => {
                this.ngProgress.done();
                if (result.id > 0) {
                    this.dialogRef.close();
                } else {
                    console.log("Browser issue.");
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }
}