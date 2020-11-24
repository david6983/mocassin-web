import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Ctype} from '../domain/Ctype';
import {catchError, filter, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  // get the API URL of Mocassin from environment variables
  private apiUrl = environment.mocassinApiUrl;

  /**
   * match only alphanumeric string
   *
   * Regex description :
   *     ^ : start of string
   *     [ : beginning of character group
   *     a-z : any lowercase letter
   *     A-Z : any uppercase letter
   *     0-9 : any digit
   *     _ : underscore
   *     ] : end of character group
   *     * : zero or more of the given characters
   *     $ : end of string
   */
  private cVariableSyntaxRegex = new RegExp('^[a-zA-Z0-9_]*\$');

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
        tap(_ => console.log('fetched c words list')),
        catchError(this.handleError<string[]>('getReservedCWordsList', []))
      );
  }

  /**
   * Check if the given name is a reserved word in c programming
   *
   * list of words : https://beginnersbook.com/2014/01/c-keywords-reserved-words/
   *
   * @param name name to check
   * @return 'true' if reserved, 'false' if not reserved
   */
  isReservedWord(name: string): boolean {
    return false;
  }

  getCTypesList(): Observable<Ctype[]> {
    const url = `${this.apiUrl}/cTypes`;
    return this.http.get<Ctype[]>(url)
      .pipe(
        tap(_ => console.log('fetched c types')),
        catchError(this.handleError<Ctype[]>('getCTypesList', []))
      );
  }

  getTypesList(): Observable<string[]> {
    return this.getCTypesList().pipe(
      map(types => types.map(type => type.cType))
    );
  }

  /**
   * The given string should be an alphanumeric string to follow the C syntax
   *
   * We use a regular expression to check the string
   *
   * @param name name of the attribute to verify
   * @return true if follow the syntax
   */
  isNameSyntaxFollowCStandard(name: string): boolean {
    return this.cVariableSyntaxRegex.test(name);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
