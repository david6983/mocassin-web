import { TestBed } from '@angular/core/testing';

import { ValidatorService } from './validator.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../environments/environment';

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

  it('#isNameSyntaxFollowCStandard should verify that a word follow the C syntax', () => {
    expect(service.isNameSyntaxFollowCStandard('foo')).toBe(true);
    expect(service.isNameSyntaxFollowCStandard('FOO')).toBe(true);
    expect(service.isNameSyntaxFollowCStandard('bars93')).toBe(true);
    expect(service.isNameSyntaxFollowCStandard('fo_ee99')).toBe(true);
    expect(service.isNameSyntaxFollowCStandard('foo-ee')).toBe(false);
    expect(service.isNameSyntaxFollowCStandard('ff ff')).toBe(false);
    expect(service.isNameSyntaxFollowCStandard('@e ee-éè')).toBe(false);
  });

  it('#isReservedWord should verify if the given name is reserved by the C language', () => {
    reservedWords.forEach((word) => {
      service.isReservedWord(word).subscribe(value => {
        expect(value).toBe(true);
      });
    });
  });
});
