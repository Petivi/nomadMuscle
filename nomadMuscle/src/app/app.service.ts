import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    urlServeur: string = 'http://localhost:3000/';
    httpOptionsGet = {
        headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'x-auth': (document.cookie.indexOf('tokenNomadMuscle') !== 1 ? this.getCookie('tokenNomadMuscle') : '')
        })
    }

    httpOptionsPost = {
        headers: new HttpHeaders({
            'x-auth': (document.cookie.indexOf('tokenNomadMuscle') !== 1 ? this.getCookie('tokenNomadMuscle') : '')
        })
    }

    constructor(private _http: HttpClient) { }

    get(url: string) {
        return this._http.get(this.urlServeur + url, this.httpOptionsGet)
            .toPromise()
            .then(res => {
                return res;
            });
    }

    post(url: string, value: any) {
        return this._http.post(this.urlServeur + url, value, this.httpOptionsPost)
            .toPromise()
            .then(res => {
                return res
            }).catch(err => {
                console.log(err);
            });
    }

    patch(url: string, value: any) {
        return this._http.patch(this.urlServeur + url, value, this.httpOptionsPost)
            .toPromise()
            .then(res => {
                return res
            }).catch(err => {
                console.log(err);
            });
    }

    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    getCustomHour(hour) {
        if (hour % 2 == 1) { // avec demie heure
            var newHour = (hour - 1) / 2;
            return newHour.toString().padStart(2, "0") + "h30";
        } else { // sans demie heure
            return (hour / 2).toString().padStart(2, "0") + "h00";
        }
    }

    uploadImage(image: File, typeUser: string, pieceId: boolean) {
        const formData = new FormData();

        formData.append('image', image);

        if (pieceId) {
            return this._http.post(this.urlServeur + typeUser + 's/pieceId', formData, this.httpOptionsPost);
        } else if (typeUser === "locataire") {
            return this._http.post(this.urlServeur + typeUser + 's/certificat', formData, this.httpOptionsPost);
        }
    }

    getHalfHours() {
        let times = [];
        var x = 30; //minutes interval
        var tt = 0; // start time
        for (var i = 0; tt < 24 * 60; i++) {
            var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
            var mm = (tt % 60); // getting minutes of the hour in 0-55 format
            times[i] = { display: ("0" + (hh)).slice(-2) + ':' + ("0" + mm).slice(-2), value: i }; // pushing data in array in [00:00 - 12:00 AM/PM format]
            tt = tt + x;
        }
        return times;
    }
}
