import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../app.service';

import { User } from '../models/app.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    radio: string;
    user: User = new User({});

    constructor(private _appService: AppService, private _router: Router) { }

    ngOnInit() {
    }

    connexion() {
        let value = {
            type: this.radio,
            data: { mail: this.user.mail, password: this.user.password }
        }
        this._appService.post('login', value).then((res: any) => {
            if(!res.error) {
                console.log(res)
                let date = new Date();
                date.setHours(date.getHours() + 24);
                document.cookie = 'tokenNomadMuscle=' + res.token + '; expires=' + date.toString();
                document.cookie = 'typeUserNomadMuscle=' + this.radio + '; expires=' + date.toString();
                this._router.navigate(['/']).then(res => {
                    location.reload();
                });
            }
        });
    }

}
