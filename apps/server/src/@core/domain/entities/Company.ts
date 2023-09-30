import { randomUUID } from 'node:crypto';

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

    if (!id) {
      this.id = randomUUID();
    }
  }
}
