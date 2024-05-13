export enum UserStatus {
  Active,
  Pending,
}

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

export interface User {
  id: number;
  name: string;
  email: string;
  status: UserStatus;
  role: UserRole;
  lastLoginAt: number;
  createdAt: string;
  updatedAt: string;
  invitationCode: number;
}
