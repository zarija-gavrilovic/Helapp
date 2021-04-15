import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { Doctor } from './doctor';
import {IPLocalHost} from '../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DoctorService {

    doctor: Doctor = null;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) {
    }

    /**GET doctor property*/
    getDoctorProperty() {
        return this.doctor;
    }

    /**SET doctor property*/
    setDoctorProperty(doctor: Doctor) {
        this.doctor = doctor;
    }

    /** GET doctors from the server */
    /** This method is used in register page.
     * Should be transfer to backend that logic so that method is unnessery
     */
    // getDoctors(): Observable<Doctor[]> {
    //     return this.http.get<Doctor[]>(`http://${IPLocalHost.IP}:5000/doctors`);
    // }

    /** GET doctor from the server by username & password*/
    getDoctorByParams({username, password}): Observable<Doctor> {
        return this.http.post<Doctor>(`http://${IPLocalHost.IP}:5000/login`, {username, password}, this.httpOptions);
    }

    /** POST: add a new doctor to the server */
    createDoctor(doctor: Doctor): Observable<Doctor> {
        return this.http.post<Doctor>(`http://${IPLocalHost.IP}:5000/createdoctor`, doctor, this.httpOptions);
    }

    /** PUT: update the patient on the server */
    /** Username and password are not changable! [if we speak about manual update]*/
    /** Delete user method doesn't exist, we change username and password on date */
    updateDoctor(doctor: Doctor): Observable<any> {
        return this.http.put<any>(`http://${IPLocalHost.IP}:5000/updatedoctor/${doctor.doctor_id}`, doctor, this.httpOptions);
    }



}
