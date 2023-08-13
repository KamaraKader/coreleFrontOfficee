import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { LoginComponent } from 'src/app/pages/public/login/login.component';
import { PublicComponent } from './public.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ForgotPasswordComponent } from '../../pages/public/forgot-password/forgot-password.component';
import { ConfirmPasswordComponent } from '../../pages/public/confirm-password/confirm-password.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { InitPasswordComponent } from '../../pages/public/init-password/init-password.component';
import {Error1Component} from "../../pages/public/error-1/error-1.component";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    LoginComponent,
    PublicComponent,
    ForgotPasswordComponent,
    ConfirmPasswordComponent,
    InitPasswordComponent,
    Error1Component
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzCheckboxModule,
    NzSpinModule,
    NzMessageModule,
    TranslateModule

  ]
})
export class PublicModule { }
