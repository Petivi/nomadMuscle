import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class TestService {
    urlServeur: string = 'http://localhost:3000/films';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        })
    }
    constructor(private _http: HttpClient) { }

    get() {
        return this._http.get(this.urlServeur, this.httpOptions)
            .toPromise()
            .then(res => {
              console.log(res);
                // if (res['body']) {
                //     let value = JSON.parse(res['body']);
                //     return value;
                // } else return true;
            });
    }
}
