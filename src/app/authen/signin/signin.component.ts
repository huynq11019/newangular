import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public form: any;
  public error?: string;
  submited = false;

  constructor(private formBuilder: FormBuilder,
              private toasr: ToastrService,
              private spiner: NgxSpinnerService,
              private cokieService: CookieService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService
  ) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      reMemberMe: [false]
    });
    //xóa hoàn toàn thông tin user trong hệ thống

    this.authService.logout(1);
  }


  // tslint:disable-next-line:typedef
  onSubmit() {
    this.submited = true;
    this.error = '';
    if (this.form?.invalid) {
      this.toasr.error('yêu cầu nhập đầy đủ thông tin');

      this.error = 'username and password not valid';
      return;
    } else {
      // this.toasr.info('hi mọi người lại là huy đây', 'đang xác thực đăng nhập');
      this.spiner.show();
      console.log(this.form);
      console.log(this.f.userName.value);
      console.log(this.f.password.value);
      // this.authService.login(this.f.userName.value, this.f.password.value)
      //   .subscribe(
      //     (data: any) => console.log(data), // for handling data
      //     (error: any) => {
      //       setTimeout(() => {
      //         this.spiner.hide();
      //       }, 500);
      //       console.log(error);
      //       this.toasr.error('đăng nhập không thành công', 'login Fail');
      //     }, // for handling error
      //     () => {
      //       console.log('completed');
      //       setTimeout(() => {
      //
      //         this.spiner.hide();
      //       }, 500);
      //     }
      //   ); // for handling completion
      this.authService.loginAtvandce(this.f.userName.value, this.f.password.value, this.f.reMemberMe.value)
        .subscribe(() => console.log('đăng nhập thành công'),
          error1 => {
            console.log(error1);
            if (error1.status === 400) {
              this.toasr.error('đăng nhập không thành công', 'login Fail');
            } else {
              this.toasr.error('lỗi server', 'server Error');
            }
            this.spiner.hide();
          },
          () => {
            console.log('complete login');

            setTimeout(() => {
              this.spiner.hide();
            }, 1000);
          });
    }
  }

  // tslint:disable-next-line:typedef
  get f() {
    return this.form?.controls;
  }
}
