import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { AppService } from '../app.service';

@Component({
	selector: 'app-my-account',
	templateUrl: './my-account.component.html',
	styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
	user: any;
	typeUser: string;
	credit: number = 0;
	constructor(private _appService: AppService) { }

	ngOnInit() {
		this.typeUser = this._appService.getCookie('typeUserNomadMuscle');
		this._appService.get(this.typeUser + 's').then(res => {
			this.user = res[0];
			this.user.dobString = moment(this.user.dateNaissance).format('DD/MM/YYYY');
			console.log(this.user)
		});
	}

	crediter() {
		if (this.credit > 0) {
			this.user.solde += this.credit;
			this._appService.patch('locataires/solde', { data: { solde: this.user.solde } });
		}
	}
}
