import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {authrorityAPI} from '../core/constans/common';
import {Account} from '../core/model/Account';

@Injectable({
  providedIn: 'root'
})
export class AuthrorityService {

  constructor(private http: HttpClient,
              private toasr: ToastrService) {
  }

  getAllAuthrority(): Observable<any> {
    return this.http.get(authrorityAPI.getAll, {observe: 'response'});
  }

  updatePermistion(accoutnData: Account): Observable<any> {
    return this.http.put<any>(authrorityAPI.updatePermission, accoutnData, {observe: 'response'});
  }
}
