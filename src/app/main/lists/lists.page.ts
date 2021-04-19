import { Component, OnInit } from '@angular/core';
import {Patient} from '../patient';
import {DoctorService} from '../../doctor.service';
import {LogInfoService} from '../log-info/log-info.service';
import {PatientService} from '../patient.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage implements OnInit {


  list_header_menu: String = 'waiting-room';
  patients: Patient[] = [];

  constructor(
      private patientService: PatientService,
      private logInfoService: LogInfoService,
      private doctorService: DoctorService
  ) {

  }

  ngOnInit() {
    this.patientService.getPatientsByCategory('waiting-room').subscribe((patients) => {
      this.patients = patients;
    });
  }


  loadData(){
    switch (this.list_header_menu) {
      case 'waiting-room' :
        this.patientService.getPatientsByCategory('waiting-room').subscribe((patients) => {
          this.patients = patients.reverse();
        });
        break;
      case 'in-process' :
        this.patientService.getPatientsByCategory('in-process').subscribe((pcategory) => {
          this.patients = pcategory.reverse();
        });
        break;
      case 'healthy' :
        this.patientService.getPatientsByCategory('healthy').subscribe((pcategory) => {
          this.patients = pcategory.reverse();
        });
        break;
    }
  }

  moveToHospitalize(patient : Patient){
    patient.category = 'in-process';
    this.patientService.updatePatientCategory(patient).subscribe((response) => {
      this.loadData();
    });

    let logInfo = {info : "Doktor: "+this.doctorService.getDoctorProperty().name + " "+this.doctorService.getDoctorProperty().surname + " je premestio pacijenta: " + patient.name + " "+ patient.surname + " na HOSPITALIZACIJU "+this.logInfoService.getFullTime()};
    this.logInfoService.createLogInfoItem(logInfo).subscribe(logInfo => {console.log('RETURNED OBJECT: ' + JSON.stringify(patient));})
  }

  moveToHealthy(patient : Patient){
    patient.category = 'healthy';
    this.patientService.updatePatientCategory(patient).subscribe((response) => {
      console.log('Successfully updated patinetID: ' + response);
      this.loadData();
    });

    let logInfo = {info : "Doktor: "+this.doctorService.getDoctorProperty().name + " "+this.doctorService.getDoctorProperty().surname + " je OTPUSTIO pacijenta: " + patient.name + " "+ patient.surname+" " +this.logInfoService.getFullTime()};
    this.logInfoService.createLogInfoItem(logInfo).subscribe();
  }

  deletePatient(patient){
    this.patientService.deletePatient(patient).subscribe((response) => {
      console.log(response);
      this.loadData();
    });

    // this.patientService.snapshots.subscribe();
    let logInfo = {info : "Doktor: "+this.doctorService.getDoctorProperty().name + " "+this.doctorService.getDoctorProperty().surname + " je OBRISAO pacijenta: " + patient.name + " "+ patient.surname+" " +this.logInfoService.getFullTime()};
    this.logInfoService.createLogInfoItem(logInfo).subscribe()
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
