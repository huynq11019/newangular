import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import {OrderlistComponent} from './orderlist/orderlist.component';
import {OrderdetailComponent} from './orderdetail/orderdetail.component';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';


@NgModule({
  declarations: [
    OrderlistComponent,
    OrderdetailComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    NzPaginationModule
  ]
})
export class OrderModule { }
