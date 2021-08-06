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
import {NzButtonSize} from 'ng-zorro-antd/button';

@Component({
  selector: 'app-quanlysanpham',
  templateUrl: './quanlysanpham.component.html',
  styleUrls: ['./quanlysanpham.component.css']
})
export class QuanlysanphamComponent implements OnInit {
  public param = {
    page: 0,
    limit: 5,
    keywoord: '',
    order: 'DESC',
    orderBy: 'id'
  };
  public sanphamPage?: any;
  private fristSort = true;
  private modalRef: any;
  size: NzButtonSize = 'large';
  public totalElement?: number;
  // @ViewChild('myModal') myModal: any;
  private initProduct: Product = {discount: 0, quantity: 0, realPrice: 0, status: 1};

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
    console.log(this.param);
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
          this.totalElement = this.sanphamPage?.totalElement;
          console.log(this.sanphamPage?.totalElement);
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

  openNew(): void {
    this.openModal(this.initProduct, true
    );
  }

  openEdit(item: Product): void {
    this.openModal(item, false);
  }

  openModal(item: any, isCreate: boolean): void {
    // console.log(item);
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
      this.spiner.show();
      if (isCreate) {
        console.log('đang loading ', rs);
        await this.submitForm(rs);

      } else {
        console.log('update sản phẩm', rs);
        this.upDatePRoduct(rs);
      }
      this.spiner.hide();
    });
  }

  submitForm(data: Product): void {
    this.productService.createProdc(data)
      .subscribe((res) => {
          console.log(res);
          this.toasr.success('Product has created!', res.statusText);
          this.loadAllProduct();
        },
        error => {
          console.log(error);
          this.toasr.error('tạo sản phẩm không thành công', error.statusText);
        },
        () => console.log('hoàn thành'));
  }

  upDatePRoduct(data: Product): void {
    this.productService.updateProduct(data).subscribe(respon => {
        console.log((respon));
        this.loadAllProduct();
        this.toasr.success('cập nhận sản phẩm thành công', '200');
      },
      error => {
        console.log(error);
        this.toasr.error('cập nhật không thành công ', error.error.status);
      });
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
            this.loadAllProduct();
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

  changePage(event: any): void {
    this.param = {...this.param, page: event};

    this.loadAllProduct();
  }

  changeSize(event: any): void {
    this.param = {...this.param, limit: event};

    this.loadAllProduct();
  }
}
