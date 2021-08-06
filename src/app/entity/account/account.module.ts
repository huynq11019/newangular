import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { PermissionComponent } from './permission/permission.component';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [AccountDetailComponent, PermissionComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    NzCheckboxModule,
    FormsModule,
  ]
})
export class AccountModule { }
