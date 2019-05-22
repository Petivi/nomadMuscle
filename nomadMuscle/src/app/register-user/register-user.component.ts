import { RouterModule, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AppService } from './../app.service';

import { User } from '../models/app.model';

@Component({
    selector: 'app-register-user',
    templateUrl: './register-user.component.html',
    styleUrls: ['./register-user.component.scss']
})
export class RegisterUSerComponent implements OnInit {
    routepost: string;
    user: User = new User();

    ngOnInit() { }

    constructor(private _appService: AppService, private _router: Router) { }

    inscription(data) {
        // if (radio.selected === "bailleur") {
        //     this.routepost = "action/localhost:3000/bailleurs";
        // } else {
        //     this.routepost = "action/localhost:3000/locataires"
        // }
        this._appService.post(`action/localhost:3000/bailleurs`, data).then(res => {
            if (res.error) {
                console.log('Erreur inscription : ' + res);
            } else {
                console.log(res);
                this._router
            }
        });
        console.log(data.value);
    }

}
