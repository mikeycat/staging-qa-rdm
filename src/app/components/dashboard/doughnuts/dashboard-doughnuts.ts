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
        this.dayData = [
          value.passed,
          value.failed,
          value.error,
        ];
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