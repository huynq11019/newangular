import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {CookieService} from 'ngx-cookie-service';
import {LOCAL_STORAGE} from '../constans/local-cookie-session.constants';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private $localStorage: LocalStorageService,
              private $cookie: CookieService,
              private $session: SessionStorageService,
              private route: Router,
              private activatedRoute: ActivatedRoute) {
  }

//interceptor sẽ gắn nhãn mọi request tới server thông qua interceptor
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('interceptor');
    if (window.location.toString().indexOf('register') !== -1) {
      return next.handle(request);
    }
    // lấy accesstoken từ localsorage hoặc session

    const token = this.$localStorage.retrieve(LOCAL_STORAGE.JWT_TOKEN) || this.$session.retrieve(LOCAL_STORAGE.JWT_TOKEN);

    if (!!token) {
      // tạo một header mới rồi gắn thêm token vào header đó
      const newHeader = new HttpHeaders().set('reFreshToken', 'Bearer thisisrefreshtoken').set('Authorization', 'bruh ' + token);
      const authrequest = request.clone({headers: newHeader});
      return next.handle(authrequest);
      // set thẳng token vào header cũ
    } else {
      this.route.navigate(['/auth']);

    }
    return next.handle(request);
  }
}
