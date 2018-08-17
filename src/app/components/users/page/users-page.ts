import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { UsersModal } from './../modal/users-modal';

@Component({
    selector: 'users-page',
    templateUrl: './users-page.html'
})
export class UsersPage implements OnInit {

    table_update: boolean = true;

    constructor(private dialog: MatDialog) {}

    ngOnInit() {}

    create() {
        let dialogRef = this.dialog.open(UsersModal);
        dialogRef.afterClosed().subscribe(() => {
            this.table_update = !this.table_update;
        });
    }
}