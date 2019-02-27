import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-grid-in-grid',
  templateUrl: './index.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public gridData: Array<any>;
  public innerData: Array<any>;
  public columnSelectorOption: any;
  public data: any;
  public chartOptions: any;
  public ehartsContent: any;
  public series: any[];
  public categories: number[];
  private cData: Array<number>;

  constructor() {

  }

  ngOnInit() {
    this.cData = this.getRandomData();
    this.gridData = [
      {
        id: '1',
        taskName: 'AAA',
        period: '每天',
        status: '正在进行',
        executeTime: '2018-10-10 23:23:23',
        createTime: '2018-10-10 23:23:23',
        endTime: '2018-10-10 23:23:23',
        score: 100
      }, {
        id: '1',
        taskName: 'AAA',
        period: '每天',
        status: '正在进行',
        executeTime: '2018-10-10 23:23:23',
        createTime: '2018-10-10 23:23:23',
        endTime: '2018-10-10 23:23:23',
        score: 100
      }
    ];
    this.innerData = [
      {
        id: 1,
        ename: 'chali',
        cname: 'chali',
        price: 100,
        quantity: 'good',
        no: '1',
        person: 'lisi',
        time: '2018-12-12',
        address: 'lili',
        level: 1
      },
      {
        id: 1,
        ename: 'chali',
        cname: 'chali',
        price: 100,
        quantity: 'good',
        no: '1',
        person: 'lisi',
        time: '2018-12-12',
        address: 'lili',
        level: 1
      },
      {
        id: 1,
        ename: 'chali',
        cname: 'chali',
        price: 100,
        quantity: 'good',
        no: '1',
        person: 'lisi',
        time: '2018-12-12',
        address: 'lili',
        level: 1
      },
      {
        id: 1,
        ename: 'chali',
        cname: 'chali',
        price: 100,
        quantity: 'good',
        no: '1',
        person: 'lisi',
        time: '2018-12-12',
        address: 'lili',
        level: 1
      },
      {
        id: 1,
        ename: 'chali',
        cname: 'chali',
        price: 100,
        quantity: 'good',
        no: '1',
        person: 'lisi',
        time: '2018-12-12',
        address: 'lili',
        level: 1
      }
    ];

    // primeNG chart
    this.data = {
      labels: this.categories.slice(0, 50),
      datasets: [
        {
          label: 'First Dataset',
          data: this.convertData(this.cData),
          fill: false,
          borderColor: '#4bc0c0'
        }
      ]
    };
    this.chartOptions = {
      'scales': {
        'yAxes': [{
          'reverse': true,
          'stacked': false,
          'ticks': {
            // max: 10e-1,
            // min: 10e-15,
            // stepSize: 10,
            // suggestedMax: 10e-1,
            // suggestedMin: 10e-15,
            // maxTicksLimit: 20,
            // callback: function (value, index, values) {
            //   return `10e-${index + 1}`;
            // }
          }
        }]
      }
    };

    // echarts
    this.ehartsContent = echarts.init(document.querySelector('#echarts'));
    const options = {
      tooltip: {
        formatter: function (params) {
          return `横轴：${params.dataIndex}<br\>纵轴：10e-${params.value}`;
        }
      },
      xAxis: {
        type: 'category',
        interval: 1,
        data: this.categories
      },
      yAxis: {
        type: 'value',
        max: '1',
        min: '15',
        interval: 1,
        inverse: true,
        scale: true,
        axisTick: {
          interval: (index, value) => {
            // debugger;
            const len = value.substring(value.lastIndexOf('.') + 1).length;
            const big = parseFloat(value) * Math.pow(10, len);
            return big % 10 === 0;
          }
          // interval: 0.01
        },
        axisLabel: {
          formatter: (value, index) => {
            return `10e-${value}`;
          }
        }
      },
      series: [{
        data: this.convertData(this.cData),
        type: 'line',
        smooth: true
      }]
    };
    this.ehartsContent.setOption(options);

    // kendo chart
    this.series = [{
      name: 'test',
      data: this.convertData(this.cData)
    }];
  }

  private getRandomData(): Array<number> {
    const list: Array<number> = [];
    const categoryDate: Array<number> = [];
    for (let i = 0; i < 365; i++) {
      list.push(1 / (Math.pow(10, Math.ceil(Math.random() * 12))));
      categoryDate.push(i + 1);
    }
    this.categories = categoryDate;
    return list;
  }

  private convertData(list: Array<number>): Array<number> {
    const cList: Array<number> = [];
    for (const i of list) {
      cList.push(-Math.log10(i));
    }
    return cList;
  }

}
