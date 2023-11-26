import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class AuthService {

  constructor(){
  }


  protected _logged = new BehaviorSubject<boolean>(false);
  public isLogged$ = this._logged.asObservable();

  public abstract login(credentials: Object): Observable<any>;

  public abstract register(info: Object): Observable<any>;

  public abstract logout(): void;

  public abstract me(): Observable<any>;

}
