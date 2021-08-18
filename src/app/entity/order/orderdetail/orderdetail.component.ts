import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../../service/order.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit {
  private orderId?: any;
  public orderDetail: any;
  listOfOption2 = [{
    label: 'Dã xác nhận',
    val: 1
  }, {
    label: 'đang Giao',
    val: 2
  }, {
    label: 'Đã Giao',
    val: 3
  }, {
    label: 'Hủy',
    val: 4
  }];

  constructor(private Activedroute: ActivatedRoute,
              private orderService: OrderService,
              private spiner: NgxSpinnerService,
              private toasrt: ToastrService,
              private route: Router) {
  }

  ngOnInit(): void {
    this.orderId = this.Activedroute.snapshot.paramMap.get('orderId');
    this.loadOrderDetail();
  }

  loadOrderDetail(): void {
    this.spiner.show();
    this.orderDetail = this.orderService.getOrderDetail(this.orderId).subscribe(
      respon => {
        this.orderDetail = respon.body;
        this.spiner.hide();
      },
      err => {
        console.error(err);
        this.spiner.hide();
      }
    );
  }

  onSaveOrder(): void {
    this.orderService.updateStatus(this.orderDetail.id, {status: this.orderDetail.status}).subscribe(
      respon => {
        console.log(respon);
        this.toasrt.success('đã chuyển trạng thái đơn hàng');
        setTimeout(() => {
          this.route.navigate(['/order'], {queryParams: {id: 'hile'}});
        }, 2000);
      },
      error => {
        console.log(error);
        this.toasrt.error('lưu không thành công');
      }
    );
  }
}
