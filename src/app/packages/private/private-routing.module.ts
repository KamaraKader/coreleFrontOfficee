import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortailComponent } from '../../pages/private/portail/portail.component';
import { PrivateComponent } from './private.component';
import {TypeUserComponent} from "../../pages/private/type-user/type-user.component";
import {HabilitationsComponent} from "../../pages/private/habilitations/habilitations.component";

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    children: [
      {
        path: '',
        component: PortailComponent,
        pathMatch: 'full',

      },
      {
        path: 'type-user',
        component: TypeUserComponent,
      },
      {
        path: 'habilitations',
        component: HabilitationsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
