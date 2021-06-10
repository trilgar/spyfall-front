import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  register(login: string, password: string): Observable<string> {
    const url = environment.restUrl + '/register';
    console.log('sending request to:', url);
    return this.http.post<string>(url, {login: login, password: password})
  }

  auth(login: string, password: string): Observable<Token> {
    const url = environment.restUrl + '/auth';
    console.log('sending request to:', url);
    return this.http.post<Token>(url, {login: login, password: password})
  }
}

export class Token {
  token: string;
}
