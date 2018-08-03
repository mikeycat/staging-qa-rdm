import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TestSuitesService, TestCasesService } from '../../../services';

@Component({
  selector: 'app-dashboard-queue',
  templateUrl: './dashboard-queue.html',
  styleUrls: ['./dashboard-queue.css'],
})
export class DashboardQueueComponent implements OnInit {

  @Input()
  testSuites: any[] = [];

  @Input()
  set testSuite(value:any) {
    if (typeof this.testSuites != "undefined" && typeof value != "undefined") {
      this.index = this.testSuites.findIndex(element => {
        return element.test_suite_id == value.test_suite_id;
      });
    }
  }


  prevTestSuite: any = {};
  prevTotal: number = 0;
  currTestSuite: any = {};
  currTotal: number = 0;
  nextTestSuite: any = {};
  nextTotal: number = 0;

  private _index: number = 0;
  set index(value: number) {
    this.currTestSuite = this.testSuites[value];
    this.currTotal = this.calcTotal(this.currTestSuite);
    this.prevTestSuite = this.testSuites[
      (value == 0) ? (this.testSuites.length - 1) : (value - 1)
    ];
    this.prevTotal = this.calcTotal(this.prevTestSuite);
    this.nextTestSuite = this.testSuites[
      (value == this.testSuites.length - 1) ? 0 : (value + 1)
    ];
    this.nextTotal = this.calcTotal(this.nextTestSuite);
  }
  get index() {
    return this._index;
  }


  constructor(
    private testSuitesService: TestSuitesService,
    private testCasesService: TestCasesService
  ) {}

  ngOnInit() {}

  calcTotal(testSuite):number {
    return Math.round((testSuite.passed / (testSuite.passed + testSuite.failed + testSuite.error)) * 100);
  }
}
