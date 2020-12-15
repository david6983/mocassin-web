import {TestBed} from '@angular/core/testing';

import {ValidatorService} from './validator.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../environments/environment';
import {Name} from '../../domain/Name';
import {getMockEnum, getMockStruct, getMockUnion} from './mock';
import {TypeEnum} from '../../domain/TypeEnum';

describe('UtilityServiceService', () => {
  let httpMock: HttpTestingController;
  let service: ValidatorService;
  const reservedWords = [
    'auto',
    'break',
    'case',
    'char',
    'const',
    'continue',
    'default',
    'do',
    'int',
    'long',
    'register',
    'return',
    'short',
    'signed',
    'sizeof',
    'static',
    'struct',
    'switch',
    'typedef',
    'union',
    'unsigned',
    'void',
    'volatile',
    'while',
    'double',
    'else',
    'enum',
    'extern',
    'float',
    'for',
    'goto',
    'if'
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ValidatorService);
  });

  afterEach(() => {
    httpMock.verify(); // make sure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getReservedCWordsList should return an observable list of reserved C words', () => {
    service.getReservedCWordsList().subscribe(words => {
      expect(words.length).toBe(32);
    });

    const req = httpMock.expectOne(`${environment.mocassinApiUrl}/reservedCWords`);
    expect(req.request.method).toBe('GET');
    req.flush(reservedWords);
  });

  it('#isReservedWord should verify if the given name is reserved by the C language', () => {
    expect(service.isReservedWord("auto", reservedWords)).toBeTrue();
    expect(service.isReservedWord("Position", reservedWords)).toBeFalse();
  });

  it('#isReservedName should verify if the given name already exist', () => {
    const names: Name[] = [
      {
        id: "1",
        name: "foo"
      },
      {
        id: "2",
        name: "bar"
      }
    ];
    expect(service.isReservedName({id: "0", name: "foo"}, names)).toBeTrue()
    expect(service.isReservedName({id: "1", name: "foo"}, names)).toBeFalse()
  });

  it('#getCTypesList should return an observable list of the C types', () => {
    service.getCTypesList().subscribe(types => {
      expect(types.length).toBe(32);
    })

    const req = httpMock.expectOne(`${environment.mocassinApiUrl}/cTypes`);
    expect(req.request.method).toBe('GET');
    req.flush(reservedWords);
  });

  it('#getTypesList should return an observable list of the C types as string', () => {
    service.getTypesList().subscribe(types => {
      expect(types.length).toBe(32);
    })

    const req = httpMock.expectOne(`${environment.mocassinApiUrl}/cTypes`);
    expect(req.request.method).toBe('GET');
    req.flush(reservedWords);
  });

  it('#isNameUnique should return not unique project', () => {
    expect(service.isNameUnique("WEST", getMockEnum(), TypeEnum.ENUM)).toBeTrue();
    expect(service.isNameUnique("NORTH", getMockEnum(), TypeEnum.ENUM)).toBeFalse();

    expect(service.isNameUnique("NotPrecise", getMockUnion(), TypeEnum.UNION)).toBeTrue();
    expect(service.isNameUnique("notPrecise", getMockUnion(), TypeEnum.UNION)).toBeFalse();

    expect(service.isNameUnique("Precise", getMockStruct(), TypeEnum.STRUCT)).toBeTrue();
    expect(service.isNameUnique("precise", getMockStruct(), TypeEnum.STRUCT)).toBeFalse();

    expect(service.isNameUnique("", undefined, undefined)).toBeFalse();
  });

  it('#isAttributeNameUnique should return not unique project', () => {
    expect(service.isAttributeNameUnique("WEST", getMockEnum(), TypeEnum.ENUM)).toBeTrue();
    expect(service.isAttributeNameUnique("NORTH", getMockEnum(), TypeEnum.ENUM)).toBeFalse();
    expect(service.isAttributeNameUnique("position", getMockEnum(), TypeEnum.ENUM)).toBeFalse();

    expect(service.isAttributeNameUnique("NotPrecise", getMockUnion(), TypeEnum.UNION)).toBeTrue();
    expect(service.isAttributeNameUnique("notPrecise", getMockUnion(), TypeEnum.UNION)).toBeFalse();
    expect(service.isAttributeNameUnique("position", getMockUnion(), TypeEnum.UNION)).toBeFalse();

    expect(service.isAttributeNameUnique("Precise", getMockStruct(), TypeEnum.STRUCT)).toBeTrue();
    expect(service.isAttributeNameUnique("precise", getMockStruct(), TypeEnum.STRUCT)).toBeFalse();
    expect(service.isAttributeNameUnique("position", getMockStruct(), TypeEnum.STRUCT)).toBeFalse();

    expect(service.isAttributeNameUnique("", undefined, undefined)).toBeFalse();
  });
});
