import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Enum} from '../domain/Enum';
import {ValidatorService} from './validator.service';
import {DataStructureIdService} from './data-structure-id.service';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Union} from '../domain/Union';
import {Struct} from '../domain/Struct';
import {TypeEnum} from '../domain/TypeEnum';

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
  // specific subjects for each data structures
  private enumSubject = new BehaviorSubject<Enum[]>([]);
  private unionSubject = new BehaviorSubject<Union[]>([]);
  private structSubject = new BehaviorSubject<Struct[]>([]);

  constructor(
    private http: HttpClient,
    private utilityService: ValidatorService,
    private idService: DataStructureIdService
  ) {
    this.getAll();
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
  }

  getEnums(): Observable<Enum[]> {
    return this.enumSubject.asObservable();
  }

  getUnions(): Observable<Union[]> {
    return this.unionSubject.asObservable();
  }

  getStructs(): Observable<Union[]> {
    return this.structSubject.asObservable();
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

  addDataStruct(myDataStruct: Enum | Union | Struct, type: TypeEnum) {
    let url: string;
    let subject = undefined;

    // generate ids
    if (myDataStruct != undefined) {
      myDataStruct.id = this.idService.get();
      if (myDataStruct.attributes.length > 0) {
        myDataStruct.attributes.forEach(attr => {
          attr.id = this.idService.get();
        });
      }
    }

    // define url and subject to modify according to the type of myDataStruct
    [url, subject] = this.getUrlAndSubject(type)

    // add the data structure to the corresponding subject
    this.http.post(url, myDataStruct)
      .subscribe(() => {
        const subjectValue = subject.getValue();
        subjectValue.push(myDataStruct);
        subject.next(subjectValue);
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
  }

  editDataStruct<T>(myDataStruct: Enum | Union | Struct, type: TypeEnum) {
    let [url, subject] = this.getUrlAndSubject(type);

    this.http.put(`${url}/${myDataStruct.id}`, myDataStruct)
      .subscribe(() => {
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
      })
  }

  searchDataStructByName<T>(term: string, type: TypeEnum): Observable<T[]> {
    let url = this.getUrlAndSubject(type);

    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<T[]>(`${url}/?name=${term}`).pipe(
      tap(x => x.length ?
        console.log(`found matching "${term}"`) :
        console.log(`no matching "${term}"`)),
      catchError(this.utilityService.handleError<T[]>('searchDataStructByName', []))
    );
  }

  listAllNames(): string[] {
    return this.enumSubject.getValue().map(v => v.name)
      .concat(this.unionSubject.getValue().map(v => v.name))
      .concat(this.structSubject.getValue().map(v => v.name))
  }

  isUnique(name: string): boolean {
    return this.listAllNames().indexOf(name) === -1
  }
}
