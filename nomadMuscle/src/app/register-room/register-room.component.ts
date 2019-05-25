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
            ],
            exception: []
        },
    });
    ttMois: any[] = [
        { libelle: 'janvier', value: 1, max: 31 },
        { libelle: 'fevrier', value: 2, max: 28 },
        { libelle: 'mars', value: 3, max: 31 },
        { libelle: 'avril', value: 4, max: 30 },
        { libelle: 'mai', value: 5, max: 31 },
        { libelle: 'juin', value: 6, max: 30 },
        { libelle: 'juillet', value: 7, max: 31 },
        { libelle: 'aout', value: 8, max: 31 },
        { libelle: 'septembre', value: 9, max: 30 },
        { libelle: 'octobre', value: 10, max: 31 },
        { libelle: 'novembre', value: 11, max: 30 },
        { libelle: 'decembre', value: 12, max: 31 },
    ]
    selectedDate: Date;
    times: any[] = [];

    constructor(private _appService: AppService) { }

    ngOnInit() {
        this.times = this._appService.getHalfHours();
    }

    addSalle() {
        this.salle.disponibilite.semaine.forEach(jour => {
            jour.debut = +jour.debut;
            jour.fin = +jour.fin;
        }); //TODO: mettre des erreur si il y a un debut > fin pour les disponibilité et si il manque les info obligatoire nom adresse etc...
        let value: any = { data: this.salle };
        this._appService.post('salles', value);
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
