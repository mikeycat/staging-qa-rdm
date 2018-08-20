import { Component, OnInit, Input } from '@angular/core';
import { TestCasesService } from '../../../services';

@Component({
  selector: 'app-dashboard-doughnuts',
  templateUrl: './dashboard-doughnuts.html',
  styleUrls: ['./dashboard-doughnuts.css'],
})
export class DashboardDoughnuts implements OnInit {

    @Input()
    set testSuite(value: any) {
      if (typeof value != "undefined") {
        this.dayData = [0,0,0];

        let today = new Date(Date.now());
        value.week.forEach(testCase => {
          let tmpDate = new Date(testCase.date);
          if (today.getDay() == tmpDate.getUTCDay()) {
            this.dayData = [
             testCase.passed,
             testCase.failed,
             testCase.error
            ];
          }
        });

        this.weekData = [
          value.passed,
          value.failed,
          value.error
        ];
      }
    }

    @Input()
    testSuites: any;

    dayData: any;
    weekData: any;

    constructor(
      private testCasesService: TestCasesService
    ) { }

    ngOnInit() {
    }
}