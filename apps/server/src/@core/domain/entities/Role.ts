import { Permission } from './Permission';

export class Role {
  id: string;
  name: string;
  permissions: Permission[];
}
