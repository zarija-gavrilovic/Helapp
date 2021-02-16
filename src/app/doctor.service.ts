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
    getDoctors(): Observable<Doctor[]> {
        return this.http.get<Doctor[]>(`http://${IPLocalHost.IP}:5000/doctors`);
    }

    /** GET doctor from the server by username & password*/
    getDoctorByParams(username: string, password: string): Observable<Doctor> {
        return this.http.get<Doctor>(`http://${IPLocalHost.IP}:5000/doctor/${username}/${password}`)
            .pipe(
                catchError(this.handleError())
            );
    }
    private handleError() {
        return (): Observable<Doctor> =>{
            const doctor : Doctor = {
                doctor_id: null,
                name: null,
                surname: null,
                orientation: null,
                image: null,
                hospital: null,
                username: null,
                password: null,
            }
            return of (doctor);
        };
    }

    /** POST: add a new docotor to the server */
    addDoctor(doctor: Doctor): Observable<Doctor> {
        return this.http.post<Doctor>(`http://${IPLocalHost.IP}:5000/adddoctor`, doctor, this.httpOptions);

    }

    /** PUT: update the patient on the server */
    updateDoctor(doctor: Doctor): Observable<any> {
        return this.http.put<any>(`http://${IPLocalHost.IP}:5000/updatedoctor/${doctor.doctor_id}`, doctor, this.httpOptions);
    }



}
