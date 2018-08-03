import { Component, Inject, OnInit } from '@angular/core';
import { LinesOfServiceService } from './../../../services';
import { LineOfService } from './../../../../entity';
import { FormGroup, FormControl, Validators, FormBuilder } from '../../../../../node_modules/@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../../node_modules/@angular/material';
import { NgProgress } from '../../../../../node_modules/ngx-progressbar';

@Component({
    selector: 'lines-of-service-modal',
    templateUrl: './lines-of-service-modal.html'
})
export class LinesOfServiceModal implements OnInit {

    form: FormGroup;
    nameCtrl: FormControl;
    model: LineOfService = {};

    constructor(
        private formBuilder: FormBuilder,
        private linesOfServiceService: LinesOfServiceService,
        public dialogRef: MatDialogRef<LinesOfServiceModal>, 
        public ngProgress: NgProgress,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        
    }

    ngOnInit() {
        this.nameCtrl = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]);

        this.form = this.formBuilder.group({
            name: this.nameCtrl
        });

        this.load();
    }

    getNameErrorMessage() {
        return this.nameCtrl.hasError('required') ? 'You must enter a value' :
            this.nameCtrl.hasError('minlength') ? 'Name must be longer than 3 characters' :
                this.nameCtrl.hasError('maxlength') ? 'Name must not be longer than 20 characters' : '';
    }

    load() {
        this.ngProgress.start();
        if (this.data) {
            this.linesOfServiceService.getById(this.data.id).then(lineOfService => {
                this.model = lineOfService;
                this.form.get('name').setValue(this.model.name);
                this.ngProgress.done();
            }).catch(err => {
                console.log(err);
                this.ngProgress.done();
            });
        } else {
            this.ngProgress.done();
        }
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
        console.log(this.model);
        if (this.model.id) {
            this.linesOfServiceService.update(this.model).then(result => {
                this.ngProgress.done();
                if (result) {
                    this.dialogRef.close();
                } else {
                    console.log("Line of Service issue.");
                }
            }).catch(err => {
                console.log(err);
            });
        } else {
            this.linesOfServiceService.insert(this.model).then(result => {
                this.ngProgress.done();
                if (result.id > 0) {
                    this.dialogRef.close();
                } else {
                    console.log("Line of Service issue.");
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }
}