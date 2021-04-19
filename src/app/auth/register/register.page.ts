import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DoctorService} from '../../doctor.service';
import {NgForm} from '@angular/forms';
import {Doctor} from '../../doctor';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
      private router: Router,
      private doctorService: DoctorService) { }

  ngOnInit() {
  }

  onRegisterUser(registrationForm: NgForm){
    const doctor : Doctor = {
      doctor_id: null,
      name: registrationForm.value.name,
      surname: registrationForm.value.surname,
      orientation: registrationForm.value.orientation,
      image: null,
      hospital: registrationForm.value.hospital,
      username: null,
      password: null
    };
    this.doctorService.setDoctorProperty(doctor);
    this.router.navigateByUrl('/register/registeruser');
  }

}
