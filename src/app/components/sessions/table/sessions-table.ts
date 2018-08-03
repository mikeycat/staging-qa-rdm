import { Component, OnInit } from "@angular/core";
import { SessionsService } from './../../../services';
import { Session } from './../../../../entity';

@Component({
    selector: 'sessions-table',
    templateUrl: './sessions-table.html'
})
export class SessionsTable implements OnInit {

    sessions: Session[];

    constructor(private sessionsService: SessionsService) {}

    ngOnInit() {
        this.reset();
    }

    reset() {
        this.sessionsService.getAll().then(sessions => {
            this.sessions = sessions;
        }).catch(err => {
            console.log(err);
        });
    }

    edit(id: number) {

    }

    delete(id: number) {
        this.sessionsService.delete({id: id}).then(result => {
            if (result)
                this.reset();
        }).catch(err => {
            console.log(err);
        });
    }
}