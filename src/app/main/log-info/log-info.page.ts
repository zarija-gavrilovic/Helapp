import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {LogInfoService} from './log-info.service';
import {DoctorService} from '../../doctor.service';
import {LogInfo} from './logInfo';
import {Doctor} from '../../doctor';

@Component({
  selector: 'app-log-info',
  templateUrl: './log-info.page.html',
  styleUrls: ['./log-info.page.scss'],
})
export class LogInfoPage implements OnInit {
  doctor: Doctor = null;
  date = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
  time = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
  logInfoList: LogInfo[] = [];

  constructor(
      private doctorService: DoctorService,
      private logInfoService: LogInfoService,
      private router: Router,
      private authService: AuthService
  ) {
    this.doctor = doctorService.getDoctorProperty();
    this.logInfoService.getLogInfoList().subscribe((loginfolist) => {
      this.logInfoList= loginfolist;
    });
  }

  ngOnInit() {
    this.doctor = this.doctorService.getDoctorProperty();
    this.backToLogin();
  }

  ionViewWillEnter(){
    this.doctor = this.doctorService.getDoctorProperty();
    this.backToLogin();
  }

  backToLogin() {
    if(this.doctor === null){
      this.router.navigateByUrl('/login');
      this.authService.logOut();
      console.log('Back to login');
      return;
    }
  }


}
