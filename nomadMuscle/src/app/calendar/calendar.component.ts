import { Component, OnInit, Input } from '@angular/core';
import * as globals from '../../assets/data/globals';
import * as moment from 'moment';

import { AppService } from '../app.service';

import { JourCalendar, Evennement, Transaction, SalleComplete } from '../models/app.model';

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
	@Input() salle: SalleComplete;
	selectedTransaction: Transaction;
	ttTransactionDuJour: Transaction[] = [];
	typeUser: string;
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
		this.typeUser = this._appService.getCookie('typeUserNomadMuscle');
		console.log(this.salle)
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
		let semaineToPush: any[] = [];
		for (let i = 1; i < 43; i++) {
			if (i >= jourDebutMois && i - jourDebutMois + 1 <= nbJourDansMois) { //si on est bien dans le mois courant (c'est a dire entre 1 et 31 pour le mois de mai par exemple)
				let libelle = this.getJourLibelle(this.selectedYear, this.selectedMois, chaqueJourDuMois)
				semaineToPush.push({ libelle: libelle, numero: chaqueJourDuMois, moisCourant: true, optionDisplayed: false });
				chaqueJourDuMois++;
			} else if (i < jourDebutMois) {
				let libelle = this.getJourLibelle(this.selectedYear, this.selectedMois, nbJourMoisPrecedent - jourDebutMois + 1 + i)
				semaineToPush.push({ libelle: libelle, numero: nbJourMoisPrecedent - jourDebutMois + 1 + i, moisCourant: false, optionDisplayed: false }); // ex 30 - 3 parce que le mois precedent a 30 jours et le mois courant commence un mercredi
			} else {															   // or il n'y a que deux jour a remplir le lundi et le mardi donc on rajoute 1 pour avoir 30 - 3 = 28 + 1 = 29
				let libelle = this.getJourLibelle(this.selectedYear, this.selectedMois, chaqueJourMoisSuivant)
				semaineToPush.push({ libelle: libelle, numero: chaqueJourMoisSuivant, moisCourant: false, optionDisplayed: false });					   // et on ajoute i pour incrementer sinon ça reste a 29
				chaqueJourMoisSuivant++;
			}
			k++;
			if (k > 6 || i === 42) {
				k = 0;
				this.ttSemaine.push(semaineToPush);
				semaineToPush = [];
			}
		}
		this.setDisponibilite();
	}

	getJourLibelle(year: number, month: number, day: number) {
		let date = new Date(year.toString() + '-' + (month + 1).toString() + '-' + day.toString());
		return this.ttJourDeLaSemaine.find(j => j.numero == date.getDay()).libelle;
	}

	setDisponibilite() {
		console.log(this.ttSemaine);
		this.ttSemaine.forEach(semaine => {
			semaine.forEach(jour => {
				this.salle.salle.disponibilite.disponibilites.forEach(dispo => {
					let dateDebutDispo = new Date(dispo.debut);
					dateDebutDispo.setHours(dateDebutDispo.getHours() - 2); //a voir si on garde ça 
					let dateFinDispo = new Date(dispo.fin);
					dateFinDispo.setHours(dateFinDispo.getHours() - 2);
					if (jour.numero == dateDebutDispo.getDate() && jour.numero == dateFinDispo.getDate() && jour.moisCourant) {
						let eventDebut = dateDebutDispo.getHours() * 2 + (dateDebutDispo.getMinutes() != 0 ? 1 : 0);
						let eventFin = dateFinDispo.getHours() * 2 + (dateFinDispo.getMinutes() != 0 ? 1 : 0);
						if (jour.ttEvent) {
							jour.ttEvent.push({ libelle: 'Disponibilité', debut: eventDebut, fin: eventFin });
						} else {
							jour.ttEvent = [{ libelle: 'Disponibilité', debut: eventDebut, fin: eventFin }];
						}
					}
				});
			});
		});
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
		if (jour.moisCourant && this.typeUser === 'bailleur') {
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
	}

	cancelEvent(jour: JourCalendar) {
		this.selectedEvent = new Evennement({});
		jour.eventDisplayed = false;
	}

	checkNbEvent(jour: JourCalendar, event: Evennement) {
		return jour.ttEvent.findIndex(e => e === event) < 2;
	}

	showJour(jour: JourCalendar = null) {
		if (jour) {
			let dateJour = this.selectedYear + '-' + (this.selectedMois + 1).toString().padStart(2, '0') + '-' + jour.numero.toString().padStart(2, '0');
			this.ttTransactionDuJour = [];
			console.log(dateJour)
			this.salle.ttTransaction.forEach(t => {
				let dateTrans = moment(t.date.toString().slice(0, 10)).format('YYYY-MM-DD');
				console.log(dateTrans)
				if (dateTrans === dateJour) {
					this.ttTransactionDuJour.push(t)
				}
			})
			this.selectedJour = jour;
			this.selectedTransaction = new Transaction({});
		}
	}

	changeMonth(type: string) {
		if (type === 'next') {
			if (this.selectedMois == 11) {
				this.selectedMois = 0;
				this.selectedYear++;
			} else {
				this.selectedMois++;
			}
		} else {
			if (this.selectedMois == 0) {
				this.selectedYear--;
				this.selectedMois = 11;
			} else {
				this.selectedMois--;
			}
		}
		this.setMonth();
	}
}
