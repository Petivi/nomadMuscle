import { Component, OnInit } from '@angular/core';

import * as globals from '../../assets/data/globals';

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
	selectedYear: number = new Date().getFullYear();
	selectedMois: number = new Date().getMonth();
	ttSemaine: any[] = [];
	ttAnnee: number[] = [];
	ttMois: any[] = globals.ttMois;
	ttJourDeLaSemaine: any[] = globals.ttJour;

	constructor() { }

	ngOnInit() {
		this.initYears();
		this.setMonth();

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
				ttSemaineToPush.push(chaqueJourDuMois);
				chaqueJourDuMois++;
			} else if (i < jourDebutMois) {
				ttSemaineToPush.push(nbJourMoisPrecedent - jourDebutMois + 1 + i); // ex 30 - 3 parce que le mois precedent a 30 jours et le mois courant commence un mercredi
			} else {															   // or il n'y a que deux jour a remplir le lundi et le mardi donc on rajoute 1 pour avoir 30 - 3 = 28 + 1 = 29
				ttSemaineToPush.push(chaqueJourMoisSuivant);					   // et on ajoute i pour incrementer sinon ça reste a 29
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

}
