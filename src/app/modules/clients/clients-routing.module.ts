import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { ClientComponent } from './components/client/client.component';

const routes: Routes = [
  { path: 'clients', component: ClientsComponent },
  { path: 'clients/:id', component: ClientComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
