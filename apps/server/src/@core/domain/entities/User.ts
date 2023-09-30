import { OrganizationalStructure } from './OrganizationalStructure';
import { Position } from './Position';
import { Company } from './Company';
import { randomUUID } from 'node:crypto';

type UserProps = {
  firstName: string;
  lastName: string;
  password?: string;
  email: string;
  isActive: boolean;
  company: Company;
  position?: Position;
  isCompanyResponsible: boolean;
  organizationalStructure?: OrganizationalStructure;
};

export class User {
  id?: string;
  firstName: string;
  lastName: string;
  password?: string;
  email: string;
  isActive: boolean;
  isCompanyResponsible: boolean;
  company: Company;
  position?: Position;
  organizationalStructure?: OrganizationalStructure;

  constructor(props: UserProps, id?: string) {
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.password = props.password;
    this.email = props.email;
    this.isActive = props.isActive;
    this.isCompanyResponsible = props.isCompanyResponsible;
    this.company = props.company;
    this.position = props.position;
    this.organizationalStructure = props.organizationalStructure;

    if (!id) {
      this.id = randomUUID();
    }
  }
}
