import { Component, OnInit } from "@angular/core";
import { AuthService, SessionsService } from "../../services";
import { Session, Role } from "../../../entity";

@Component({
    selector: 'app-profile',
    templateUrl: './profile-page.html',
    styleUrls: ['./profile-page.css'],
})
export class ProfilePageComponent implements OnInit {

    profile: firebase.User;
    session: Session = {session: '', user: {roles: [] }};
    roles: Role[] = [];

    constructor(
        private authService: AuthService,
        private sessionService: SessionsService
    ) {
        this.authService.observeUser().subscribe(user => {
            this.profile = user;
        });

        this.sessionService.getCurrent().then(session => {
            if (!session.user) {
                authService.syncWithServerSession(this.profile.uid).then(() => {
                    this.sessionService.getCurrent().then(session => {
                        this.session = session;
                        this.roles = session.user.roles;
                    }).catch(err => {
                        console.log(err);
                    });
                }).catch(err => {
                    console.log(err);
                });
            } else {
                this.session = session;
                this.roles = session.user.roles;
            }
        });
    }

    ngOnInit() {

    }

    logout() {
        this.authService.signout();
    }
}