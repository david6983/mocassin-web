import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Ctype} from '../../domain/Ctype';
import {catchError, map, tap} from 'rxjs/operators';
import {Enum} from '../../domain/Enum';
import {Struct} from '../../domain/Struct';
import {Union} from '../../domain/Union';
import {TypeEnum} from '../../domain/TypeEnum';
import {Name} from '../../domain/Name';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  private NOT_UNIQUE_PROJECT = "The field already exist in another data structure in the project";
  reservedWords: string[];

  // get the API URL of Mocassin from environment variables
  private apiUrl = environment.mocassinApiUrl;

  constructor(
    private http: HttpClient // this service need to discuss with the server
  ) { }

  /**
   * Return the list of reserved words by the C language from the server.
   *
   * @return Observable array of string
   */
  getReservedCWordsList(): Observable<string[]> {
    const url = `${this.apiUrl}/reservedCWords`;
    return this.http.get<string[]>(url)
      .pipe(
        tap(words => this.reservedWords = words),
        catchError(this.handleError<string[]>('getReservedCWordsList', []))
      );
  }

  /**
   * Check if the given name is a reserved word in c programming
   *
   * list of words : https://beginnersbook.com/2014/01/c-keywords-reserved-words/
   *
   * @param name name to check
   * @param words
   * @return 'true' if reserved, 'false' if not reserved
   */
  isReservedWord(name: string, words: string[]): boolean {
    return words.findIndex(w => w === name) !== -1;
  }

  isReservedName(name: Name, words: Name[]): boolean {
    return words.findIndex(w => w.name === name.name && w.id !== name.id) !== -1;
  }

  /**
   * Get the list of the types supported by the C language from the server.
   *
   * @return An Observable on the list of type
   */
  getCTypesList(): Observable<Ctype[]> {
    const url = `${this.apiUrl}/cTypes`;
    return this.http.get<Ctype[]>(url)
      .pipe(
        tap(_ => _),
        catchError(this.handleError<Ctype[]>('getCTypesList', []))
      );
  }

  /**
   * Get the list of the name's types supported by the C language from the server.
   * This method will be usefull for a select component.
   *
   * @return An Observable on the list of type with the name only
   */
  getTypesList(): Observable<string[]> {
    return this.getCTypesList().pipe(
      map(types => types.map(type => type.cType))
    );
  }

  notUniqueInProject(): string {
    return this.NOT_UNIQUE_PROJECT;
  }

  isNameUnique(name: string, data: Enum | Union | Struct, type: TypeEnum): boolean {
    switch(type) {
      case TypeEnum.ENUM:
        return (<Enum> data).attributes.map<string>(attr => attr.name).indexOf(name) === -1
      case TypeEnum.UNION:
        return (<Union> data).attributes.map<string>(attr => attr.name).indexOf(name) === -1
      case TypeEnum.STRUCT:
        return (<Struct> data).attributes.map<string>(attr => attr.name).indexOf(name) === -1
      default:
        return false
    }
  }

  isAttributeNameUnique(name: string, data: Enum | Union | Struct, type: TypeEnum): boolean {
    switch(type) {
      case TypeEnum.ENUM:
        return (name !== data.name) && (<Enum> data).attributes.map<string>(attr => attr.name).indexOf(name) === -1
      case TypeEnum.UNION:
        return (name !== data.name) && (<Union> data).attributes.map<string>(attr => attr.name).indexOf(name) === -1
      case TypeEnum.STRUCT:
        return (name !== data.name) && (<Struct> data).attributes.map<string>(attr => attr.name).indexOf(name) === -1
      default:
        return false
    }
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
