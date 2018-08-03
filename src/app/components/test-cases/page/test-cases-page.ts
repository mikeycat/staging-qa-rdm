import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { TestCasesModal } from "../modal/test-cases-modal";

@Component({
    selector: 'test-cases-page',
    templateUrl: './test-cases-page.html'
})
export class TestCasesPage implements OnInit {

    table_update: boolean = true;

    constructor(private dialog: MatDialog) {}

    ngOnInit() {}

    create() {
        let dialogRef = this.dialog.open(TestCasesModal);
        dialogRef.afterClosed().subscribe(() => {
            this.table_update = !this.table_update;
        });
    }
}