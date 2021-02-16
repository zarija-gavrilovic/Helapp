import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {LogInfo} from "./logInfo";
import {IPLocalHost} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class LogInfoService {

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    date = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
    time = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
    constructor(private http: HttpClient) {
    }

    getFullTime(){
        return "Vreme: " + this.date + " " + this.time;
    }
    private _logInfoList = new BehaviorSubject<String[]>([]);

    get logInfoList() {
        return this._logInfoList.asObservable();
    }

    /** GET patients from the server */
    getLogInfoList(): Observable<LogInfo[]> {
        return this.http.get<LogInfo[]>(`http://${IPLocalHost.IP}:5000/loginfolist`);
    }

    /** POST: add a new logInfo to the server */
    addLogInfo(logInfo: LogInfo): Observable<LogInfo> {
        return this.http.post<LogInfo>(`http://${IPLocalHost.IP}:5000/addloginfo`, logInfo, this.httpOptions);
    }




}
