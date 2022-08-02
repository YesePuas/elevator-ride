import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientListComponent } from './client-list/client-list.component';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbTreeGridModule,
} from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ClientFormComponent, ClientListComponent],
  imports: [
    CommonModule,
    NbTreeGridModule,
    ClientRoutingModule,
    NbCardModule,
    NbSelectModule,
    NbActionsModule,
    NbIconModule,
    NbFormFieldModule,
    NbButtonModule,
    NbInputModule,
    ReactiveFormsModule,
  ],
})
export class ClientModule {}
