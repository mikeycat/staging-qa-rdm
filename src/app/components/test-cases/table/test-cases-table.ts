import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { TestCasesService } from './../../../services';
import { TestCase, TestSuite } from './../../../../entity';
import { MatDialog, MatTableDataSource, MatPaginator, MatPaginatorIntl, MatSort } from "@angular/material";
import { TestCasesModal } from "../modal/test-cases-modal";
import { element } from "../../../../../node_modules/protractor";

@Component({
    selector: 'test-cases-table',
    templateUrl: './test-cases-table.html'
})
export class TestCasesTable implements OnInit {

    testCases: TestCase[];
    opened = false;
    columnsToDisplay = ['date', 'testSuite', 'platform', 'passed', 'failed', 'error', 'actions'];
    dataSource: MatTableDataSource<TestCase>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    @Input() set update(value: boolean) {
        this.reset();
    }

    constructor(private testCasesService: TestCasesService, private dialog: MatDialog) {}

    ngOnInit() {
        this.reset();
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    select(value: any) {
        if (!this.opened && value.browser == null) {
            this.testCasesService.getAllByTestSuite(value.test_suite).then(testCases => {
                this.opened = true;
                this.testCases = [value].concat(testCases);
                this.dataSource = new MatTableDataSource(this.testCases);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }).catch(err => {
                console.log(err);
            });
        } else if (this.opened && value.browser == null) {
            this.reset();
        }
    }

    reset() {
        this.testCasesService.getAllGroupByTestSuite().then(testCases => {
            this.opened = false;
            this.testCases = testCases;
            this.dataSource = new MatTableDataSource(testCases);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }).catch(err => {
            console.log(err);
        });
    }

    run(id: number) {
        let dialogRef = this.dialog.open(TestCasesModal, {
            data: {id: id}
        });
        dialogRef.afterClosed().subscribe(() => {
            this.reset();
        });
    }

    delete(id: number) {
        this.testCasesService.delete({id: id}).then(result => {
            if (result)
                this.reset();
        }).catch(err => {
            console.log(err);
        });
    }
}