import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderlistComponent} from './orderlist/orderlist.component';
import {OrderdetailComponent} from './orderdetail/orderdetail.component';

const routes: Routes = [
  {
    path: '',
    component: OrderlistComponent
  },
  {
    path: 'detail',
    component: OrderdetailComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {
}
