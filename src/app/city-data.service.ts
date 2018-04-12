import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { City } from './city';
@Injectable()
export class CityDataService {
  citiescollection: AngularFirestoreCollection<City>;
  cities: Observable<City[]>;
  citiesDoc: AngularFirestoreDocument<City>;
  constructor(public _afs: AngularFirestore, public _afauth: AngularFireAuth) {
    // , x => x.orderBy('pname', 'asc')
    this.citiescollection = this._afs.collection('cities');
    this.cities = this.citiescollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as City;
        data.key = a.payload.doc.id;
        return data;
      });
    });
  }

  getAllCities() {
    return this.cities;
  }
  getCityByState(value: string) {
    this.citiescollection = this._afs.collection('cities', x =>
      x.where('state', '==', value)
    );
    return this.citiescollection.snapshotChanges().map(
      x => {
        return  x.map(
        a => {
          const data = a.payload.doc.data() as City;
          data.key = a.payload.doc.id;
          return data;
        }
      );
      }
    );
  }
  getCitiesInOrder() {
    this.citiescollection = this._afs.collection('cities', x =>
     // x.orderBy('name', 'desc')
      x.orderBy('name', 'asc').limit(3)

    );
    return this.citiescollection.snapshotChanges().map(
      x => {
        return  x.map(
        a => {
          const data = a.payload.doc.data() as City;
          data.key = a.payload.doc.id;
          return data;
        }
      );
      }
    );
  }
  addCity(user) {
    this.citiescollection.add(user);
  }
  deleteCity(city: City) {
    this.citiesDoc = this._afs.doc('cities/' + city.key);
    this.citiesDoc.delete();
  }
  logOut(){
    this._afauth.auth.signOut().then(
      res=>{
        console.log(res);
      }
    ).catch();
  }
  logIn() {
    this._afauth.auth.signInWithEmailAndPassword('test@test.com', '123456').then(
      res => {
        console.log(res);
      }
    ).catch(
      error => {
        console.log(error);
      }
    );
  }
  signUp() {
    this._afauth.auth.createUserWithEmailAndPassword('test@test.com', '123456').then(
      (result) => {
      console.log(result);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }
}
