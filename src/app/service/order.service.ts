import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {orderAPI} from '../core/constans/common';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  loadPage(param?: any): Observable<any> {

    return this.http.get(orderAPI.getPage, {observe: 'response'});
  }

  getOrderDetail(idOrder: number): Observable<any> {
    return this.http.get(orderAPI.getOrderDetail + idOrder, {observe: 'response'});
  }

  updateStatus(idOder: number, param: any): Observable<any> {
    const newParam = new HttpParams({fromObject: param});

    return this.http.put(orderAPI.updateStatus + idOder, newParam, {observe: 'response'});
  }
}
