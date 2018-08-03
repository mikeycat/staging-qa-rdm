import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { TestSuitesModal } from './../modal/test-suites-modal';

@Component({
    selector: 'test-suites-page',
    templateUrl: './test-suites-page.html'
})
export class TestSuitesPage implements OnInit {

    table_update: boolean = true;

    constructor(private dialog: MatDialog) {}

    ngOnInit() {}

    create() {
        let dialogRef = this.dialog.open(TestSuitesModal);
        dialogRef.afterClosed().subscribe(() => {
            this.table_update = !this.table_update;
        });
    }
}