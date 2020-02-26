import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import {Subject} from "rxjs";
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class AluService {

  aluminiums : Aluminium[] = [];
  aluminiumsSubject = new Subject<Aluminium[]>();


  emitAluminiums(){
    this.aluminiumsSubject.next(this.aluminiums);
  }

  saveAluminiums(){
    firebase.database().ref("/Aluminiums").set(this.aluminiums);
  }

  LoadAluminiums(){
    firebase.database().ref('/Aluminiums')
      .on('value', (data: DataSnapshot) => {
          this.aluminiums = data.val() ? data.val() : [];
          this.emitAluminiums();
        }
      );
  }

  getAluminium(id:string){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/Aluminiums/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  addNewAluminium(product: Aluminium) {
    this.aluminiums.push(product);
    this.saveAluminiums();
    this.emitAluminiums();
  }

  removeAluminium(product: Aluminium) {
    const IndexToRemove = this.aluminiums.findIndex(
      (productEl) => {
        if(productEl === product) {
          return true;
        }
      }
    );
    this.aluminiums.splice(IndexToRemove, 1);
    this.saveAluminiums();
    this.emitAluminiums();
  }

}


export class Aluminium {

  Numero:string;
  Ral:string;
  Gamme: string;


  constructor(Numero: string, Ral: string, Gamme: string) {
    this.Numero = Numero;
    this.Ral = Ral;
    this.Gamme = Gamme;
  }
}
