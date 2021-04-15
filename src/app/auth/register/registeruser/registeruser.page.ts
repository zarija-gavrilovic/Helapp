import { Component, OnInit } from '@angular/core';
import {Doctor} from '../../../doctor';
import {DoctorService} from '../../../doctor.service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.page.html',
  styleUrls: ['./registeruser.page.scss'],
})
export class RegisteruserPage implements OnInit {

  doctors: Doctor[] = [];
  constructor(
      private doctorService: DoctorService,
      private router: Router,
      private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  onRegisterUser(registrationForm) {
    const doctor: Doctor = this.doctorService.getDoctorProperty();
    doctor.username = registrationForm.value.username;
    doctor.password = registrationForm.value.password;
    console.log(JSON.stringify(doctor));
    // TODO: that should be prcessed on backend side
    // this.doctorService.getDoctors().subscribe((doctorsData) => {
    //   this.doctors = doctorsData;
      const doctor1 = this.doctorService.getDoctorProperty();
    //   for (const doctor in this.doctors) {
    //     if (this.doctors[doctor].username === doctor1.username || this.doctors[doctor].password === doctor1.password){
    //       this.presentToast('Doktor vec postoji u bazi');
    //       return;
    //     }
    //   }
      this.doctorService.createDoctor(doctor1).subscribe(() => {
        this.router.navigateByUrl('/login');
        this.presentToast('Doktor je uspesno unet u bazu');
      });
    // });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  goBack(){
    this.router.navigateByUrl('/register');
  }

}
