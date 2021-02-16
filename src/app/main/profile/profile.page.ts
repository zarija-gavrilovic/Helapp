import {Component, OnInit, ViewChild} from '@angular/core';
import {DoctorService} from '../../doctor.service';
import {Doctor} from '../../doctor';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild('doctorForm', null) doctorForm: HTMLFormElement;
  doctor: Doctor = null;
  constructor(
      private doctorServer: DoctorService,
      private authService: AuthService,
      private router: Router,
      private toastController: ToastController
  ) {

    this.doctor = this.doctorServer.getDoctorProperty();
    this.backToLogin();
    let formData = {
      name : this.doctor.name,
      surname: this.doctor.surname,
      orientation: this.doctor.orientation,
      hospital: this.doctor.hospital
    }
    setTimeout(() => {
      this.doctorForm.setValue(formData);
    });
  }

  ngOnInit() {
    this.doctor = this.doctorServer.getDoctorProperty();
    this.backToLogin();
  }

  ionViewWillEnter(){
    this.doctor = this.doctorServer.getDoctorProperty();
    this.backToLogin();
  }

  changeDoctor(doctorForm: NgForm){
    const doctor: Doctor = {
      doctor_id: this.doctor.doctor_id,
      name: doctorForm.value.name,
      surname: doctorForm.value.surname,
      orientation: doctorForm.value.orientation,
      image: null,
      hospital: doctorForm.value.hospital,
      username: this.doctor.username,
      password: this.doctor.password
    }
    this.doctorServer.updateDoctor(doctor).subscribe(() => {
      this.doctorServer.setDoctorProperty(doctor);
      this.doctor  = this.doctorServer.getDoctorProperty();
      this.presentToast('Podaci uspeno izmenjeni!');
      console.log('Successfully updated!');
    });
  }

  deleteDoctor(doctorForm: NgForm){
    let date = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
    let time = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
    const doctor: Doctor = {
      doctor_id: this.doctor.doctor_id,
      name: doctorForm.value.name,
      surname: doctorForm.value.surname,
      orientation: doctorForm.value.orientation,
      image: null,
      hospital: doctorForm.value.hospital,
      username: date +' '+ time,
      password: date +' '+ time
    }
    this.doctorServer.updateDoctor(doctor).subscribe(() => {
      this.presentToast('Doktor uspesno obrisan!');
      this.router.navigateByUrl('/register');
      console.log('Successfully updated!');
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  backToLogin() {
    if(this.doctor === null){
      this.router.navigateByUrl('/login');
      this.authService.logOut();
      console.log('Back to login');
      return;
    }
  }

  logOut() {
    this.doctorServer.setDoctorProperty(null);
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }


}
