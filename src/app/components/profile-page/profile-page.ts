import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services";

@Component({
    selector: 'app-profile',
    templateUrl: './profile-page.html',
    styleUrls: ['./profile-page.css'],
})
export class ProfilePageComponent implements OnInit {

    profile: firebase.User;

    constructor(
        private authService: AuthService,
    ) { }

    ngOnInit() {
        this.authService.observeUser().subscribe(user => {
            this.profile = user;
            console.log(user);
        });
    }

    logout() {
        this.authService.signout();
    }
}