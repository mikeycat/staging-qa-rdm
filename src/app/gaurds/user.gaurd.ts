import { Injectable } from "../../../node_modules/@angular/core";
import { CanActivate, Router } from "../../../node_modules/@angular/router";
import { AuthService } from "../services";

@Injectable()
export class UserGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate() {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}