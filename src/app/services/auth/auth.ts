import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from "rxjs/Observable";
import { SessionsService } from "../sessions/sessions";
import { Session, User } from "../../../entity";

export interface IUser {
    email?: string;
    password?: string;
}

export interface IRoles {
    user: boolean;
    admin?: boolean;
}


@Injectable()
export class AuthService {

    private user: Observable<firebase.User>;
    private userDetails: firebase.User = null;
    private session: Session;

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
        private http: Http,
        private sessionsService: SessionsService
    ) {
        this.user = afAuth.authState;

        this.user.subscribe(user => {
            if (user) {
                this.userDetails = user;
                this.sessionsService.getCurrent().then(session => {
                    if (!session.user) {
                        this.syncWithServerSession({
                            uid: this.userDetails.uid,
                            email: this.userDetails.email
                        }).then(() => {
                            this.sessionsService.getCurrent().then(session => {
                                this.session = session;
                            });
                        });
                    } else {
                        this.session = session;
                    }
                });
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

    login(user: IUser):Promise<any> {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(userAuth => {
                this.syncWithServerSession({
                    uid: userAuth.user.uid,
                    email: userAuth.user.email
                }).then(() => {
                    resolve(true);
                }).catch(err=> {
                    reject(err);
                });
            }).catch(err => {
                reject(err);
            });
        });
    }

    register(user: IUser): Promise<any> {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then((userAuth) => {
                this.syncWithServerSession({
                    uid: userAuth.user.uid,
                    email: userAuth.user.email
                }).then(() => {
                    resolve(userAuth.user.sendEmailVerification())
                });
            }).catch(err => {
                reject(err);
            });
        });
    }

    syncWithServerSession(user: User): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post('/api/auth/login', user).subscribe(data => {
                resolve();
            });
        });
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

    hasAdminRole():Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                if (typeof this.session == "undefined") {
                    resolve(false);
                }
                if (typeof this.session.user == "undefined") {
                    resolve(false);
                }
                if (typeof this.session.user.roles == "undefined") {
                    resolve(false);
                }
                this.session.user.roles.forEach((element, index) => {
                    if (typeof element.name == "undefined") {
                        resolve(false);
                    }
                    if (element.name == "admin") {
                        resolve(true);
                    }
                    if (index == (this.session.user.roles.length-1)) {
                        resolve(false);
                    }
                });
            } catch (e) {
                resolve(false);
            }
        })

    }
}