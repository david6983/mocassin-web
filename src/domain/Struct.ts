import {StructAttribute} from './StructAttribute';
import {DataStructure} from './DataStructure';

export interface Struct extends DataStructure<StructAttribute>{
  isDisplayFunctionGenerated: boolean;
}
