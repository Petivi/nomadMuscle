import { Component, OnInit } from '@angular/core';

import { AppService } from '../app.service';

import { Salle } from '../models/app.model';

@Component({
    selector: 'app-my-room',
    templateUrl: './my-room.component.html',
    styleUrls: ['./my-room.component.scss']
})
export class MyRoomComponent implements OnInit {
    ttSalle: Salle[];
    pieceValidated: boolean;
    constructor(private _appService: AppService) { }

    ngOnInit() {
        this._appService.get('salles').then((res: any) => {
            this.ttSalle = res.response.salles;
            this.pieceValidated = res.response.pieceIdValidated;
        });
    }

}
