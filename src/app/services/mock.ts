import {Enum} from '../../domain/Enum';
import {Union} from '../../domain/Union';
import {Struct} from '../../domain/Struct';

export function getMockEnum(): Enum {
  return {
    id: undefined,
    name: "position",
    attributes: [{
      id: undefined,
      name: "NORTH",
      value: 0
    }, {
      id: undefined,
      name: "SOUTH",
      value: 1
    }]
  };
}

export function getMockUnion(): Union {
  return {
    id: undefined,
    name: "position",
    attributes: [{
      id: undefined,
      name: "notPrecise",
      type: "int",
      isPointer: true,
    }, {
      id: undefined,
      name: "precise",
      type: "float",
      isPointer: true,
    }]
  };
}

export function getMockStruct(): Struct {
  return {
    id: "",
    name: "position",
    isDisplayFunctionGenerated: false,
    attributes: [{
      id: undefined,
      name: "notPrecise",
      type: "int",
      isPointer: true,
    }, {
      id: undefined,
      name: "precise",
      type: "float",
      isPointer: true,
    }]
  };
}
