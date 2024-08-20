export interface Release {
  id: string;
  name: string;
  released: boolean;

  [key: string]: unknown;
}
