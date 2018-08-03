export interface Roles {
    guest: boolean;
    user?: boolean;
    admin?: boolean;
}

export class User {
    email: string;
    photoUrl: string;
    roles: Roles;

    constructor(authData) {
        this.email = authData.email;
        this.photoUrl = authData.photoUrl;
        this.roles = { guest: true }
    }
}