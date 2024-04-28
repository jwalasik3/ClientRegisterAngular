/* eslint-disable prettier/prettier */
import { FormControl } from '@angular/forms';
export interface ClientResponse {
  id: number;
  firstname: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
}
export type PostClient = Omit<ClientResponse, 'id'>;

export class Client implements ClientResponse {
  constructor(
    public id: number,
    public firstname: string,
    public surname: string,
    public email: string,
    public phone: string,
    public address: string,
    public postcode: string
  ) {}
}

export interface GetClientResponse {
  clients: Client[];
  totalCount: number;
}

export interface PostClientForm {
  firstname: FormControl<string>;
  address: FormControl<string>;
  phone: FormControl<string>;
  surname: FormControl<string>;
  postcode: FormControl<string>;
  email: FormControl<string>;
}
