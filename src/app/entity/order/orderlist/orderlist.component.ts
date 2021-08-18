import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../../service/order.service';
import {ToastrService} from 'ngx-toastr';
import * as _ from 'lodash';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  public orderPage: any;
  private orderBystt = false;

  constructor(private orderList: OrderService,
              private toasr: ToastrService) {
  }

  private queryParam = {
    page: 0,
    limit: 10,
    keyword: ''
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.orderPage = this.orderList.loadPage(this.queryParam).subscribe(
      respon => {
        console.log(respon);
        this.orderPage = respon.body;
      },
      err => {
        console.log(err);
        this.toasr.error('lỗi load list order');
      }
    );
  }

  changePage(event: any, pro: string): void {
    // console.log(event);
    // lấy size
    // lấy page index
    this.queryParam = {...this.queryParam, [pro]: event};
    // load
    console.log(this.queryParam);
  }

  sortTable(sortBy: string): void {
    console.log('sort table');
    if (this.orderBystt) {
      // DESC
      this.orderPage.content = _.orderBy(this.orderPage.content, [sortBy], ['desc']);

    } else {
      // ASC
      this.orderPage.content = _.orderBy(this.orderPage.content, [sortBy], ['asc']);
    }

    this.orderBystt = !this.orderBystt;
  }
}
