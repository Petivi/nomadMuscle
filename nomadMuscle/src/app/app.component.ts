import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'nomadMuscle';
  coucou: string = "couciu";

  constructor(private _testService: TestService){

  }

  ngOnInit(){
    this._testService.get().then(res => {
      console.log(res)
    });
    // this.http.get('http:localhost:3000/films')
    // .subscribe(response => {
    //   console.log(response);
    // })
  }
}
