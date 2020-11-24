import {EnumAttribute} from './EnumAttribute';

export interface Enum {
  id: number;
  name: string;
  attributes: EnumAttribute[];
}
