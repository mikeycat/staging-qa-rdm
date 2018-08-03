import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: 'chart-line',
    templateUrl: './line.html'
})
export class LineChart implements OnInit {

    private _data: any = [];

    public chartData = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Passed'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Failed'},
        {data: [43, 53, 65, 56, 23, 34, 65], label: 'Error'}
    ];
    public labels:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    public lineChartType:string = 'line';
    public chartOptions = {
        maintainAspectRatio: false,
        responsive: true
    }
    public chartColors = [
        { // passed
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(0,249,0,1)',
        pointBackgroundColor: 'rgba(0, 249, 0, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff'
        },
        { // failed
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(255,102,0,1)',
        pointBackgroundColor: 'rgba(255, 102, 0, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff'
        },
        { // error
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(204,0,0,1)',
        pointBackgroundColor: 'rgba(204, 0, 0, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff'
        }
    ];

    constructor() { }

    @Input() set data(value: any) {
        if (typeof value != "undefined") {
            console.log(value);
            this.chartData = value;
        }
    }

    ngOnInit(): void { }

}