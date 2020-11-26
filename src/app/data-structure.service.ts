import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Enum} from '../domain/Enum';
import {ValidatorService} from './validator.service';
import {DataStructureIdService} from './data-structure-id.service';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Union} from '../domain/Union';
import {Struct} from '../domain/Struct';
import {DataStructure} from '../domain/DataStructure';
import {EnumAttribute} from '../domain/EnumAttribute';
import {UnionAttribute} from '../domain/UnionAttribute';
import {StructAttribute} from '../domain/StructAttribute';

@Injectable({
  providedIn: 'root'
})
export class DataStructureService {
  // get the API URL of Mocassin from environment variables
  private apiUrl = environment.mocassinApiUrl;
  private enumUrl = `${this.apiUrl}/enums`;
  private unionUrl = `${this.apiUrl}/union`;
  private structUrl = `${this.apiUrl}/structs`;
  private enumSubject = new BehaviorSubject<Enum[]>([]);
  private unionSubject = new BehaviorSubject<Union[]>([]);
  private structSubject = new BehaviorSubject<Struct[]>([]);

  constructor(
    private http: HttpClient,
    private utilityService: ValidatorService,
    private idService: DataStructureIdService
  ) {
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

  isEnum(myDataStruct: Enum | Union | Struct): myDataStruct is Enum {
    return (myDataStruct as Enum).name !== undefined;
  }

  isUnion(myDataStruct: Enum | Union | Struct): myDataStruct is Union {
    return (myDataStruct as Union).name !== undefined;
  }

  isStruct(myDataStruct: Enum | Union | Struct): myDataStruct is Struct {
    return (myDataStruct as Struct).name !== undefined;
  }

  addEnum(myDataStruct: Enum | Union | Struct) {
    // generate ids
    if (myDataStruct != undefined) {
      myDataStruct.id = this.idService.get();
      if (myDataStruct.attributes.length > 0) {
        myDataStruct.attributes.forEach(attr => {
          attr.id = this.idService.get();
        });
      }
      console.log(myDataStruct);
    }

    //TODO refactor
    if (this.isEnum(myDataStruct)) {
      this.http.post(this.enumUrl, myDataStruct)
        .subscribe(() => {
          const subjectValue = this.enumSubject.getValue();
          subjectValue.push(<Enum> myDataStruct);
          this.enumSubject.next(subjectValue);
        })
    } else if(this.isUnion(myDataStruct)) {
      this.http.post(this.enumUrl, myDataStruct)
        .subscribe(() => {
          const subjectValue = this.unionSubject.getValue();
          subjectValue.push(<Union> myDataStruct);
          this.unionSubject.next(subjectValue);
        })
    } else if(this.isStruct(myDataStruct)) {
      this.http.post(this.enumUrl, myDataStruct)
        .subscribe(() => {
          const subjectValue = this.structSubject.getValue();
          subjectValue.push(<Struct> myDataStruct);
          this.structSubject.next(subjectValue);
        })
    }
  }

  deleteEnum(myEnum: Enum) {
    this.http.delete<Enum>(`${this.enumUrl}/${myEnum.id}`)
      .subscribe(() => {
        const contacts = this.enumSubject.getValue()
        const index: number = contacts.findIndex(c => c.id == myEnum.id)
        contacts.splice(index, 1)
        this.enumSubject.next(contacts)
      })
  }

  updateEnum(myEnum: Enum) {
    this.http.put<Enum>(`${this.enumUrl}/${myEnum.id}`, myEnum)
      .subscribe(() => {
        const contacts = this.enumSubject.getValue()
        const index: number = contacts.findIndex(c => c.id == myEnum.id)
        contacts.splice(index, 1, myEnum)
        this.enumSubject.next(contacts)
      })
  }

  searchEnumByName(term: string): Observable<Enum[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Enum[]>(`${this.enumUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        console.log(`found heroes matching "${term}"`) :
        console.log(`no heroes matching "${term}"`)),
      catchError(this.utilityService.handleError<Enum[]>('searchEnumByName', []))
    );
  }
}
