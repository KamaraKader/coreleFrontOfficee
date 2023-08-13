import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PortailComponent } from '../../pages/private/portail/portail.component';
import { PrivateComponent } from './private.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { FooterComponent } from 'src/app/pages/private/footer/footer.component';
import { HeaderComponent } from 'src/app/pages/private/header/header.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import {TranslateModule} from "@ngx-translate/core";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {FormsModule} from "@angular/forms";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {TypeUserComponent} from "../../pages/private/type-user/type-user.component";
import {HabilitationsComponent} from "../../pages/private/habilitations/habilitations.component";
import {NzTransferModule} from "ng-zorro-antd/transfer";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";

@NgModule({
    declarations: [
        PortailComponent,
        PrivateComponent,
        FooterComponent,
        HeaderComponent,
        TypeUserComponent,
        HabilitationsComponent
    ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    NzAvatarModule,
    NzDropDownModule,
    NzMessageModule,
    NzSpinModule,
    NzAlertModule,
    TranslateModule,
    NzIconModule,
    NzCardModule,
    NzSwitchModule,
    FormsModule,
    NzBreadCrumbModule,
    NzToolTipModule,
    NzButtonModule,
    NzTableModule,
    NzPopconfirmModule,
    NzTransferModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule

  ]
})
export class PrivateModule { }
