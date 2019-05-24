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
    user: User = new User({});
    radio: string;
    valid: boolean = true;
    controlValid : {
        [key : string] : boolean
    } = {}
    validEMail: boolean;
    constructor(private _appService: AppService, private _router: Router) { }

    ngOnInit() {

    }

    checkEmpty(input, controlName) {
        if (input) {
            this.valid = true;
            this.controlValid[controlName] = true;
        } else {
            this.controlValid[controlName] = false;
            this.valid = false;
        }
    }

    checkEmail(input, controlName) {
        var reg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (reg.test(input)) {
            this.valid = true;
            this.controlValid[controlName] = true;
        } else {
            this.controlValid[controlName] = false;
            this.valid = false;
        }
    }


    inscription() {

        // if(this.validateEmail(this.user.mail)) {
        //     // valid = false;
        //     console.log('email non valide');
        // }
        if (this.valid) {
            let value = {
                type: this.radio,
                data: this.user
            };
            this._appService.post('inscription', value).then((res: any) => {
                if (res.error) {
                    console.log('Erreur inscription : ' + res.error);
                } else {
                    console.log(res);
                    this._router
                }
            });
        }
    }
}
