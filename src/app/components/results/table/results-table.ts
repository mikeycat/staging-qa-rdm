import { Component, OnInit } from "@angular/core";
import { ResultsService } from './../../../services';
import { Result } from './../../../../entity';

@Component({
    selector: 'results-table',
    templateUrl: './results-table.html'
})
export class ResultsTable implements OnInit {

    results: Result[];

    constructor(private resultsService: ResultsService) {}

    ngOnInit() {
        this.reset();
    }

    reset() {
        this.resultsService.getAll().then(results => {
            this.results = results;
        }).catch(err => {
            console.log(err);
        });
    }

    run(id: number) {

    }

    edit(id: number) {

    }

    delete(id: number) {
        this.resultsService.delete({id: id}).then(result => {
            if (result)
                this.reset();
        }).catch(err => {
            console.log(err);
        });
    }
}