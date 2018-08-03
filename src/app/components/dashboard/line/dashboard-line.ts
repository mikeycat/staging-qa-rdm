import { Component, OnInit, Input } from '@angular/core';
import { TestCasesService } from '../../../services';

@Component({
  selector: 'app-dashboard-line',
  templateUrl: './dashboard-line.html',
  styleUrls: ['./dashboard-line.css'],
})
export class DashboardLine implements OnInit {

    @Input()
    set testSuite(value: any) {
      if (typeof value != "undefined") {
        this.passedWeek = [0,0,0,0,0,0,0];
        this.failedWeek = [0,0,0,0,0,0,0];
        this.errorWeek = [0,0,0,0,0,0,0];
        this.load(value);
      }
    }

    @Input()
    testSuites: any;

    weekData: any;
    private passedWeek = [0,0,0,0,0,0,0];
    private failedWeek = [0,0,0,0,0,0,0];
    private errorWeek = [0,0,0,0,0,0,0];


    constructor(
        private testCasesService: TestCasesService
    ) {

    }

    ngOnInit() {

    }

    load(testSuite) {
      this.testCasesService.getTotalsByTestSuiteGroupByDate({id: testSuite.test_suite_id}).then((testCases:any) => {
        testCases.forEach((element, index) => {
          let i = new Date(Date.parse(element.date)).getDay();
          this.passedWeek[i] = parseInt(element.passed);
          this.failedWeek[i] = parseInt(element.failed);
          this.errorWeek[i] = parseInt(element.error);

          if (index == (testCases.length - 1)) {
            this.weekData = [
              {data: this.passedWeek, label: 'Passed'},
              {data: this.failedWeek, label: 'Failed'},
              {data: this.errorWeek, label: 'Error'}
            ];
          }
        });
      }).catch(err => {
        console.log(err);
      });
    }

}