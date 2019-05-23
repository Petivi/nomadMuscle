import { Component, OnInit } from '@angular/core';

import { Salle } from '../models/app.model';

import { AppService } from '../app.service';

@Component({
    selector: 'app-register-room',
    templateUrl: './register-room.component.html',
    styleUrls: ['./register-room.component.scss']
})
export class RegisterRoomComponent implements OnInit {
    salle: Salle = new Salle({
        disponibilite: {
            semaine: [
                { titre: 'Lundi', debut: 0, fin: 0 },
                { titre: 'Mardi', debut: 0, fin: 0 },
                { titre: 'Mercredi', debut: 0, fin: 0 },
                { titre: 'Jeudi', debut: 0, fin: 0 },
                { titre: 'Vendredi', debut: 0, fin: 0 },
                { titre: 'Samedi', debut: 0, fin: 0 },
                { titre: 'Dimanche', debut: 0, fin: 0 },
            ]
        }
    });
    selectedDate: Date;
    times: any[] = [];

    constructor(private _appService: AppService) { }

    ngOnInit() {
        this.getHalfHours();
    }

    getHalfHours() {
        var x = 30; //minutes interval
        // var times = []; // time array
        var tt = 0; // start time

        for (var i = 0; tt < 24 * 60; i++) {
            var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
            var mm = (tt % 60); // getting minutes of the hour in 0-55 format
            this.times[i] = ("0" + (hh)).slice(-2) + ':' + ("0" + mm).slice(-2); // pushing data in array in [00:00 - 12:00 AM/PM format]
            tt = tt + x;
        }
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
        this.salle.disponibilite = this.salle.disponibilite ? this.salle.disponibilite : { semaine: [], exception: [] };
        this.salle.disponibilite.exception.push(this.selectedDate);
    }
}
