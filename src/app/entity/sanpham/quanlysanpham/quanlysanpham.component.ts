import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../service/product.service';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import * as _ from 'lodash';
import {ProductFormComponent} from '../product-form/product-form.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../../../core/model/Product';
import {ConfirmModalComponent} from '../../../core/component/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-quanlysanpham',
  templateUrl: './quanlysanpham.component.html',
  styleUrls: ['./quanlysanpham.component.css']
})
export class QuanlysanphamComponent implements OnInit {
  public param?: any;
  public sanphamPage?: any;
  private fristSort = true;
  private modalRef: any;
  // @ViewChild('myModal') myModal: any;
  curentProduct: any;

  // public newMomentObj = this.moment(job.createdAt, 'DD-MM-YYYY');

  constructor(private productService: ProductService,
              private toasr: ToastrService,
              private spiner: NgxSpinnerService,
              private route: Router,
              private modelService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.loadAllProduct();
  }

  loadAllProduct(): void {
    this.param = {...this.param, limit: 10};
    this.spiner.show();
    this.productService.getistProduct(this.param)
      .subscribe(resp => {
          this.sanphamPage = resp.body;
          console.log(resp);
        }
        ,
        err => {
          console.error(err);
          // console.log(this.route);
          if (err.error.status === 401) {
            this.toasr.error(err.error.message, err.error.status);
            this.route.navigate(['/auth/login']);
          }
          this.spiner.hide();
        }
        ,
        () => {
          this.spiner.hide();
          console.log('thành công');
        });
  }

  onViewProduct(idProduct: any): void {
    console.log('chòa em');
    window.open('http://localhost:8099/produx/' + idProduct);
  }

  public sortTable(sortBy: string): void {
    console.log('đây là sort');
    if (this.fristSort) {
      // DESC
      this.sanphamPage.content = _.orderBy(this.sanphamPage.content, [sortBy], ['asc']);
    } else {
      // ASC
      this.sanphamPage.content = _.orderBy(this.sanphamPage.content, [sortBy], ['desc']);
    }
    this.fristSort = !this.fristSort;
  }

  openModal(item: any): void {
    // console.log(item);
    this.curentProduct = item;
    const modelDep = this.modelService.open(ProductFormComponent, {
      size: 'xl',
      // modalClass: 'Create Product',
      // hideCloseButton: false,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      // closeOnOutsideClick: false,
      backdropClass: 'modal-backdrop'
    });
    modelDep.componentInstance.product = item;
    modelDep.componentInstance.onSUbmitForm.subscribe(async (rs: Product) => {
      console.log('đang loading ', rs);
      this.spiner.show();
      await this.submitForm(rs);
      this.spiner.hide();
    });
  }

  submitForm(data: Product): void {
    this.productService.createProdc(data)
      .subscribe((res) => {
          console.log(res);
          this.loadAllProduct();
        },
        error => console.log(error),
        () => console.log('hoàn thành'));
  }

  onRemveProduct(idProduct: number): void {
    const modelDep = this.modelService.open(ConfirmModalComponent, {
      size: 'xl',
      // modalClass: 'Create Product',
      // hideCloseButton: false,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      ariaLabelledBy: 'model-basic-title',
      // closeOnOutsideClick: false,
      backdropClass: 'modal-backdrop'
    });
    modelDep.componentInstance.title = 'Xác nhận xóa user';
    modelDep.componentInstance.confirmButton = 'xóa product';
    modelDep.result.then(value => {
      console.log(value);
      // console.log(idProduct);
      if (value === 'confirm') {
        this.spiner.show();
        this.productService.removeProduct(idProduct).subscribe(
          res => {
            console.log(res);
            this.toasr.success('đã xóa thàng công', res.status);
          },
          error => {
            console.log(error);
            this.toasr.error('xóa sản phẩm không thành công', error.status);
            this.spiner.hide();
          },
          () => {
            this.spiner.hide();
            console.log('complete');
          }
        );
      }
    });
  }

}
