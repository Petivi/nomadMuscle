import { Component, OnInit } from '@angular/core';

import { AppService } from '../app.service';

import { Salle } from '../models/app.model';

@Component({
	selector: 'app-find-room',
	templateUrl: './find-room.component.html',
	styleUrls: ['./find-room.component.scss']
})
export class FindRoomComponent implements OnInit {
	ttSalle: Salle[];
	loading: boolean = false;
	constructor(private _appService: AppService) { }

	ngOnInit() {
		this.loading = true;
		this._appService.get('salles').then((salles: any) => {
			this.loading = false;
			this.ttSalle = salles.response;
			console.log(this.ttSalle)
		});
	}

}
