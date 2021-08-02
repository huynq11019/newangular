import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import {LocalStorageService} from 'ngx-webstorage';
import { AuthenRoutingModule } from './authen-routing.module';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import {SigninComponent} from './signin/signin.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegiterComponent } from './regiter/regiter.component';
// import {LocalStorageProvider} from 'ngx-webstorage/lib/core/nativeStorage';


@NgModule({
  declarations: [ForgotpassComponent,
    SigninComponent,
    RegiterComponent
  ],
  imports: [
    CommonModule,
    AuthenRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  // providers: [LocalStorageService]
})
export class AuthenModule { }
