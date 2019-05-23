import { Component, OnInit } from '@angular/core';

import { AppService } from '../app.service';

import { Transaction } from '../models/app.model';

@Component({
	selector: 'app-my-transaction',
	templateUrl: './my-transaction.component.html',
	styleUrls: ['./my-transaction.component.scss']
})
export class MyTransactionComponent implements OnInit {
	ttTransaction: Transaction[] = [];
	typeUtilisateur: String;
	constructor(private _appService: AppService) { }

	ngOnInit() {
		this.typeUtilisateur = this._appService.getCookie('typeUserNomadMuscle');
		this._appService.get('transactions').then((res: any) => {
			this.ttTransaction = res;
		});
	}

}
