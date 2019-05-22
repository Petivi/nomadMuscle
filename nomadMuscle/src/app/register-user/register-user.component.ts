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
    user: User = new User();
    radio: string;

    ngOnInit() { }

    constructor(private _appService: AppService, private _router: Router) { }

    inscription() {
        let url: string;
        if (this.radio === "bailleur") {
            url = "bailleurs";
        } else {
            url = "locataires"
        }
        this._appService.post(url, this.user).then(res => {
            
            if (res.error) {
                console.log('Erreur inscription : ' + res);
            } else {
                console.log(res);
                this._router
            }
        });
    }

}
