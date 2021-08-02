import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {CookieService} from 'ngx-cookie-service';
import {LOCAL_STORAGE} from '../constans/local-cookie-session.constants';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthenicatedGuard implements CanActivate {
  constructor(private $localStorage: LocalStorageService,
              private $cookie: CookieService,
              private $session: SessionStorageService,
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private toasr: ToastrService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('canActive', route, state);
    const accessToken = this.$localStorage.retrieve(LOCAL_STORAGE.JWT_TOKEN) || this.$session.retrieve(LOCAL_STORAGE.JWT_TOKEN);
    if (accessToken) {
      // có dữ liệu kết quả trả về bằng true
      console.log(accessToken);
      return true;
    }
    this.toasr.info('bạn cần đăng nhập để sử dụng chức năng này', 'yêu cầu xác thực người dùng');
    console.warn('bạn cầng đăng nhập để sử dụng chức năng này!');
    this.route.navigate(['/auth/']);
    return false;
  }

}
