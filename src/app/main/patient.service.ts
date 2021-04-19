import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, concat, Observable} from 'rxjs';
import { Patient } from "./patient";
import {map, switchMap, take, tap} from "rxjs/operators";
import {State} from "./state";
import {IPLocalHost} from "../../environments/environment";



@Injectable({
    providedIn: 'root'
})
export class PatientService {

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) {
    }

    private _patients = new BehaviorSubject<Patient[]>([]);
    // private _state = new BehaviorSubject<State[]>([]);


    get patients() {
        return this._patients.asObservable();
    }

    // get snapshots() {
    //     return this._state.asObservable();
    // }

    /** GET patients from the server + condition [category] */
    getPatientsByCategory(category: string): Observable<Patient[]> {
        return this.http.get<Patient[]>(`http://${IPLocalHost.IP}:5000/patient/category/${category}`);
    }


    /**GET snapshot from the server [highcharts]*/
    getStates(){
        return this.http.get<any>(`http://${IPLocalHost.IP}:5000/state`);
    }

    /** POST: add a new patient to the server */
    createPatient(patient: Patient): Observable<any> {
        return this.http.post<any>(`http://${IPLocalHost.IP}:5000/patient/create`, patient, {responseType: 'text' as 'json'});
    }

    /** PUT: update the patient on the server */
    updatePatientCategory(patient: Patient): Observable<any> {
        return this.http.put<any>(`http://${IPLocalHost.IP}:5000/patient/update/${patient.patient_id}`, patient, this.httpOptions);
    }

    /** DELETE: delete the patient from the server*/
    deletePatient(patient: Patient): Observable<Patient> {
        return  this.http.get<any>(`http://${IPLocalHost.IP}:5000/patient/delete/${patient.patient_id}`,{responseType: 'text' as 'json'});
    }


}
