import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {Enum} from '../../domain/Enum';
import {ValidatorService} from './validator.service';
import {DataStructureIdService} from './data-structure-id.service';
import {HttpClient} from '@angular/common/http';
import {Union} from '../../domain/Union';
import {Struct} from '../../domain/Struct';
import {TypeEnum} from '../../domain/TypeEnum';
import {Name} from '../../domain/Name';

@Injectable({
  providedIn: 'root'
})
export class DataStructureService {
  // get the API URL of Mocassin from environment variables
  private apiUrl = environment.mocassinApiUrl;
  // specific urls for each data structures
  private enumUrl = `${this.apiUrl}/enums`;
  private unionUrl = `${this.apiUrl}/unions`;
  private structUrl = `${this.apiUrl}/structs`;
  private nameUrl = `${this.apiUrl}/names`;
  // specific subjects for each data structures
  private enumSubject = new BehaviorSubject<Enum[]>([]);
  private unionSubject = new BehaviorSubject<Union[]>([]);
  private structSubject = new BehaviorSubject<Struct[]>([]);
  private nameSubject = new BehaviorSubject<Name[]>([]);
  private packageName = new BehaviorSubject<string>("no_package_name");

  constructor(
    private http: HttpClient,
    private utilityService: ValidatorService,
    private idService: DataStructureIdService
  ) {
    this.getAll();
  }

  private updateName = name => {
    const subjectValue = this.nameSubject.getValue()
    const index: number = subjectValue.findIndex(c => c == name)
    subjectValue.splice(index, 1)
    this.nameSubject.next(subjectValue)
  }

  private editCallback(myDataStruct: Enum | Union | Struct,
                       type: TypeEnum,
                       subject: BehaviorSubject<Enum[] | Union[] | Struct[]>
  ) {
    const subjectValue = subject.getValue()
    const index: number = subjectValue.findIndex(c => c.id == myDataStruct.id)
    switch(type) {
      case TypeEnum.ENUM:
        subjectValue.splice(index, 1, <Enum> myDataStruct);
        break;
      case TypeEnum.UNION:
        subjectValue.splice(index, 1, <Union> myDataStruct);
        break;
      case TypeEnum.STRUCT:
        subjectValue.splice(index, 1, <Struct> myDataStruct);
        break;
    }
    subject.next(subjectValue)
  }

  getAll() {
    this.http.get<Enum[]>(this.enumUrl)
      .subscribe(data => {
        this.enumSubject.next(data);
      })

    this.http.get<Union[]>(this.unionUrl)
      .subscribe(data => {
        this.unionSubject.next(data);
      })

    this.http.get<Struct[]>(this.structUrl)
      .subscribe(data => {
        this.structSubject.next(data);
      })

    this.listAllNames()
  }

  getEnums(): Observable<Enum[]> {
    return this.enumSubject.asObservable();
  }

  getUnions(): Observable<Union[]> {
    return this.unionSubject.asObservable();
  }

  getStructs(): Observable<Struct[]> {
    return this.structSubject.asObservable();
  }

  getNames(): Name[] {
    return this.nameSubject.getValue();
  }

  getUrlAndSubject(type: TypeEnum): [string, BehaviorSubject<Enum[] | Union[] | Struct[]>] {
    switch(type) {
      case TypeEnum.ENUM:
        return [this.enumUrl, this.enumSubject];
      case TypeEnum.UNION:
        return [this.unionUrl, this.unionSubject];
      case TypeEnum.STRUCT:
        return [this.structUrl, this.structSubject];
    }
  }

  generateIds(myDataStruct: Enum | Union | Struct) {
    // generate ids
    if (myDataStruct != undefined) {
      myDataStruct.id = this.idService.get();
      if (myDataStruct.attributes.length > 0) {
        myDataStruct.attributes.forEach(attr => {
          attr.id = this.idService.get();
        });
      }
    }
  }

  addDataStruct(myDataStruct: Enum | Union | Struct, type: TypeEnum) {
    let url: string;
    let subject = undefined;

    // generate ids
    this.generateIds(myDataStruct);

    // define url and subject to modify according to the type of myDataStruct
    [url, subject] = this.getUrlAndSubject(type)

    // add the data structure to the corresponding subject
    this.http.post(url, myDataStruct)
      .subscribe(() => {
        const subjectValue = subject.getValue();
        subjectValue.push(myDataStruct);
        subject.next(subjectValue);
      })
    // add the name to the list of unique names
    this.http.post<Name>(this.nameUrl, { id: myDataStruct.id, name: myDataStruct.name}).subscribe(name => {
        const subjectV = this.nameSubject.getValue()
        subjectV.push(name)
        this.nameSubject.next(subjectV)
      })
  }

  deleteDataStruct(myDataStruct: Enum | Union | Struct, type: TypeEnum) {
    let [url, subject] = this.getUrlAndSubject(type);

    this.http.delete(`${url}/${myDataStruct.id}`)
      .subscribe(() => {
        const subjectValue = subject.getValue()
        const index: number = subjectValue.findIndex(c => c.id == myDataStruct.id)
        subjectValue.splice(index, 1)
        subject.next(subjectValue)
      })
    // delete the name to the list of unique names
    this.http.delete<Name>(`${this.nameUrl}/${myDataStruct.id}`)
      .subscribe(name => { this.updateName(name) })
  }

  editDataStruct(myDataStruct: Enum | Union | Struct, type: TypeEnum) {
    let [url, subject] = this.getUrlAndSubject(type);

    this.http.put(`${url}/${myDataStruct.id}`, myDataStruct)
      .subscribe(() => { this.editCallback(myDataStruct, type, subject) })
    // edit the name to the list of unique names
    this.http.put<Name>(`${this.nameUrl}/${myDataStruct.id}`, { id: myDataStruct.id, name: myDataStruct.name})
      .subscribe(name => { this.updateName(name) })
  }

  listAllNames() {
    this.http.get<Name[]>(this.nameUrl)
      .subscribe(data => {
        this.nameSubject.next(data);
      })
  }

  editPackageName(name: string) {
    this.packageName.next(name);
  }

  newProject(): void {
    this.packageName.next("no package name");
  }

  getPackageName(): Observable<string> {
    return this.packageName.asObservable()
  }

  deleteAll() {
    this.enumSubject.getValue().forEach(v => {
      this.deleteDataStruct(v, TypeEnum.ENUM)
    })
    this.unionSubject.getValue().forEach(v => {
      this.deleteDataStruct(v, TypeEnum.UNION)
    })
    this.structSubject.getValue().forEach(v => {
      this.deleteDataStruct(v, TypeEnum.STRUCT)
    })
  }
}
