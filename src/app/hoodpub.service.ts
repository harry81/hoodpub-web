import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BookItem, Channel, BookSearch } from './protocol';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import { API_URL } from './main/api';


class Item {
  constructor(public track: string) {
  }
}

@Injectable()
export class HoodpubService {

    constructor(
        private http: HttpClient) { }

    private handleError(operation: String) {
        return (err: any) => {
            const errMsg = `error in ${operation}() retrieving `;
            console.log(`${errMsg}:`, err);

            if (err instanceof HttpErrorResponse) {
                console.log(`status: ${err.status}, ${err.statusText}`);
            }
            return Observable.throw(errMsg);
        };
    }
    search(keyword?: string): Observable<BookItem[]> {
        console.log('keyword', keyword);
        const params = new HttpParams().set('keyword', keyword);
        const url = `${API_URL}/book/`;

        if (keyword.length === 0) {
            return Observable.of(null);
        }

        return this.http.get<BookSearch>(url, { params }).pipe(
            map((response: BookSearch) => response.res.channel.item),
            tap(info => console.log('info', info)),
            catchError(this.handleError('getData'))
        );
    }
}
