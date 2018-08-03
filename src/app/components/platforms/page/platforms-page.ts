import { Component, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material';
import { PlatformsModal } from './../modal/platforms-modal';

@Component({
    selector: 'platforms-page',
    templateUrl: './platforms-page.html'
})
export class PlatformsPage implements OnInit {

    table_update: boolean = true;

    constructor(private dialog: MatDialog) {}

    ngOnInit() {}

    create() {
        let dialogRef = this.dialog.open(PlatformsModal);
        dialogRef.afterClosed().subscribe(() => {
            this.table_update = !this.table_update;
        });
    }
}