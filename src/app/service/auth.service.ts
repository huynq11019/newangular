import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, of, Subject, throwError} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {COOKIES, LOCAL_STORAGE, SESSION_STORAGE} from '../core/constans/local-cookie-session.constants';
import {map} from 'rxjs/operators';
import {authAPi} from '../core/constans/common';
// import  {LOCAL_STORAGE,SESSION_STORAGE,COOKIES} from '../core/constans/local-session-cookies.constants';
// import {SessionStorageService} from 'ngx-webstorage';
// import { TranslateService } from '@ngx-translate/core/';
// import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private resourceUrl = 'http://localhost:8099/';
  private authenticated = false;
  private userIdentity: any;
  private auhenticationState = new Subject<any>();
  private curentAccount: any; //lưu thông tin đăng nhập của người dùng

  constructor(private http: HttpClient,
              private coookie: CookieService,
              private toasr: ToastrService,
              private router: Router,
              private $localSorge: LocalStorageService,
              private $session: SessionStorageService
  ) {
  }

  login(emailLogin: string, password: string): Observable<any> {
    return this.http.post(this.resourceUrl + 'api/authenticate', {emailLogin, password}, {withCredentials: true});
  }

  loginAtvandce(emailLogin: string, password: string, rememberMe: boolean): Observable<any> {
    return this.http.post<any>(this.resourceUrl + 'api/authenticate',
      {emailLogin, password}, {withCredentials: true})
      .pipe(map(this.authenticateSuccess.bind(this, rememberMe)));
  }

  private authenticateSuccess(remenberMe: any, resp: any): void {
    const jwt = resp?.idToken;
    const email = resp?.name;
    const role = resp?.role;
    const tokenType = resp?.tokenType;
    console.log(remenberMe);
    console.log(resp);
    this.authenticated = true;
    this.coookie.set(COOKIES.REFRESH_TOKEN, jwt, {path: '/'});
    this.storeAuthenticationToken(jwt, role, remenberMe);
    this.getUserTokenFormJwt(jwt);
    // chuyển hướng trang
    this.router.navigate(['/']);
    this.toasr.success('đang nhập thành công ', 'login Successs');

  }


  storeAuthenticationToken(jwt: string, role: string[], rememberMe: boolean): void {
    if (rememberMe) {
      this.$localSorge.store(LOCAL_STORAGE.JWT_TOKEN, jwt);
      this.$localSorge.store(LOCAL_STORAGE.ROLE, role);
    } else {
      this.$session.store(SESSION_STORAGE.JWT_TOKEN, jwt);
      this.$session.store(LOCAL_STORAGE.ROLE, role);
    }
  }

  loadAllUser(param: any): Observable<any> {
    const newParam = new HttpParams({fromObject: param});
    return this.http.get(authAPi.getAll, {params: newParam});
  }

  isAuthenticae(): boolean {
    const jwt = this.$localSorge.retrieve(LOCAL_STORAGE.JWT_TOKEN) || this.$session.retrieve(LOCAL_STORAGE.JWT_TOKEN);
    return this.authenticated;
  }

  authen(identity: any): void {
    this.userIdentity = identity;
    this.authenticated = identity !== null;
  }

  public logout(userId: number) {
    // remove user from local storage to log user out
    this.$localSorge.clear(LOCAL_STORAGE.JWT_TOKEN);
    this.$session.clear(SESSION_STORAGE.JWT_TOKEN);
    this.coookie.delete(COOKIES.REFRESH_TOKEN);
    return this.http.post<any>(`${this.resourceUrl}/logout`, {userId});
    this.authenticated = false;
    //  this.authenticate(null);

    return of({success: false});
  }

  public getUserTokenFormJwt(jwt: string): void {
    if (jwt) {
      this.http.get(authAPi.getUserInfor,
        {headers: {'Authorization': jwt}, observe: 'response'})
        .subscribe(resps => {
            console.log(resps);
            this.curentAccount = resps.body;
          },
          err => this.handleError(err));
    }
  }

  public handleError(error: HttpErrorResponse): any {
    // return Promise.reject(error.message || error)
    if (error.error instanceof ErrorEvent) {
      console.error('Có một lỗi ở đây', error.error.message);
    } else {
      //he back end return unsuccessful response code
      //the response bodymy contain clues as to what  went wrong
      console.log(`back end return turn code4${error.status}` + `body was: ${error.error}`);
    }
    return throwError('Some thing  bad happed: pleace try agin later');
  }
}
