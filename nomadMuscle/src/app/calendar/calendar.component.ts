import { Component, OnInit } from '@angular/core';
import * as globals from '../../assets/data/globals';

import { AppService } from '../app.service';

import { JourCalendar, Evennement } from '../models/app.model';

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
	selectedYear: number = new Date().getFullYear();
	selectedMois: number = new Date().getMonth();
	selectedEvent: Evennement = new Evennement({});
	selectedJour: JourCalendar;
	times: any[] = [];
	ttSemaine: any[] = [];
	ttAnnee: number[] = [];
	ttMois: any[] = globals.ttMois;
	ttJourDeLaSemaine: any[] = globals.ttJour;

	constructor(private _appService: AppService) { }

	ngOnInit() {
		this.times = this._appService.getHalfHours();
		this.initYears();
		this.setMonth();

	}

	getCustomHour(hour: number) {
		return this._appService.getCustomHour(hour);
	}

	initYears() {
		for (let i = 1900; i < 2101; i++) {
			this.ttAnnee.push(i);
		}
	}

	setMonth() {
		this.ttSemaine = [];
		let nbJourDansMois = this.getNbJourMois(+this.selectedMois);
		let nbJourMoisPrecedent = this.getNbJourMois(+this.selectedMois - 1);
		let jourDebutMois = new Date(+this.selectedYear.toString() + '-' + (+this.selectedMois + 1).toString().padStart(2, '0') + '-01').getDay(); //lundi mardi mercredi...
		let chaqueJourDuMois = 1; //sera incrementé et correspond a 1-31;
		let chaqueJourMoisSuivant = 1; //sera incrementé et correspond a 1-31;
		let k = 0;
		let ttSemaineToPush: any[] = [];
		for (let i = 1; i < 43; i++) {
			if (i >= jourDebutMois && i - jourDebutMois + 1 <= nbJourDansMois) { //si on est bien dans le mois courant (c'est a dire entre 1 et 31 pour le mois de mai par exemple)
				ttSemaineToPush.push({ numero: chaqueJourDuMois, moisCourant: true, optionDisplayed: false });
				chaqueJourDuMois++;
			} else if (i < jourDebutMois) {
				ttSemaineToPush.push({ numero: nbJourMoisPrecedent - jourDebutMois + 1 + i, moisCourant: false, optionDisplayed: false }); // ex 30 - 3 parce que le mois precedent a 30 jours et le mois courant commence un mercredi
			} else {															   // or il n'y a que deux jour a remplir le lundi et le mardi donc on rajoute 1 pour avoir 30 - 3 = 28 + 1 = 29
				ttSemaineToPush.push({ numero: chaqueJourMoisSuivant, moisCourant: false, optionDisplayed: false });					   // et on ajoute i pour incrementer sinon ça reste a 29
				chaqueJourMoisSuivant++;
			}
			k++;
			if (k > 6 || i === 42) {
				k = 0;
				this.ttSemaine.push(ttSemaineToPush);
				ttSemaineToPush = [];
			}
		}
	}

	getNbJourMois(mois: number) {
		if (mois === -1) {
			mois = 11;
		} else if (mois === 12) {
			mois = 0
		}
		if (mois === 1) {
			return mois % 4 === 0 ? 29 : 28;
		} else {
			return this.ttMois.find(m => mois === m.numero).max;
		}
	}

	showJourOption(jour: JourCalendar, type: string) {
		if (jour.moisCourant) {
			this.ttSemaine.forEach(ttJour => {
				ttJour.forEach(j => {
					j.optionDisplayed = false;
				});
			});
			if (type === 'enter') jour.optionDisplayed = true;
			if (type === 'leave') jour.optionDisplayed = false;
		}
	}

	showEvent(jour: JourCalendar) {
		jour.optionDisplayed = false;
		jour.eventDisplayed = true;
	}

	saveEvent(jour: JourCalendar) {
		this.selectedEvent.libelle = 'Disponibilité'; // en fonction de bailleur ou locataire changer pour location ou autre
		let value: Evennement = new Evennement({});
		Object.assign(value, this.selectedEvent);
		if (jour.ttEvent) {
			jour.ttEvent.push(value);
		} else {
			jour.ttEvent = [value];
		}
		this.selectedEvent = new Evennement({});
		jour.eventDisplayed = false;
		console.log(jour)
	}

	cancelEvent(jour: JourCalendar) {
		this.selectedEvent = new Evennement({});
		jour.eventDisplayed = false;
	}
	
	checkNbEvent(jour: JourCalendar, event: Evennement) {
		return jour.ttEvent.findIndex(e => e === event) < 2;
	}

	showJour(jour = null) {
		this.selectedJour = jour;
	}
}
