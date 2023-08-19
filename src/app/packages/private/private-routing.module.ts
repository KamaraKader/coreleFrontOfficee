import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortailComponent } from '../../pages/private/portail/portail.component';
import { PrivateComponent } from './private.component';
import {TypeUserComponent} from "../../pages/private/type-user/type-user.component";
import {HabilitationsComponent} from "../../pages/private/habilitations/habilitations.component";
import {ProfesseurComponent} from "../../pages/private/professeur/professeur.component";
import {ParentComponent} from "../../pages/private/parent/parent.component";
import {MatiereComponent} from "../../pages/private/matiere/matiere.component";
import {CalendrierComponent} from "../../pages/private/calendrier/calendrier.component";
import {ElevesComponent} from "../../pages/private/eleves/eleves.component";
import {ClasseComponent} from "../../pages/private/classe/classe.component";
import {AgentComponent} from "../../pages/private/agent/agent.component";

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
      },
      {
        path: 'professeur',
        component: ProfesseurComponent,
      },
      {
        path: 'parent',
        component: ParentComponent,
      },
      {
        path: 'matiere',
        component: MatiereComponent,
      },
      {
        path: 'calendrier',
        component: CalendrierComponent,
      },
      {
        path: 'eleve',
        component: ElevesComponent,
      },
      {
        path: 'classe',
        component: ClasseComponent,
      },
      {
        path: 'agent',
        component: AgentComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
