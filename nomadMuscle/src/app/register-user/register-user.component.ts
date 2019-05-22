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
    
    constructor(private _appService: AppService, private _router: Router) { }

    ngOnInit() { }

    inscription() {
        let value = {
            type: this.radio,
            data: this.user
        };
        this._appService.post('inscription', value).then((res: any) => {
            if (res.error) {
                console.log('Erreur inscription : ' + res);
            } else {
                console.log(res);
                this._router
            }
        });
    }

}
