import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SigninComponent} from './signin/signin.component';
import {ForgotpassComponent} from './forgotpass/forgotpass.component';
import {RegiterComponent} from './regiter/regiter.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }, {
    path: 'login',
    component: SigninComponent
  }, {
    path: 'forgotpassword',
    component: ForgotpassComponent
  }, {
    path: 'regiter',
    component: RegiterComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenRoutingModule {
}
