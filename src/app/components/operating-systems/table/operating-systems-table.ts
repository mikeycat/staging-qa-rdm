import { Component, OnInit, Input } from "@angular/core";
import { OperatingSystemsService } from './../../../services';
import { OperatingSystem } from './../../../../entity';
import { MatDialog } from "@angular/material";
import { OperatingSystemsModal } from './../modal/operating-systems-modal';

@Component({
    selector: 'operating-systems-table',
    templateUrl: './operating-systems-table.html'
})
export class OperatingSystemsTable implements OnInit {

    operatingSystems: OperatingSystem[];
    columnsToDisplay = ['name', 'value', 'platform', 'actions'];

    @Input() set update(value: boolean) {
        this.reset();
    }

    constructor(private operatingSystemsService: OperatingSystemsService, private dialog: MatDialog) {}

    ngOnInit() {
        this.reset();
    }

    reset() {
        this.operatingSystemsService.getAll().then(operatingSystems => {
            this.operatingSystems = operatingSystems;
        }).catch(err => {
            console.log(err);
        });
    }

    run(id: number) {
        console.log(id);
    }

    edit(id: number) {
        let dialogRef = this.dialog.open(OperatingSystemsModal, {
            data: {id: id}
        });
        dialogRef.afterClosed().subscribe(() => {
            this.reset();
        });
    }

    delete(id: number) {
        this.operatingSystemsService.delete({id: id}).then(result => {
            if (result)
                this.reset();
        }).catch(err => {
            console.log(err);
        });
    }
}