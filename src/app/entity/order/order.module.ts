import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import {OrderlistComponent} from './orderlist/orderlist.component';
import {OrderdetailComponent} from './orderdetail/orderdetail.component';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import { SumPriceorderPipe } from './orderlist/sum-priceorder.pipe';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {FormsModule} from '@angular/forms';
import {NzButtonModule} from 'ng-zorro-antd/button';


@NgModule({
  declarations: [
    OrderlistComponent,
    OrderdetailComponent,
    SumPriceorderPipe
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    NzPaginationModule,
    NzSelectModule,
    FormsModule,
    NzButtonModule
  ]
})
export class OrderModule { }
