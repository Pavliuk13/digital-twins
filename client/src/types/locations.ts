import { User } from '@@types/user';
import { Organization } from '@@types/organization';

export interface LocationArgs {
  id: number;
  name: string;
  address: string;
  zip: string;
  state: string;
  city: string;
  country: string;
  organizationId: Organization['id'];
  userId: User['id'];
}

export interface Location {
  id: number;
  name: string;
  address: string;
  zip: string;
  state: string;
  city: string;
  country: string;
  organizationId: Organization['id'];
  createdAt: string;
  updatedAt: string;
  createdBy: User['id'];
  usersIds: User['id'][];
  owner: User;
}
