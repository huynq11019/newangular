import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountComponent} from './account/account.component';
import {AccountDetailComponent} from './account-detail/account-detail.component';
import {PermissionComponent} from './permission/permission.component';

const routes: Routes = [
  {
    // danh sách account
    path: '',
    component: AccountComponent
  },
  {
    path: 'detail/:id',
    component: AccountDetailComponent
  },
  {
    path: 'permission',
    component: PermissionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
