import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', 
  pathMatch: 'full', 
  redirectTo: '/'},
  {path: '', loadChildren: () => import('./packages/public/public.module').then(m => m.PublicModule)},
  {path: 'private', loadChildren: () => import('./packages/private/private.module').then(m => m.PrivateModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
