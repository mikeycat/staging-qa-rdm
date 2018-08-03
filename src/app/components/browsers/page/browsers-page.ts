import { Component, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material';
import { BrowsersModal } from './../modal/browsers-modal';

@Component({
    selector: 'browsers-page',
    templateUrl: './browsers-page.html'
})
export class BrowsersPage implements OnInit {

    table_update: boolean = true;

    constructor(private dialog: MatDialog) {}

    ngOnInit() {}

    create() {
        let dialogRef = this.dialog.open(BrowsersModal);
        dialogRef.afterClosed().subscribe(() => {
            this.table_update = !this.table_update;
        });
    }
}