import { Component, OnInit } from '@angular/core';
import {DoctorService} from '../../doctor.service';
import {LogInfo} from '../../main/log-info/logInfo';
import {LogInfoService} from '../../main/log-info/log-info.service';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {MenuController, NavController, Platform, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  logInfo: LogInfo;
  subscribe: any;
  constructor(
        private doctorService: DoctorService,
        private logInfoService: LogInfoService,
        private authService: AuthService,
        private router: Router,
        private navCtrl: NavController,
        private menuCtrl: MenuController,
        private toastController: ToastController,
        public platform: Platform){
    this.menuCtrl.enable(false, 'main-menu');

  }

  ionViewDidEnter() {
    this.subscribe = this.platform.backButton.subscribeWithPriority(666666, () => {
      if (this.constructor.name === 'LoginPage'){
        if (window.confirm('Da li zelite da izadjete iz aplikacije?')){
          navigator['app'].exitApp();
        }
      }
    });
  }

  ionViewDidLeave() {
      this.subscribe.unsubscribe();
  }

  ngOnInit() {

  }

  onLogIn(logInForm){
    this.doctorService.getDoctorByParams({username: logInForm.value.username, password: logInForm.value.password})
        .subscribe((doctor) => {
          if (doctor.username === null || doctor.password === null) {
            this.authService.logOut();
            console.log('Doctor does not exist');
            this.presentToast('Neuspesno logovanje!');
          } else {
            this.doctorService.setDoctorProperty(doctor);
            this.authService.logIn();
            this.router.navigateByUrl('/main/review');
            // console.log(JSON.stringify(this.doctorService.getDoctorProperty()) + 'LOGIN PAGE');
            console.log(doctor);
            this.logInfo = {
              info: 'Korisnik ' + doctor.name + ' ' + doctor.surname + ' se ulogovao.' + this.logInfoService.getFullTime()
            };
            this.logInfoService.createLogInfoItem(this.logInfo).subscribe((response) => {
              console.log(response);
            });
            this.presentToast('Dobrodosli na HELAAP!');
          }
          logInForm.reset();
        });

  }

  goToRegisterPage() {
    this.router.navigateByUrl('/register');
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
