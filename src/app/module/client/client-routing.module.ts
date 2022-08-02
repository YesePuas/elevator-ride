import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientListComponent } from './client-list/client-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'form',
        component: ClientFormComponent,
      },
      {
        path: 'list',
        component: ClientListComponent,
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
