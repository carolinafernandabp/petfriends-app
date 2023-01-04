export interface Roles {
  usuario?: boolean;
  petlover?: boolean;
  admin?: boolean;
}

export interface User {
  uid: string;
  email: string;
  roles: Roles;
}
