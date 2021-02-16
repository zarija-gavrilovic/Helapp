import { Component, OnInit } from '@angular/core';
import {PatientService} from '../patient.service';
import {SnapShot} from '../snapshot';
import {Subscription} from 'rxjs';
import * as HighCharts from 'highcharts';
import {Platform} from '@ionic/angular';
@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {

  waiting_roomArr = [];
  in_processArr  = [];
  healthyArr  = [];
  private snapshotSub: Subscription;
  private snapShotArr: SnapShot[] = [];

  subscribe: any;
  constructor(private patientService: PatientService,
              public platform: Platform) {
    // this.subscribe = this.platform.backButton.subscribeWithPriority(666666, () => {
    //   if (this.constructor.name == 'ReviewPage'){
    //     if (window.confirm('Da li zelite da izadjete iz aplikacije?')){
    //       navigator['app'].exitApp();
    //     }
    //   }
    // });
  }

  ionViewDidEnter() {
    this.loadData();
  }

  // ionViewDidLeave() {
  //   this.subscribe.unsubscribe();
  // }

  ngOnInit() {
    this.snapshotSub = this.patientService.snapshots.subscribe();
  }

  loadData(){
    this.waiting_roomArr = [];
    this.in_processArr  = [];
    this.healthyArr  = [];
    this.patientService.getSnapshot().subscribe((snapShotsArr) => {
      this.snapShotArr = snapShotsArr;
      for (const ssData in snapShotsArr){
        this.waiting_roomArr.push(snapShotsArr[ssData].waiting_room);
        this.in_processArr.push(snapShotsArr[ssData].in_process);
        this.healthyArr.push(snapShotsArr[ssData].healthy);
      }
      console.log('NIZ A ' + this.waiting_roomArr);
      console.log('NIZ B ' + this.in_processArr);
      console.log('NIZ C ' + this.healthyArr);
      this.plotSimpleBarChart();
      this.plotSimplePieChart(this.waiting_roomArr[this.waiting_roomArr.length - 1], this.in_processArr[this.in_processArr.length - 1], this.healthyArr[this.healthyArr.length - 1]);
    });
  }
  plotSimpleBarChart() {
    //console.log(this.waiting_roomArr.reverse() + 'REVERSE');
    const myChart = HighCharts.chart('highcharts', {
      chart: {
        type: 'area'
      },
      title: {
        text: 'Stanje u bolnici'
      },
      xAxis: {
        categories: ['Vreme']
      },
      yAxis: {
        title: {
          text: 'Broj pacijenata'
        }
      },
      series: [
        {
          name: 'U cekaonici',
          type: undefined,
          data: this.waiting_roomArr.reverse()
        },
        {
          name: 'Na lecenju',
          type: undefined,
          data: this.in_processArr.reverse()
        },
        {
          name: 'Otpusteni',
          type: undefined,
          data: this.healthyArr.reverse()
        }]
    });
  }

  plotSimplePieChart(arr1, arr2, arr3) {
    console.log(arr1 + 'ff' + arr2 + ' ' + arr3);
    const sum =  Number(arr1) + Number(arr2) + Number(arr3);
    const waiting_roomPie = arr1 / sum * 100;
    const in_processPie = arr2 / sum * 100;
    const healthyPie = 100 - waiting_roomPie - in_processPie;
    console.log('Arr1: ' + waiting_roomPie + ' Arr2: ' + in_processPie + ' Arr3: ' + healthyPie + ' total: ' + sum);

    const myChart = HighCharts.chart('simplePie', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Broj pacijenata'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: <br>  {point.percentage:.1f} %',
            style: {
              color: 'black'
            }
          }
        }
      },
      series: [{
        name: 'Percentage',
        colorByPoint: true,
        type: undefined,
        data: [{
          name: 'U cekaonici',
          y: waiting_roomPie,
          sliced: true,
          selected: true
        }, {
          name: 'Na lecenju',
          y: in_processPie
        }, {
          name: 'Otpusteni',
          y: healthyPie
        }]
      }]
    });
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.loadData();
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
