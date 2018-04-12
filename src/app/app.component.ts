import { Component, OnInit } from '@angular/core';
import { CityDataService } from './city-data.service';
import { City } from './city';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  arr: City[] = [];
  constructor(private _proddata: CityDataService) {}
  ngOnInit() {
    // this._proddata.getAllCities().subscribe(
    //   (x: City[]) => {
    //     this.arr = x;
    //     console.log(x);
    //   }
    // );
  }
  onShow(){
    this._proddata.getAllCities().subscribe(
      (x: City[]) => {
        this.arr = x;
        console.log(x);
      }
    );
  }
  onLogIn(){
    this._proddata.logIn();
  }
  onLogOut(){
    this._proddata.logOut();
  }
  onSignUp(){
    this._proddata.signUp();
  }
  onDelete(item) {
    this._proddata.deleteCity(item);
  }
}
