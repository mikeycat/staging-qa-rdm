import { Component, OnInit } from "@angular/core";
import { AuthService, IUser } from "../../services";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { NgProgress } from "ngx-progressbar";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'app-login',
    templateUrl: './login-page.html',
    styleUrls: ['./login-page.css'],
})
export class LoginPageComponent implements OnInit {

    form: FormGroup;
    emailCtrl: FormControl;
    passCtrl: FormControl;

    model: IUser = {};


    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        public ngProgress: NgProgress,
        private toastr: ToastrService,
        private router: Router
    ) { }

    ngOnInit() {
        this.emailCtrl = new FormControl('', [Validators.required]);
        this.passCtrl = new FormControl('', [Validators.required, Validators.minLength(8)]);

        this.form = this.formBuilder.group({
            email: this.emailCtrl,
            password: this.passCtrl
        });
    }

    submit() {
        this.ngProgress.start();
        this.model.email = this.form.get('email').value + '@rci.rogers.com';
        this.model.password = this.form.get('password').value;
        this.authService.login(this.model).then(() => {
            this.ngProgress.done();
            this.router.navigate(['/profile']);
        }).catch(err => {
            this.ngProgress.done();
            if (err.code) {
                if (err.code == "auth/user-not-found") {
                    this.toastr.error('User not found.', '', {
                        timeOut: 3000,
                        positionClass: 'toast-top-center'
                    });
                } else if (err.code == "auth/wrong-password") {
                    this.toastr.error('Password is incorrect.', '', {
                        timeOut: 3000,
                        positionClass: 'toast-top-center'
                    });
                }

            }
        });
    }

    register() {
        this.router.navigate(['/register']);
    }

    getEmailErrorMessage() {
        return this.emailCtrl.hasError('required') ? 'You must enter a value' : '';
    }

    getPassErrorMessage() {
        return this.passCtrl.hasError('required') ? 'You must enter a value' :
                this.passCtrl.hasError('minlength') ? 'Password must be atleast 8 characters' : '';
    }
}