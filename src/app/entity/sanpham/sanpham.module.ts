import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SanphamRoutingModule} from './sanpham-routing.module';
import {QuanlysanphamComponent} from './quanlysanpham/quanlysanpham.component';
import {MomentModule} from 'ngx-moment';
import {NgbActiveModal, NgbButtonsModule} from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ModalModule} from 'ngb-modal';
import {ProductFormComponent} from './product-form/product-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [QuanlysanphamComponent, ProductFormComponent],
  imports: [
    CommonModule,
    SanphamRoutingModule,
    MomentModule,
    NgbButtonsModule,
    MatButtonModule,
    MatIconModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [NgbActiveModal]
})
export class SanphamModule {
}
