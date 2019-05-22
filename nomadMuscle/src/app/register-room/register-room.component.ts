import { Component, OnInit } from '@angular/core';

import { Salle } from '../models/app.model';

import { AppService } from '../app.service';

@Component({
    selector: 'app-register-room',
    templateUrl: './register-room.component.html',
    styleUrls: ['./register-room.component.scss']
})
export class RegisterRoomComponent implements OnInit {
    salle: Salle = new Salle({});
    selectedDate: Date;

    constructor(private _appService: AppService) { }

    ngOnInit() {
    }

    addSalle() {
        let value: any = { data: this.salle };
        this._appService.post('salles', value).then(res => {
            console.log(res);
        });
    }

    gestionEquipement(event, type: string) {
        this.salle.equipements = this.salle.equipements ? this.salle.equipements : [];
        if (event.target.checked) {
            this.salle.equipements.push(type);
        } else {
            let id = this.salle.equipements.findIndex(e => e === type);
            if (id !== -1) {
                this.salle.equipements.splice(id, 1);
            }
        }
    }

    addException() {
        this.salle.disponibilite = this.salle.disponibilite ? this.salle.disponibilite : {semaine: [], exception: []};
        this.salle.disponibilite.exception.push(this.selectedDate);
    }
}
