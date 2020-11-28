import {TestBed} from '@angular/core/testing';

import {DataStructureService} from './data-structure.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../environments/environment';
import {TypeEnum} from '../domain/TypeEnum';

describe('DataStructureServiceService', () => {
  let httpMock: HttpTestingController;
  let service: DataStructureService;
  let enumUrl = `${environment.mocassinApiUrl}/enums`;
  let unionUrl = `${environment.mocassinApiUrl}/unions`;
  let structUrl = `${environment.mocassinApiUrl}/structs`

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(DataStructureService);
  });

  afterEach(() => {
    // should get enums, unions, structs from server in constructor
    let req = httpMock.expectOne(enumUrl);
    expect(req.request.method).toBe('GET');

    req = httpMock.expectOne(unionUrl);
    expect(req.request.method).toBe('GET');

    req = httpMock.expectOne(structUrl);
    expect(req.request.method).toBe('GET');

    httpMock.verify(); // make sure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getUrlAndSubject should return the right url and subject according to the type given', () => {
    expect(service.getUrlAndSubject(TypeEnum.ENUM)[0]).toBe(enumUrl)
    !expect(service.getUrlAndSubject(TypeEnum.ENUM)[1]).toBeUndefined()

    expect(service.getUrlAndSubject(TypeEnum.UNION)[0]).toBe(unionUrl)
    !expect(service.getUrlAndSubject(TypeEnum.UNION)[1]).toBeUndefined()

    expect(service.getUrlAndSubject(TypeEnum.STRUCT)[0]).toBe(structUrl)
    !expect(service.getUrlAndSubject(TypeEnum.STRUCT)[1]).toBeUndefined()
  })

});
