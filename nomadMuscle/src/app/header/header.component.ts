import { Component, OnInit } from '@angular/core';

import { AppService } from '../app.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    typeUser: string = '';
    connected: boolean = false;

    constructor(private _appService: AppService) { }

    ngOnInit() {
        if (document.cookie.indexOf('tokenNomadMuscle') !== -1) {
            this.connected = true;
            if (document.cookie.indexOf('typeUserNomadMuscle') !== -1) {
                this.typeUser = this._appService.getCookie('typeUserNomadMuscle');
            }
        }
    }

}
