import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../app.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    typeUser: string = '';
    connected: boolean = false;

    constructor(private _appService: AppService, private _router: Router) { }

    ngOnInit() {
        this.initMenu();
    }

    deconnexion() {
        document.cookie = 'tokenNomadMuscle= ; expires=Fri, 31 Dec 1900 23:59:59 GMT';
        document.cookie = 'typeUserNomadMuscle= ; expires=Fri, 31 Dec 1900 23:59:59 GMT';
        this.initMenu();
        this._router.navigate(['/login']);
    }

    initMenu() {
        if (document.cookie.indexOf('tokenNomadMuscle') !== -1) {
            this.connected = true;
            if (document.cookie.indexOf('typeUserNomadMuscle') !== -1) {
                this.typeUser = this._appService.getCookie('typeUserNomadMuscle');
            }
        } else {
            this.connected = false;
            this.typeUser = null;
        }
    }

}
