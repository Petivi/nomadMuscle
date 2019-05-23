import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { AppService } from '../app.service';

import { ImageSnippet } from '../models/app.model';

@Component({
	selector: 'app-my-account',
	templateUrl: './my-account.component.html',
	styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
	user: any;
	selectedFile: ImageSnippet;
	typeUser: string;
	credit: number = 0;
	file: any;
	constructor(private _appService: AppService) { }

	ngOnInit() {
		this.typeUser = this._appService.getCookie('typeUserNomadMuscle');
		this._appService.get(this.typeUser + 's').then(res => {
			this.user = res[0];
			this.user.dobString = moment(this.user.dateNaissance).format('DD/MM/YYYY');
			console.log(this.user)
		});
	}

	private onSuccess() {
		this.selectedFile.pending = false;
		this.selectedFile.status = 'ok';
	  }
	
	  private onError() {
		this.selectedFile.pending = false;
		this.selectedFile.status = 'fail';
		this.selectedFile.src = '';
	  }
	
	  test(imageInput: any) {
		const file: File = imageInput.files[0];
		const reader = new FileReader();
	
		reader.addEventListener('load', (event: any) => {
	
		  this.selectedFile = new ImageSnippet(event.target.result, file);
	
		  this.selectedFile.pending = true;
		  this._appService.uploadImage(this.selectedFile.file).subscribe(
			(res) => {
			  this.onSuccess();
			},
			(err) => {
			  this.onError();
			})
		});
	
		reader.readAsDataURL(file);
	  }

	crediter() {
		if (this.credit > 0) {
			this.user.solde += this.credit;
			this._appService.patch('locataires/solde', { data: { solde: this.credit } });
			this.credit = 0;
		}
	}
}
