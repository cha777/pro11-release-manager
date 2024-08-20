export interface User {
  id: string;
  email?: string;
  name?: string;
  avatarUrl?: string;

  [key: string]: unknown;
}
