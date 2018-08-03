import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services";
import { Router } from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login-page.html',
    styleUrls: ['./login-page.css'],
})
export class LoginPageComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() { }

    signInWithGoogle() {
        this.authService.googleLogin().then(() => {
            this.router.navigate(['/profile']);
        });
    }
}