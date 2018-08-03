import { Component, OnInit, Input } from "@angular/core";
import { BrowsersService } from './../../../services';
import { BrowsersModal } from './../modal/browsers-modal';
import { Browser } from './../../../../entity';
import { MatDialog } from "@angular/material";

@Component({
    selector: 'browsers-table',
    templateUrl: './browsers-table.html'
})
export class BrowsersTable implements OnInit {

    browsers: Browser[];
    columnsToDisplay = ['name', 'value', 'operating_systems', 'actions'];

    @Input() set update(value: boolean) {
        this.reset();
    }

    constructor(private browsersService: BrowsersService, private dialog: MatDialog) {}

    ngOnInit() {
        this.reset();
    }

    reset() {
        this.browsersService.getAll().then(browsers => {
            this.browsers = browsers;
        }).catch(err => {
            console.log(err);
        });
    }

    run(id: number) {
        console.log(id);
    }

    edit(id: number) {
        let dialogRef = this.dialog.open(BrowsersModal, {
            data: {id: id}
        });
        dialogRef.afterClosed().subscribe(() => {
            this.reset();
        });
    }

    delete(id: number) {
        this.browsersService.delete({id: id}).then(result => {
            if (result)
                this.reset();
        }).catch(err => {
            console.log(err);
        });
    }
}