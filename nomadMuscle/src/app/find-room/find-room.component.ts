import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { AppService } from '../app.service';

import { Transaction } from '../models/app.model';

@Component({
	selector: 'app-find-room',
	templateUrl: './find-room.component.html',
	styleUrls: ['./find-room.component.scss']
})
export class FindRoomComponent implements OnInit {
	ttSalle: any[];
	times: any[] = [];
	loading: boolean = false;
	ttJour: any[] = [
		{ titre: 'Lundi', numero: 1 },
		{ titre: 'Mardi', numero: 2 },
		{ titre: 'Mercredi', numero: 3 },
		{ titre: 'Jeudi', numero: 4 },
		{ titre: 'Vendredi', numero: 5 },
		{ titre: 'Samedi', numero: 6 },
		{ titre: 'Dimanche', numero: 7 },
	]
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
	constructor(private _appService: AppService) { }

	ngOnInit() {
		this.getHalfHours();
		this.loading = true;
		this._appService.get('salles').then((salles: any) => {
			this.loading = false;
			this.ttSalle = salles.response;
			console.log(this.ttSalle)
			this.ttSalle.forEach(s => {
				s.salle.disponibilite.semaine.forEach(s => {
					s.heureDebut = this._appService.getCustomHour(s.debut);
					s.heureFin = this._appService.getCustomHour(s.fin);
				});
				let mois = this.ttMois.find(m => s.salle.disponibilite.mois === m.libelle);
				let max = mois.max.toString();
				mois = mois.value.toString().padStart(2, '0');
				s.salle.disponibilite.dateDebut = '2019-' + mois + '-01';
				s.salle.disponibilite.dateFin = '2019-' + mois + '-' + max;
				s.transaction = new Transaction({ idSalle: s.salle._id, });
			});
		});
	}

	louerSalle(salle) {
		console.log(salle)
		salle.transaction.debut = +salle.transaction.debut;
		salle.transaction.fin = +salle.transaction.fin;
		let valid = true;
		salle.ttError = [];
		salle.transaction.date = new Date(salle.transaction.date);
		let ttJourDispoSalle = [];
		salle.salle.disponibilite.semaine.forEach(s => {
			if (s.debut > 0 || s.fin > 0) {
				ttJourDispoSalle.push(this.ttJour.find(j => j.titre === s.titre));
			}
		});
		salle.salle.disponibilite.exception.forEach(e => {
			let exception = moment(e, 'DD-MM-YYYY').toDate();
			exception.setHours(0, 0, 0, 0)
			salle.transaction.date.setHours(0, 0, 0, 0)
			if (exception.toDateString() == salle.transaction.date.toDateString()) {
				valid = false;
				salle.ttError.push('La date demandé fait partie des exceptions et ne peux être sélectionnée');
			}
		});
		if (!ttJourDispoSalle.find(j => salle.transaction.date.getDay() === j.numero)) { //si le jour qu'on a choisi ne fait pas parti des jour possible
			valid = false;
			salle.ttError.push('Le jour choisi ne fait pas parti des jours disponible pour cette salle');
		}

		if (!salle.transaction.debut || !salle.transaction.fin || !salle.transaction.date) {
			valid = false;
			salle.ttError.push('Vous devez remplir les champs "debut", "fin" et "date".');
		}
		if (salle.transaction.debut > salle.transaction.fin) {
			valid = false;
			salle.ttError.push('L\'heure de début ne peut pas être plus grande que l\'heure de fin');
		}
		if (valid) {
			let tempsDemande = salle.transaction.fin - salle.transaction.debut;
			tempsDemande = tempsDemande / 2;
			salle.transaction.montant = tempsDemande * salle.salle.tarifHoraire;
			this._appService.post('transactions', { data: salle.transaction });
		}
	}

	getHalfHours() {
		var x = 30; //minutes interval
		var tt = 0; // start time
		for (var i = 0; tt < 24 * 60; i++) {
			var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
			var mm = (tt % 60); // getting minutes of the hour in 0-55 format
			this.times[i] = { display: ("0" + (hh)).slice(-2) + ':' + ("0" + mm).slice(-2), value: i }; // pushing data in array in [00:00 - 12:00 AM/PM format]
			tt = tt + x;
		}
	}

}
