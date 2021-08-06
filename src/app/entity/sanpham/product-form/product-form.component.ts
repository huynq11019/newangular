import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../../../core/model/Product';
import {CategoriesService} from '../../../service/categories.service';
import {UploadfileServiceService} from '../../../service/uploadfile-service.service';
// import {EventEmitter} from 'events';
// import {S} from 'ng2-file-uploader/ng2-file-uploader';
declare var $: any;

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',

  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Input() product?: Product;
  @Output() onSUbmitForm = new EventEmitter();
  public form: any;
  public categories: any;
  private queryParam: any;

  // public formData?: FormGroup;

  constructor(private fb: FormBuilder,
              private spiner: NgxSpinnerService,
              private activeForm: NgbActiveModal,
              private cateService: CategoriesService,
              private uploadFile: UploadfileServiceService
  ) {
  }


  ngOnInit(): void {
    console.log(this.product);
    this.form = this.fb.group({
        id: [this.product?.id],
        nameProduct: [this.product?.nameProduct, [Validators.required, Validators.minLength(5)]],
        description: [this.product?.description, [Validators.required, Validators.minLength(10)]],
        realPrice: [this.product?.realPrice, [Validators.required, Validators.min(0)]],
        discount: [this.product?.discount, [Validators.min(0), Validators.max(100)]],
        category: [this.product?.category],
        status: [this.product?.status],
        quantity: [this.product?.quantity, [Validators.min(0)]],
        image: [this.product?.image]

      }
    );

    this.cateService.getListCategories(this.queryParam)
      .subscribe(res => {
          console.log(res);
          this.categories = res.body;
        },
        error => console.error(error),
        () => {
          console.log('đã hoàn thành đăng ký');
        }
      );
  }


  choosefile(fileinput: any): void {
    console.log(fileinput.files[0]);

    if (fileinput.files && fileinput.files[0]) {
      const formDatax = new FormData();
      formDatax.append('uploadFile', fileinput.files[0]);
      this.uploadFile.loadFile(formDatax).subscribe(
        respon => {
          console.log(respon.body.fileName);
          console.log(this.form.value);
          this.form.value.image = respon.body.fileName ?? 'https://www.playzone.vn/image/cache/no_image-100x100.png';
        },
        erro => {
          console.error(erro);
        });
      console.log('lại là chao đay', fileinput?.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        $('#image').attr('src', e?.target?.result);
        // console.log(e);
      };
      reader.readAsDataURL(fileinput.files[0]);
    }
  }

  cancel(): void {
    this.activeForm.close();
  }

  onsubmitform(): void {
    // console.log(this.form);
    console.log(this.form.valid);
    // onsubmit(this.form.valueOf())
    // if(this.form.value.image === this.product?.image){
    //
    // }
    this.onSUbmitForm.emit(this.form.value);

    this.activeForm.close();
  }
}
