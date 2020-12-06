import {TestBed} from '@angular/core/testing';

import {DataStructureService} from './data-structure.service';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {environment} from '../environments/environment';
import {TypeEnum} from '../domain/TypeEnum';
import {Enum} from '../domain/Enum';
import {Union} from '../domain/Union';
import {Struct} from '../domain/Struct';

describe('DataStructureService', () => {
  let httpMock: HttpTestingController;
  let service: DataStructureService;
  let enumUrl = `${environment.mocassinApiUrl}/enums`;
  let unionUrl = `${environment.mocassinApiUrl}/unions`;
  let structUrl = `${environment.mocassinApiUrl}/structs`;
  let nameUrl = `${environment.mocassinApiUrl}/names`;
  const v4regex = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(DataStructureService);
  });

  function verifyGetAll(): [TestRequest[], TestRequest[], TestRequest[], TestRequest[]] {
    // expect the service to fetch all the data on the server
    const req1 = httpMock.match(enumUrl);
    expect(req1[0].request.method).toBe('GET');

    const req2 = httpMock.match(unionUrl);
    expect(req2[0].request.method).toBe('GET');

    const req3 = httpMock.match(structUrl);
    expect(req3[0].request.method).toBe('GET');

    const nameReq = httpMock.match(nameUrl)
    expect(nameReq[0].request.method).toBe('GET');

    return [req1, req2, req3, nameReq]
  }

  function getMockEnum(): Enum {
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

  function getMockUnion(): Union {
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

  function getMockStruct(): Struct {
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
    const e1: Enum = getMockEnum();
    service.generateIds(e1)
    expect(e1.id).toBeDefined()
    expect(e1.attributes[0].id).toBeDefined()
    expect(e1.attributes[1].id).toBeDefined()
  })

  it('#addDataStruct should add an enum',() => {
    // mock enum to POST
    const newEnum: Enum = getMockEnum();
    service.addDataStruct(newEnum, TypeEnum.ENUM)

    // expect the service to fetch all the data on the server
    let [enumReq,,,nameReq] = verifyGetAll();

    // expect the service to POST the newEnum
    expect(enumReq[1].request.method).toBe('POST');
    enumReq[1].flush(newEnum)

    // expect the service to POST the name
    expect(nameReq[1].request.method).toBe('POST');

    // verify the BehaviorSubject is updated
    service.getEnums().subscribe(verifyPostData)

    httpMock.verify();
  })

  it('#addDataStruct should add an union',() => {
    // mock union to POST
    const newUnion: Union = getMockUnion();
    service.addDataStruct(newUnion, TypeEnum.UNION)

    // expect the service to fetch all the data on the server
    let [, unionReq,, nameReq] = verifyGetAll();

    // expect the service to POST the newEnum
    expect(unionReq[1].request.method).toBe('POST');
    unionReq[1].flush(newUnion)

    // expect the service to POST the name
    expect(nameReq[1].request.method).toBe('POST');

    // verify the BehaviorSubject is updated
    service.getUnions().subscribe(verifyPostData)

    httpMock.verify();
  })

  it('#addDataStruct should add a struct',() => {
    // mock enum to POST
    const newStruct: Struct = getMockStruct();
    service.addDataStruct(newStruct, TypeEnum.STRUCT)

    // expect the service to fetch all the data on the server
    let [,,structReq, nameReq] = verifyGetAll();

    // expect the service to POST the newEnum
    expect(structReq[1].request.method).toBe('POST');
    structReq[1].flush(newStruct)

    // expect the service to POST the name
    expect(nameReq[1].request.method).toBe('POST');

    // verify the BehaviorSubject is updated
    service.getStructs().subscribe(verifyPostData)

    httpMock.verify();
  })

  it('#deleteDataStruct should delete an enum', () => {
    const e1: Enum = getMockEnum();
    service.addDataStruct(e1, TypeEnum.ENUM);

    // expect the service to fetch all the data on the server
    let [enumReq,,,nameReq] = verifyGetAll();

    // expect the service to POST the newEnum
    expect(enumReq[1].request.method).toBe('POST');
    enumReq[1].flush(e1)

    service.deleteDataStruct(e1, TypeEnum.ENUM);
    const req = httpMock.expectOne(enumUrl + '/' + e1.id)
    expect(req.request.method).toBe('DELETE');
    req.flush(0);

    // expect the service to DELETE the name after POST
    expect(nameReq[1].request.method).toBe('POST');
    const nameReq2 = httpMock.expectOne(nameUrl + '?name=' + e1.name)
    expect(nameReq2.request.method).toBe('DELETE');

    service.getEnums().subscribe(data => {
      expect(data.length).toBe(0)
    })

    httpMock.verify();
  });

  it('#deleteDataStruct should delete an union', () => {
    const u1: Union = getMockUnion();
    service.addDataStruct(u1, TypeEnum.UNION);

    // expect the service to fetch all the data on the server
    let [, unionReq,, nameReq] = verifyGetAll();

    // expect the service to POST the newEnum
    expect(unionReq[1].request.method).toBe('POST');
    unionReq[1].flush(u1)

    service.deleteDataStruct(u1, TypeEnum.UNION);
    const req = httpMock.expectOne(unionUrl + '/' + u1.id)
    expect(req.request.method).toBe('DELETE');
    req.flush(0);

    // expect the service to DELETE the name after POST
    expect(nameReq[1].request.method).toBe('POST');
    const nameReq2 = httpMock.expectOne(nameUrl + '?name=' + u1.name)
    expect(nameReq2.request.method).toBe('DELETE');

    service.getUnions().subscribe(data => {
      expect(data.length).toBe(0)
    })

    httpMock.verify();
  });

  it('#deleteDataStruct should delete a struct', () => {
    const s1: Struct = getMockStruct();
    service.addDataStruct(s1, TypeEnum.STRUCT);

    // expect the service to fetch all the data on the server
    let [,,structReq, nameReq] = verifyGetAll();

    // expect the service to POST the newEnum
    expect(structReq[1].request.method).toBe('POST');
    structReq[1].flush(s1)

    service.deleteDataStruct(s1, TypeEnum.STRUCT);
    const req = httpMock.expectOne(structUrl + '/' + s1.id)
    expect(req.request.method).toBe('DELETE');
    req.flush(0);

    // expect the service to DELETE the name after POST
    expect(nameReq[1].request.method).toBe('POST');
    const nameReq2 = httpMock.expectOne(nameUrl + '?name=' + s1.name)
    expect(nameReq2.request.method).toBe('DELETE');

    service.getStructs().subscribe(data => {
      expect(data.length).toBe(0)
    })

    httpMock.verify();
  });

  it('#editDataStruct should edit an enum', () => {
    const e1: Enum = getMockEnum();
    service.addDataStruct(e1, TypeEnum.ENUM);

    // expect the service to fetch all the data on the server
    let [enumReq,,,nameReq] = verifyGetAll();

    // expect the service to POST the newEnum
    expect(enumReq[1].request.method).toBe('POST');
    enumReq[1].flush(e1)

    e1.name = "position2";
    service.editDataStruct(e1, TypeEnum.ENUM);
    const req = httpMock.expectOne(enumUrl + '/' + e1.id)
    expect(req.request.method).toBe('PUT');
    req.flush(0);

    // expect the service to DELETE the name after POST
    expect(nameReq[1].request.method).toBe('POST');
    const nameReq2 = httpMock.expectOne(nameUrl + '?name=' + e1.name)
    expect(nameReq2.request.method).toBe('PUT');

    service.getEnums().subscribe(data => {
      expect(data[0].name).toBe("position2");
    })

    httpMock.verify();
  });

  it('#editDataStruct should edit an union', () => {
    const u1: Union = getMockUnion();
    service.addDataStruct(u1, TypeEnum.UNION);

    // expect the service to fetch all the data on the server
    let [,unionReq,,nameReq] = verifyGetAll();

    // expect the service to POST the newEnum
    expect(unionReq[1].request.method).toBe('POST');
    unionReq[1].flush(u1)

    u1.name = "position2";
    service.editDataStruct(u1, TypeEnum.UNION);
    const req = httpMock.expectOne(unionUrl + '/' + u1.id)
    expect(req.request.method).toBe('PUT');
    req.flush(0);

    // expect the service to DELETE the name after POST
    expect(nameReq[1].request.method).toBe('POST');
    const nameReq2 = httpMock.expectOne(nameUrl + '?name=' + u1.name)
    expect(nameReq2.request.method).toBe('PUT');

    service.getUnions().subscribe(data => {
      expect(data[0].name).toBe("position2");
    })

    httpMock.verify();
  });

  it('#editDataStruct should edit a struct', () => {
    const s1: Struct = getMockStruct();
    service.addDataStruct(s1, TypeEnum.STRUCT);

    // expect the service to fetch all the data on the server
    let [,,structReq,nameReq] = verifyGetAll();

    // expect the service to POST the newEnum
    expect(structReq[1].request.method).toBe('POST');
    structReq[1].flush(s1)

    s1.name = "position2";
    service.editDataStruct(s1, TypeEnum.STRUCT);
    const req = httpMock.expectOne(structUrl + '/' + s1.id)
    expect(req.request.method).toBe('PUT');
    req.flush(0);

    // expect the service to DELETE the name after POST
    expect(nameReq[1].request.method).toBe('POST');
    const nameReq2 = httpMock.expectOne(nameUrl + '?name=' + s1.name)
    expect(nameReq2.request.method).toBe('PUT');

    service.getStructs().subscribe(data => {
      expect(data[0].name).toBe("position2");
    })

    httpMock.verify();
  });
});
