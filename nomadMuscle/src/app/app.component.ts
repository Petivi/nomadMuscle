import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TestService } from './test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'nomadMuscle';

  constructor(private _testService: TestService, private http:HttpClient){

  }

  ngOnInit(){
    this._testService.get();
    // this.http.get('http:localhost:3000/films')
    // .subscribe(response => {
    //   console.log(response);
    // })
  }
}
