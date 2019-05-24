import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  lat: number = -23.8779431;
  lng: number = -49.8046873;
  zoom: number = 15;
  constructor() { }

  ngOnInit() {
  }

}
