import {StructAttribute} from './StructAttribute';

export interface Struct {
  id: number;
  name: string;
  isDisplayFunctionGenerated: boolean;
  attributes: StructAttribute[];
}
