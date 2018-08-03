import { Component, OnInit, Inject } from "@angular/core";
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PlatformsService } from "../../../services";
import { Platform } from  './../../../../entity';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { NgProgress } from "ngx-progressbar";

@Component({
    selector: 'platforms-modal',
    templateUrl: './platforms-modal.html'
})
export class PlatformsModal implements OnInit {

    form: FormGroup;
    nameCtrl: FormControl;
    valueCtrl: FormControl;
    model: Platform = {};

    constructor(
        private formBuilder: FormBuilder, 
        private platformsService: PlatformsService, 
        public dialogRef: MatDialogRef<PlatformsModal>, 
        public ngProgress: NgProgress,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        
    }

    ngOnInit() {
        this.nameCtrl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
        this.valueCtrl = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]);
        

        this.form = this.formBuilder.group({
            name: this.nameCtrl,
            value: this.valueCtrl
        });

        if (this.data.id) {
            this.load();
        }
    }

    getNameErrorMessage() {
        return this.nameCtrl.hasError('required') ? 'You must enter a value' :
            this.nameCtrl.hasError('minlength') ? 'Name must be longer than 3 characters' :
                this.nameCtrl.hasError('maxlength') ? 'Name must not be longer than 15 characters' : '';
    }

    getValueErrorMessage() {
        return this.valueCtrl.hasError('required') ? 'You must enter a value' :
            this.valueCtrl.hasError('minlength') ? 'Value must be longer than 2 characters' :
                this.valueCtrl.hasError('maxlength') ? 'Value must not be longer than 15 characters' : '';
    }

    load() {
        this.ngProgress.start();
        this.platformsService.getById(this.data.id).then(platform => {
            console.log(platform);
            this.model = platform;
            this.form.get('name').setValue(this.model.name);
            this.form.get('value').setValue(this.model.value);
            this.ngProgress.done();
        }).catch(err => {
            console.log(err);
            this.ngProgress.done();
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
        console.log(this.model);
        if (this.model.id) {
            this.platformsService.update(this.model).then(result => {
                this.ngProgress.done();
                if (result) {
                    this.dialogRef.close();
                } else {
                    console.log("Platform issue.");
                }
            }).catch(err => {
                console.log(err);
            });
        } else {
            this.platformsService.insert(this.model).then(result => {
                this.ngProgress.done();
                if (result.id > 0) {
                    this.dialogRef.close();
                } else {
                    console.log("Platform issue.");
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }
}