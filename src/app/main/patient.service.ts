import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, concat, Observable} from 'rxjs';
import { Patient } from "./patient";
import {map, switchMap, take, tap} from "rxjs/operators";
import {SnapShot} from "./snapshot";
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
    private _snapshots = new BehaviorSubject<SnapShot[]>([]);


    get patients() {
        return this._patients.asObservable();
    }

    get snapshots() {
        return this._snapshots.asObservable();
    }

    /** GET patients from the server */
    getPatients(): Observable<Patient[]> {
        return this.http.get<Patient[]>(`http://${IPLocalHost.IP}:5000/patients`)
            .pipe(
                tap(patients => {
                    this._patients.next(patients);
                })
            );
    }


    /** GET patients from the server + condition */
    //TODO: finis getPatientsCategory
    getPatientsCategory(category: string): Observable<Patient[]> {
        return this.http.get<Patient[]>(`http://${IPLocalHost.IP}:5000/pcategory/${category}`);
    }


    /**GET snapshot from patient table*/
    getSnapshot(){
        return this.http.get<{[ssData: string]: SnapShot }>(`http://${IPLocalHost.IP}:5000/snapshot`)
            .pipe(
                map((snapShotsData) => {
                    console.log(snapShotsData);
                    const snapShotArr: SnapShot[] = [];
                    for(const ssData in snapShotsData){
                        if (snapShotsData.hasOwnProperty(ssData)) {
                            snapShotArr.push({
                                waiting_room: snapShotsData[ssData].waiting_room,
                                in_process: snapShotsData[ssData].in_process,
                                healthy: snapShotsData[ssData].healthy
                            });
                        }
                    }
                    return snapShotArr;
                }),
                tap(snapShotArr => {
                    this._snapshots.next(snapShotArr)
                })
            );
    }

    /** POST: add a new patient to the server */
    addPatient(patient: Patient): Observable<Patient[]> {
        return this.http.post<Patient[]>(`http://${IPLocalHost.IP}:5000/addpatient`, patient, this.httpOptions)
            .pipe(
                tap((patients)=>{
                    this._patients.next(patients.concat(patient))
                })
            );
    }

    /** PUT: update the patient on the server */
    updatePatient(patient: Patient): Observable<any> {
        return this.http.put<any>(`http://${IPLocalHost.IP}:5000/updatepatient/${patient.patient_id}`, patient, this.httpOptions);
    }

    /** PUT: update the patient on the server */
    updatePatientReview(patient: Patient): Observable<any> {
        return this.http.put<any>(`http://${IPLocalHost.IP}:5000/updatepatientreview/${patient.patient_id}`, patient, this.httpOptions);
    }


    /** DELETE: delete the patient from the server*/
    deletePatient(patient: Patient): Observable<Patient> {
        return  this.http.get<any>(`http://${IPLocalHost.IP}:5000/deletepatient/${patient.patient_id}`,this.httpOptions);
    }


}
