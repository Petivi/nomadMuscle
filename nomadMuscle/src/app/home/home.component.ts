import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { MapsComponent } from '../maps/maps.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _appService: AppService) { }

  ngOnInit() {
  }

}
