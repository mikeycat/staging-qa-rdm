import { Component, OnInit, Input } from "@angular/core";
import { LinesOfServiceService } from './../../../services';
import { LineOfService } from './../../../../entity';
import { MatDialog } from "@angular/material";
import { LinesOfServiceModal } from "../modal/lines-of-service-modal";

@Component({
    selector: 'lines-of-service-table',
    templateUrl: './lines-of-service-table.html'
})
export class LinesOfServiceTable implements OnInit {

    linesOfService: LineOfService[];
    columnsToDisplay = ['name', 'actions'];

    @Input() set update(value: boolean) {
        this.reset();
    }

    constructor(private linesOfServiceService: LinesOfServiceService, private dialog: MatDialog) {}

    ngOnInit() {
        this.reset();
    }

    reset() {
        this.linesOfServiceService.getAll().then(linesOfService => {
            this.linesOfService = linesOfService;
        }).catch(err => {
            console.log(err);
        });
    }

    run(id: number) {
        console.log(id);
    }

    edit(id: number) {
        let dialogRef = this.dialog.open(LinesOfServiceModal, {
            data: {id: id}
        });
        dialogRef.afterClosed().subscribe(() => {
            this.reset();
        });
    }

    delete(id: number) {
        this.linesOfServiceService.delete({id: id}).then(result => {
            if (result)
                this.reset();
        }).catch(err => {
            console.log(err);
        });
    }
}