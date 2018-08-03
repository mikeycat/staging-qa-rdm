import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { OperatingSystem, Platform } from "../../../../entity";
import { NgProgress } from "ngx-progressbar";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { OperatingSystemsService, PlatformsService } from "../../../services";

@Component({
    selector: 'operating-systems-modal',
    templateUrl: './operating-systems-modal.html'
})
export class OperatingSystemsModal implements OnInit {

    form: FormGroup;
    nameCtrl: FormControl;
    valueCtrl: FormControl;
    platformCtrl: FormControl;
    model: OperatingSystem = {};
    platforms: Platform[] = [];
    
    constructor(
        private formBuilder: FormBuilder, 
        private operatingSystemsService: OperatingSystemsService,
        private platformsService: PlatformsService,
        public dialogRef: MatDialogRef<OperatingSystemsModal>, 
        public ngProgress: NgProgress,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        
    }

    ngOnInit() {
        this.nameCtrl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
        this.valueCtrl = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]);
        this.platformCtrl = new FormControl('', [Validators.required]);

        this.form = this.formBuilder.group({
            name: this.nameCtrl,
            value: this.valueCtrl,
            platform: this.platformCtrl
        });

        this.load();
    }

    getNameErrorMessage() {
        return this.nameCtrl.hasError('required') ? 'You must enter a value' :
            this.nameCtrl.hasError('minlength') ? 'Name must be longer than 3 characters' :
                this.nameCtrl.hasError('maxlength') ? 'Name must not be longer than 15 characters' : '';
    }

    getValueErrorMessage() {
        return this.valueCtrl.hasError('required') ? 'You must enter a value' :
            this.valueCtrl.hasError('minlength') ? 'Value must be longer than 0 characters' :
                this.valueCtrl.hasError('maxlength') ? 'Value must not be longer than 1 character' : '';
    }

    getPlatformErrorMessage() {
        return this.platformCtrl.hasError('required') ? 'You must select a platform' : '';
    }

    load() {
        this.ngProgress.start();
        this.platformsService.getAll().then(platforms => {
            this.platforms = platforms;

            if (this.data) {
                this.operatingSystemsService.getById(this.data.id).then(os => {
                    this.model = os;
                    this.form.get('name').setValue(this.model.name);
                    this.form.get('value').setValue(this.model.value);
                    this.form.get('platform').setValue(this.model.platform.id);
                    this.platformCtrl.setValue(this.model.platform.id);
                    console.log(this.form.get('platform').value);
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
        this.form.reset();
    }

    submit() {
        this.ngProgress.start();
        this.model.name = this.form.get('name').value;
        this.model.value = this.form.get('value').value;
        this.model.platform = this.form.get('platform').value;
        console.log(this.model);
        if (this.model.id) {
            this.operatingSystemsService.update(this.model).then(result => {
                this.ngProgress.done();
                if (result) {
                    this.dialogRef.close();
                } else {
                    console.log("Operating System issue.");
                }
            }).catch(err => {
                console.log(err);
            });
        } else {
            this.operatingSystemsService.insert(this.model).then(result => {
                this.ngProgress.done();
                if (result.id > 0) {
                    this.dialogRef.close();
                } else {
                    console.log("Operating System issue.");
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }
}