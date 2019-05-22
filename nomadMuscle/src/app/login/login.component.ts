import { Component, OnInit } from '@angular/core';

import { AppService } from '../app.service';

import { User } from '../models/app.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    radio: string;
    user: User = new User;

    constructor(private _appService: AppService) { }

    ngOnInit() {
    }

    connexion() {
        let value = {
            type: this.radio,
            data: { mail: this.user.mail, password: this.user.password }
        }
        this._appService.post('login', value).then((res: any) => {
            let date = new Date();
            date.setHours(date.getHours() + 24);
            document.cookie = 'tokenNomadMuscle=' + res.token + '; expires=' + date.toString() + '; path=/';
        });
    }

}
