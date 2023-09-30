import { Company } from './Company';

export class OrganizationalStructure {
  id?: string;
  title: string;
  company: Company;
  parent: OrganizationalStructure;
  children: OrganizationalStructure[];
}
