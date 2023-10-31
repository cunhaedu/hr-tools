import { randomUUID } from 'node:crypto';
import { User } from './User';

type CompanyProps = {
  name: string;
  cnpj: string;
  email: string;
  cep: string;
  streetNumber: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  phoneNumber: string;
  isVerified: boolean;
  users: User[];
};

export class Company {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  cep: string;
  streetNumber: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  phoneNumber: string;
  isVerified: boolean;
  users?: User[];

  constructor(props: CompanyProps, id?: string) {
    this.cep = props.cep;
    this.name = props.name;
    this.cnpj = props.cnpj;
    this.email = props.email;
    this.city = props.city;
    this.state = props.state;
    this.street = props.street;
    this.neighborhood = props.neighborhood;
    this.streetNumber = props.streetNumber;
    this.phoneNumber = props.phoneNumber;
    this.isVerified = props.isVerified;
    this.users = props.users;

    if (!id) {
      this.id = randomUUID();
    }
  }
}
