import { Component, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material';
import { OperatingSystemsModal } from './../modal/operating-systems-modal';

@Component({
    selector: 'operating-systems-page',
    templateUrl: './operating-systems-page.html'
})
export class OperatingSystemsPage implements OnInit {

    table_update: boolean = true;

    constructor(private dialog: MatDialog) {}

    ngOnInit() {}

    create() {
        let dialogRef = this.dialog.open(OperatingSystemsModal);
        dialogRef.afterClosed().subscribe(() => {
            this.table_update = !this.table_update;
        });
    }
}