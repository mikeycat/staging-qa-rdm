import { Component, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material';
import { LinesOfServiceModal } from './../modal/lines-of-service-modal';

@Component({
    selector: 'lines-of-service-page',
    templateUrl: './lines-of-service-page.html'
})
export class LinesOfServicePage implements OnInit {

    table_update: boolean = true;

    constructor(private dialog: MatDialog) {}

    ngOnInit() {}

    create() {
        let dialogRef = this.dialog.open(LinesOfServiceModal);
        dialogRef.afterClosed().subscribe(() => {
            this.table_update = !this.table_update;
        });
    }
}