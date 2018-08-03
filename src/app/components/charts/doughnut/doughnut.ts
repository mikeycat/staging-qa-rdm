import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: 'chart-doughnut',
    templateUrl: './doughnut.html'
})
export class DoughnutChart implements OnInit {

    private _data: any = [0,0,0];

    public labels:string[] = ['Passed', 'Failed', 'Error'];
    public doughnutChartType:string = 'doughnut';
    public chartOptions = {
        maintainAspectRatio: false
    }
    public chartColors = [{
        backgroundColor: [
            'rgba(0, 249, 0, 1)',
            'rgba(255, 102, 0, 1)',
            'rgba(204, 0, 0, 1)'
        ],
        borderColor: [
            'rgba(0,0,0,0)',
            'rgba(0,0,0,0)',
            'rgba(0,0,0,0)'
        ]
    }];
    public doughnutBorderWidth: 5;

    @Input() set data(value: any) {
        if (typeof value != "undefined") {
            if (value[0] == "NaN") {
                this._data = [0, 0, 0];
            } else {
                this._data = value;
            }
        }
    }
    get data() {
        return this._data;
    }

    constructor() { }

    ngOnInit() { }

}