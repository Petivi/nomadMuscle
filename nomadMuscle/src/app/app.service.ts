import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    urlServeur: string = 'http://localhost:3000/bailleurs';
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
                return res;
            });
    }
    post(url: string, value: any) {
        value = JSON.stringify(value);
        return this._http.post(url, value)
            .toPromise()
            .then(res => {
                if (res['body']) {
                    let value = JSON.parse(res['body']);
                    return value;
                } else return true;
            })
            .catch(err => {
                console.log(err);
            });
    }
}
