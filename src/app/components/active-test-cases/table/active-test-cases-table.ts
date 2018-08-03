import { Component, OnInit, Input } from "@angular/core";
import { ActiveTestCasesService } from './../../../services';
import { ActiveTest } from './../../../../entity';

@Component({
    selector: 'active-tests-table',
    templateUrl: './active-test-cases-table.html'
})
export class ActiveTestsTable implements OnInit {

    activeTests: ActiveTest[];
    columnsToDisplay = ['test_case', 'hash'];

    @Input() set update(value: boolean) {
        this.reset();
    }

    constructor(private activeTestCasesService: ActiveTestCasesService) {}

    ngOnInit() {
        this.reset();
    }

    reset() {
        this.activeTestCasesService.getAll().then(activeTests => {
            this.activeTests = activeTests;
        }).catch(err => {
            console.log(err);
        });
    }

    run(id: number) {

    }

    edit(id: number) {

    }

    delete(id: number) {
        this.activeTestCasesService.delete({id: id}).then(result => {
            if (result)
                this.reset();
        }).catch(err => {
            console.log(err);
        });
    }
}