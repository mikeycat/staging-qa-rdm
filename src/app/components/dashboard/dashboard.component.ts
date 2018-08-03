import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TestCasesService } from '../../services';
import { interval, Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {

  testCases: any;
  selectedTestSuite: any;
  private _index: number = 0;
  subscribe: Subscription;

  set index(value: number) {
    this._index = (value >= this.testCases.length) ? 0 :
                    (value < 0) ? this.testCases.length-1 : value;

    this.selectedTestSuite = this.testCases[this._index];
  }
  get index() {
    return this._index;
  }

  constructor(
    private testCasesService: TestCasesService
  ) { }


  ngAfterViewInit() {
    this.testCasesService.getAllTotals().then(testCases => {
      testCases.forEach(element => {
        element.passed = parseInt(element.passed);
        element.failed = parseInt(element.failed);
        element.error = parseInt(element.error);
      });
      this.testCases = testCases;
      this.index = 0;

      const source = interval(5000);
      this.subscribe = source.subscribe(() => {
        this.index = this.index + 1;
      });
    });
  }

  ngOnInit() {

  }
}
