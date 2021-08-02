import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import {OrderlistComponent} from './orderlist/orderlist.component';
import {OrderdetailComponent} from './orderdetail/orderdetail.component';


@NgModule({
  declarations: [
    OrderlistComponent,
    OrderdetailComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
