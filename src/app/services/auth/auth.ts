import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from "rxjs/Observable";


@Injectable()
export class AuthService {

    private user: Observable<firebase.User>;
    private userDetails: firebase.User = null;

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router
    ) {
        this.user = afAuth.authState;

        this.user.subscribe(user => {
            if (user) {
                this.userDetails = user;
            } else {
                this.userDetails = null;
            }
        });
    }

    googleLogin() {
        return this.afAuth.auth.signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
        )
    }

    observeUser() {
        return this.user;
    }

    signout() {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['/']);
        })
    }

    isLoggedIn() {
        if (this.userDetails == null) {
            return false;
        } else {
            return true;
        }
    }
}