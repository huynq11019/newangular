import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {reportAPI} from '../core/constans/common';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) {
  }

  public getProductReport(param: any): Observable<any> {
    const newParam = new HttpParams({fromObject: param});
    return this.http.get(reportAPI.getProductReport, {observe: 'response', params: newParam});
  }

  public getCateReport(param: any): Observable<any> {
    const newParam = new HttpParams({fromObject: param});
    return this.http.get(reportAPI.getReportCate, {observe: 'response', params: newParam});
  }
}
