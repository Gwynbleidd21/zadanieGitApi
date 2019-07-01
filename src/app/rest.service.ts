/* tslint:disable:prefer-const */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const endpoint = 'http://localhost:3000/api/v1/';
const configUrl = 'https://api.github.com/search/users';
const getAllUsers = 'https://api.github.com/search/users?q=location:';
const userUrl = 'https://api.github.com/users/';
const reposUrl = 'https://api.github.com/search/repositories?q=user:';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class RestService {

  constructor(private http: HttpClient) { }

  getProducts(searchParam: string) {
    return this.http.get(getAllUsers + searchParam).pipe();
  }

  getUserDetails(userDetailUrl: string) {
    return this.http.get(userDetailUrl);
  }

  getUser(userName: string) {
    return this.http.get(userUrl + userName).pipe();
  }

  getRepositories(userName) {
    return this.http.get(reposUrl + userName).pipe();
  }

  getSomeRepos(params) {
    console.log(userUrl + params);
    return this.http.get(userUrl + params).pipe();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
