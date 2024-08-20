import { Release } from './release';

export interface Project {
  id: string;
  name: string;
  key: string;
  releases: Release[];
}
