import { Component, OnInit } from '@angular/core';

import { Salle } from '../models/app.model';

import { AppService } from '../app.service';

@Component({
    selector: 'app-register-room',
    templateUrl: './register-room.component.html',
    styleUrls: ['./register-room.component.scss']
})
export class RegisterRoomComponent implements OnInit {
    salle: Salle = new Salle;

    constructor(private _appService: AppService) { }

    ngOnInit() {
    }

    addSalle() {
        let value: any = { data: this.salle };
        this._appService.post('salles', value).then(res => {
            console.log(res);
        });
    }

}
