import {TestBed, waitForAsync} from '@angular/core/testing';

import {DataStructureService} from './data-structure.service';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {environment} from '../environments/environment';
import {TypeEnum} from '../domain/TypeEnum';
import {Enum} from '../domain/Enum';
import {HttpResponse} from '@angular/common/http';
import {Union} from '../domain/Union';
import {Struct} from '../domain/Struct';

describe('DataStructureService', () => {
  let httpMock: HttpTestingController;
  let service: DataStructureService;
  let enumUrl = `${environment.mocassinApiUrl}/enums`;
  let unionUrl = `${environment.mocassinApiUrl}/unions`;
  let structUrl = `${environment.mocassinApiUrl}/structs`
  const v4regex = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(DataStructureService);
  });

  function verifyGetAll(): [TestRequest[], TestRequest[], TestRequest[]] {
    // expect the service to fetch all the data on the server
    const req1 = httpMock.match(enumUrl);
    expect(req1[0].request.method).toBe('GET');

    const req2 = httpMock.match(unionUrl);
    expect(req2[0].request.method).toBe('GET');

    const req3 = httpMock.match(structUrl);
    expect(req3[0].request.method).toBe('GET');

    return [req1, req2, req3]
  }

  const verifyPostData = data => {
    expect(data.length).toBe(1);
    // verify the ids has been generated
    expect(data[0].id).toBeDefined();
    expect(v4regex.test(data[0].id)).toBeTrue()
    expect(data[0].attributes.length).toBe(2)
    expect(data[0].attributes[0]).toBeDefined()
    expect(v4regex.test(data[0].attributes[0].id)).toBeTrue()
    expect(data[0].attributes[1]).toBeDefined()
    expect(v4regex.test(data[0].attributes[1].id)).toBeTrue()
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getAll should get all data',() => {
    service.getAll();
    verifyGetAll();
    httpMock.verify();
  })

  it('#getUrlAndSubject should return the right url and subject according to the type given', () => {
    expect(service.getUrlAndSubject(TypeEnum.ENUM)[0]).toBe(enumUrl)
    expect(service.getUrlAndSubject(TypeEnum.ENUM)[1]).toBeDefined()

    expect(service.getUrlAndSubject(TypeEnum.UNION)[0]).toBe(unionUrl)
    !expect(service.getUrlAndSubject(TypeEnum.UNION)[1]).toBeDefined()

    expect(service.getUrlAndSubject(TypeEnum.STRUCT)[0]).toBe(structUrl)
    !expect(service.getUrlAndSubject(TypeEnum.STRUCT)[1]).toBeDefined()
  })

  it('#generateIds should generate ids for the given data structure', () => {
    const e1: Enum = {
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
    service.generateIds(e1)
    expect(e1.id).toBeDefined()
    expect(e1.attributes[0].id).toBeDefined()
    expect(e1.attributes[1].id).toBeDefined()
  })

  it('#addDataStruct should add an enum',() => {
    // mock enum to POST
    const newEnum: Enum = {
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
    service.addDataStruct(newEnum, TypeEnum.ENUM)

    // expect the service to fetch all the data on the server
    let [enumReq] = verifyGetAll();

    // expect the service to POST the newEnum
    expect(enumReq[1].request.method).toBe('POST');
    enumReq[1].flush(newEnum)

    // verify the BehaviorSubject is updated
    service.getEnums().subscribe(verifyPostData)

    httpMock.verify();
  })

  it('#addDataStruct should add an union',() => {
    // mock union to POST
    const newUnion: Union = {
      id: undefined,
      name: "position",
      attributes: [{
        id: undefined,
        name: "notPrecise",
        type: "int",
        isComparable: false,
        isPointer: true,
      }, {
        id: undefined,
        name: "precise",
        type: "float",
        isComparable: false,
        isPointer: true,
      }]
    };
    service.addDataStruct(newUnion, TypeEnum.UNION)

    // expect the service to fetch all the data on the server
    let [, unionReq] = verifyGetAll();

    // expect the service to POST the newEnum
    expect(unionReq[1].request.method).toBe('POST');
    unionReq[1].flush(newUnion)

    // verify the BehaviorSubject is updated
    service.getUnions().subscribe(verifyPostData)

    httpMock.verify();
  })

  it('#addDataStruct should add a struct',() => {
    // mock enum to POST
    const newStruct: Struct = {
      id: "",
      name: "position",
      isDisplayFunctionGenerated: false,
      attributes: [{
        id: undefined,
        name: "notPrecise",
        type: "int",
        isComparable: false,
        isPointer: true,
      }, {
        id: undefined,
        name: "precise",
        type: "float",
        isComparable: false,
        isPointer: true,
      }]
    };
    service.addDataStruct(newStruct, TypeEnum.STRUCT)

    // expect the service to fetch all the data on the server
    let [,,structReq] = verifyGetAll();

    // expect the service to POST the newEnum
    expect(structReq[1].request.method).toBe('POST');
    structReq[1].flush(newStruct)

    // verify the BehaviorSubject is updated
    service.getStructs().subscribe(verifyPostData)

    httpMock.verify();
  })
});
