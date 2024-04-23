import { NgModule } from '@angular/core';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { SharedModule } from '../shared/shared.module';
import { ClientsTableComponent } from './components/clients-table/clients-table.component';
import { ClientComponent } from './components/client/client.component';

@NgModule({
  declarations: [ClientsComponent, ClientsTableComponent, ClientComponent],
  imports: [SharedModule, ClientsRoutingModule],
  exports: [ClientsComponent],
})
export class ClientsModule {}
