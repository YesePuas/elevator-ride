import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientCreateComponent } from './client-create/client-create.component';

@NgModule({
  declarations: [ClientCreateComponent],
  imports: [CommonModule, ClientRoutingModule],
})
export class ClientModule {}
