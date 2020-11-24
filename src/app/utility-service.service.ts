import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Ctype} from '../domain/Ctype';

@Injectable({
  providedIn: 'root'
})
export class UtilityServiceService {
  private apiUrl = environment.mocassinApiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getReservedCWordsList(): Observable<string[]> {
    return of(['']);
  }

  isReserved(query: string): boolean {
    return true;
  }

  getCtypesList(): Observable<Ctype[]> {
    return of();
  }

  getTypesList(): Observable<string[]> {
    return of();
  }
}
