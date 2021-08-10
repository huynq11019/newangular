import {Component, OnInit} from '@angular/core';
import {Account} from '../../../core/model/Account';
import {AuthService} from '../../../service/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public queryParam: any = {
    page: 0,
    limit: 5,
    keyword: '',
    order: 'DESC',
    orderBy: 'id'
  };
  public accountPage: any;
  public listAccount?: Array<Account>;

  constructor(private accountService: AuthService,
              private toasr: ToastrService) {
  }

  ngOnInit(): void {
    this.loadAll();
  }

  private loadAll(): void {
    this.accountService.loadPage(this.queryParam).subscribe(
      respon => {
        console.log(respon);
        this.accountPage = respon.body;
        // this.toasr.success('đã load danh sách user');
      },
      error => {
        console.log(error);
        this.toasr.error('lỗi load danh sách account', '400');
      },
      () => {
        console.log('dark dark lmao');
      }
    );
  }

  changePage(event: any): void {
    this.queryParam = {...this.queryParam, page: event};

    ;
  }

  changeSize(event: any): void {
    this.queryParam = {...this.queryParam, limit: event};

    // this.loadAllProduct();
  }
}
