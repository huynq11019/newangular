import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../../../core/model/Product';
// import {EventEmitter} from 'events';

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

  constructor(private fb: FormBuilder,
              private spiner: NgxSpinnerService,
              private activeForm: NgbActiveModal
  ) {
  }


  ngOnInit(): void {
    console.log(this.product);
    this.form = this.fb.group({
      nameProduct: [this.product?.nameProduct, [Validators.required, Validators.minLength(5)]],
      description: [this.product?.description, [Validators.required, Validators.minLength(4)]],
      realPrice: [this.product?.realPrice, [Validators.required, Validators.min(0)]],
      discount: [this.product?.discount, [Validators.min(0), Validators.max(100)]],
      category: [this.product?.category],
      status: [this.product?.status],
      quantity: [this.product?.quantity, [Validators.min(0)]],
      image: [this.product?.image]

    });
  }


  choosefile(fileinput: any): void {
    // console.log(fileinput);
    if (fileinput.files && fileinput.files[0]) {
      console.log('lại là chao đay', fileinput?.files);
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
    this.onSUbmitForm.emit(this.form.value);
  }
}
