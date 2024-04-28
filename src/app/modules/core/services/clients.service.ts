import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  Client,
  ClientResponse,
  GetClientResponse,
  PostClient,
} from '../models/client.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getClients(
    pageIndex: number,
    itemsPerPage: number,
    sortDirection: string,
    sortColumnName: string,
    value = ''
  ): Observable<GetClientResponse> {
    let params = new HttpParams()
      .append('_page', pageIndex)
      .append('_limit', itemsPerPage);
    if (sortColumnName) {
      params = params
        .append('_sort', sortColumnName)
        .append('_order', sortDirection);
    }
    if (value) {
      params = params.append('firstname_like', value);
    }

    return this.http
      .get<ClientResponse[]>(`${this.apiUrl}/clients`, {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          if (!response.body) return { clients: [], totalCount: 0 };

          const clientsArr: Client[] = response.body.map(
            ({ id, firstname, surname, email, phone, address, postcode }) =>
              new Client(
                id,
                firstname,
                surname,
                email,
                phone,
                address,
                postcode
              )
          );
          const totalCount = Number(response.headers.get('X-Total-Count'));
          return { clients: clientsArr, totalCount };
        })
      );
  }

  getClient(id: number): Observable<Client> {
    return this.http
      .get<ClientResponse>(`${this.apiUrl}/clients/${id}`)
      .pipe(
        map(
          ({ id, firstname, surname, email, phone, address, postcode }) =>
            new Client(id, firstname, surname, email, phone, address, postcode)
        )
      );
  }

  postClient(clientData: PostClient): Observable<Client> {
    return this.http
      .post<ClientResponse>(`${this.apiUrl}/clients`, clientData)
      .pipe(
        map(
          ({ id, firstname, surname, email, phone, address, postcode }) =>
            new Client(id, firstname, surname, email, phone, address, postcode)
        )
      );
  }

  deleteClient(id: number): Observable<Record<string, never>> {
    return this.http.delete<Record<string, never>>(
      `${this.apiUrl}/clients/${id}`
    );
  }

  putClient(clientData: PostClient, id: number): Observable<Client> {
    return this.http
      .put<ClientResponse>(`${this.apiUrl}/clients/${id}`, clientData)
      .pipe(
        map(
          ({ id, firstname, surname, email, phone, address, postcode }) =>
            new Client(id, firstname, surname, email, phone, address, postcode)
        )
      );
  }
}
