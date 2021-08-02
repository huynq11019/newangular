import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuanlysanphamComponent} from './quanlysanpham/quanlysanpham.component';

const routes: Routes = [{
  path: '',
  component: QuanlysanphamComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SanphamRoutingModule {
}
