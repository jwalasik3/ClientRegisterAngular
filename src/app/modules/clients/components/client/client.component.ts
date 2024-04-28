import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Client } from 'src/app/modules/core/models/client.model';
import { ClientsService } from 'src/app/modules/core/services/clients.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  client!: Client;
  constructor(
    private clientsService: ClientsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => this.clientsService.getClient(+params['id'])) // smart way to cast into number type e.g. string = "Hello", number = +string
      )
      .subscribe({
        next: (client) => {
          this.client = client;
        },
      });
  }
}
