import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Page500Component} from './authen/page500/page500.component';
import {Page404Component} from './authen/page404/page404.component';
import {AuthLayoutComponent} from './layout/app-layout/auth-layout/auth-layout.component';
import {ReportComponent} from './entity/report/report.component';
import {AuthenicatedGuard} from './core/interceptor/authenicated.guard';
import {MainLayoutComponent} from './layout/app-layout/main-layout/main-layout.component';

const routes: Routes = [
  {// đây là main layout
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthenicatedGuard],
    children: [{
      path: '',
      redirectTo: '/report',
      pathMatch: 'full'
    }, {
      path: 'produx',
      loadChildren: () => import('./entity/sanpham/sanpham.module').then((m) => m.SanphamModule)
    }, {
      path: 'report',
      component: ReportComponent
    }, {
      path: 'order',
      loadChildren: () => import('./entity/order/order.module').then((m) => m.OrderModule)
    },
      {
        path: 'account',
        loadChildren: () => import('./entity/account/account.module').then((m) => m.AccountModule)
      }]
  },
  //đây là auth laoout
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./authen/authen.module').then((m) => m.AuthenModule)
    }]
  }
  , {
    path: '**',
    component: Page404Component
  },
  {
    path: 'page500',
    component: Page500Component
  },
  { path: 'fnckshit', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
