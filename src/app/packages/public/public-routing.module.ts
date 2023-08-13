import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/pages/public/login/login.component';
import { PublicComponent } from './public.component';
import { ForgotPasswordComponent } from '../../pages/public/forgot-password/forgot-password.component';
import { ConfirmPasswordComponent } from '../../pages/public/confirm-password/confirm-password.component';
import { InitPasswordComponent } from 'src/app/pages/public/init-password/init-password.component';
import {Error1Component} from "../../pages/public/error-1/error-1.component";

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
        pathMatch: 'full',
      },
      {
        path: 'mot-de-passe-oublie',
        component: ForgotPasswordComponent,

      },
      {
        path: 'confirm-password',
        component: ConfirmPasswordComponent,

      },
      {
        path: 'init-password',
        component: InitPasswordComponent,

      },

      {
        path: 'expire',
        component: Error1Component,

      },
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
