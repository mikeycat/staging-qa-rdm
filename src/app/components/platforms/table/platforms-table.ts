import { Component, OnInit, Input } from "@angular/core";
import { PlatformsService } from './../../../services';
import { PlatformsModal } from './../modal/platforms-modal';
import { Platform } from './../../../../entity';
import { MatDialog } from "@angular/material";

@Component({
    selector: 'platforms-table',
    templateUrl: './platforms-table.html'
})
export class PlatformsTable implements OnInit {

    platforms: Platform[];
    columnsToDisplay = ['name', 'value', 'actions'];

    @Input() set update(value: boolean) {
        this.reset();
    }

    constructor(private platformsService: PlatformsService, private dialog: MatDialog) {}

    ngOnInit() {
        this.reset();
    }

    reset() {
        this.platformsService.getAll().then(platforms => {
            this.platforms = platforms;
        }).catch(err => {
            console.log(err);
        });
    }

    run(id: number) {
        console.log(id);
    }

    edit(id: number) {
        let dialogRef = this.dialog.open(PlatformsModal, {
            data: {id: id}
        });
        dialogRef.afterClosed().subscribe(() => {
            this.reset();
        });
    }

    delete(id: number) {
        this.platformsService.delete({id: id}).then(result => {
            if (result)
                this.reset();
        }).catch(err => {
            console.log(err);
        });
    }
}