import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';

@Component({
  selector: 'app-regiter',
  templateUrl: './regiter.component.html',
  styleUrls: ['./regiter.component.css']
})
export class RegiterComponent implements OnInit {

  public formM: any;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private toasr: ToastrService,
              private spiner: NgxSpinnerService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.formM = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(10)]],
      description: [''],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(63)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(63)]],
      dob: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onRegister(): void {
    if (this.formM.valid) {
      console.log(this.formM.valid);
      console.log(this.formM.value);
      this.spiner.show();
      this.authService.register(this.formM.value).subscribe(
        respon => {
          console.log(respon);
          this.toasr.success('đăng ký thành công');
          this.spiner.hide();
          window.location.replace('http://localhost:8099/logind');
          window.close();
        }, error => {
          console.error(error);
          if (error.status === 400) {
            this.toasr.error( JSON.stringify(error.error),'lỗi' );
          }
          this.spiner.hide();
        },
        () => {
          console.log('hoàn thành');
        }
      );
    } else {
      this.toasr.warning('vui lòng điền đủ thông tin', 'valid fail');
    }

  }
}
