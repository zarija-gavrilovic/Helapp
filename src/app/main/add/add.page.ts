import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ToastController} from '@ionic/angular';
import {LogInfoService} from '../log-info/log-info.service';
import {DoctorService} from '../../doctor.service';
import {PatientService} from '../patient.service';
import {Patient} from '../patient';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  patient: Patient = null;
  constructor(
      private patientService: PatientService,
      private doctorService: DoctorService,
      private logInfoService: LogInfoService,
      private toastController: ToastController) { }

  ngOnInit() {
  }

  addPatient(form: NgForm) {
    this.patient= {
      patient_id: null,
      name: form.value.name,
      surname: form.value.surname,
      image: 'unknown',
      diagnosis: form.value.diagnosis,
      review: 'CEKAONICA'
    }
    this.patientService.addPatient(this.patient).subscribe((patient) => {

      console.log('RETURNED OBJECT: ' + JSON.stringify(patient));
      let logInfo = {info : "Doktor: "+this.doctorService.getDoctorProperty().name + " "+this.doctorService.getDoctorProperty().surname + " je uneo pacijenta: " + this.patient.name + " "+ this.patient.surname + " "+this.logInfoService.getFullTime()};
      this.logInfoService.addLogInfo(logInfo).subscribe();
      this.presentToast('Pacijent je uspesno unet!');
      form.reset();
    });

  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message : message,
      duration: 2000
    });
    toast.present();
  }

}
