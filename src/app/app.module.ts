import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {FormBuilder, FormsModule} from '@angular/forms';
import {Page404Component} from './authen/page404/page404.component';
import {Page500Component} from './authen/page500/page500.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgxSpinnerModule} from 'ngx-spinner';
import {PageLoaderComponent} from './core/page-loader/page-loader.component';
import {HeaderComponent} from './layout/header/header.component';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {RightSidebarComponent} from './layout/right-sidebar/right-sidebar.component';
import {MainLayoutComponent} from './layout/app-layout/main-layout/main-layout.component';
import {AuthLayoutComponent} from './layout/app-layout/auth-layout/auth-layout.component';
import {AccountComponent} from './entity/account/account/account.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {AuthService} from './service/auth.service';
import {InterceptorInterceptor} from './core/interceptor/interceptor.interceptor';
import {NgbDropdownMenu, NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MomentModule} from 'ngx-moment';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ConfirmModalComponent } from './core/component/confirm-modal/confirm-modal.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

registerLocaleData(en);
// import {ModalModule} from 'ngb-modal';
// import {MatButtonModule} from '@angular/material/button';
// import {MatButtonModule} from '@angular/material/button';
// import { NzPopoverModule } from 'ng-zorro-antd/popover';
import {MatIconModule} from '@angular/material/icon';
import {NzPipesModule} from 'ng-zorro-antd/pipes';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    Page404Component,
    Page500Component,
    PageLoaderComponent,
    HeaderComponent,
    SidebarComponent,
    RightSidebarComponent,
    AccountComponent,
    ConfirmModalComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgxSpinnerModule,
        HttpClientModule,
        ToastrModule.forRoot({
            timeOut: 10000,
            positionClass: 'toast-top-right',
            preventDuplicates: false,
        }),
        FormsModule,
        NgxWebstorageModule.forRoot(),
        NgbModule,
        MomentModule,
        MatProgressBarModule,
        IconsProviderModule,
        NzLayoutModule,
        NzMenuModule,
        // NzPaginationModule
        // NzPopoverModule
        //
        MatIconModule,
        NzPipesModule,
        NzPaginationModule,


    ],
  providers: [AuthService, {provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true}, FormBuilder, { provide: NZ_I18N, useValue: en_US }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
