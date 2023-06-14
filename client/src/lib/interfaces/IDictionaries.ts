import { IDictionary } from './IDictionary';

export interface IDictionaries {
  [key: string]: () => Promise<IDictionary>;
}
