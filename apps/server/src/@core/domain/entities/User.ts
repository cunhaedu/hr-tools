import { randomUUID } from 'node:crypto';

import { Position } from './Position';
import { Company } from './Company';
import { RoleEnum } from '../enums/role.enum';

type UserProps = {
  firstName: string;
  lastName: string;
  password?: string;
  email: string;
  isActive: boolean;
  company: Company;
  position?: Position;
  isCompanyRepresentative: boolean;
  role: RoleEnum;
};

export class User {
  id?: string;
  firstName: string;
  lastName: string;
  password?: string;
  email: string;
  isActive: boolean;
  isCompanyRepresentative: boolean;
  company?: Company;
  position?: Position;
  role: RoleEnum;

  constructor(props: UserProps, id?: string) {
    this.isCompanyRepresentative = props.isCompanyRepresentative;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.password = props.password;
    this.isActive = props.isActive;
    this.position = props.position;
    this.company = props.company;
    this.email = props.email;
    this.role = props.role;

    if (!id) {
      this.id = randomUUID();
    }
  }
}
