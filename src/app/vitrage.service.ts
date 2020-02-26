import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import {Subject} from "rxjs";
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class VitrageService {


  vitrages : Vitrage[] = [];
  vitragesSubject = new Subject<Vitrage[]>();


  emitVitrages(){
    this.vitragesSubject.next(this.vitrages);
  }

  saveVitrages(){
    firebase.database().ref("/Vitrages").set(this.vitrages);
  }

  LoadVitrages(){
    firebase.database().ref('/Vitrages')
      .on('value', (data: DataSnapshot) => {
          this.vitrages = data.val() ? data.val() : [];
          this.emitVitrages();
        }
      );
  }

  getVitrage(id:string){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/Vitrages/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  addNewVitrage(product: Vitrage) {
    this.vitrages.push(product);
    this.saveVitrages();
    this.emitVitrages();
  }

  removeVitrage(product: Vitrage) {
    const IndexToRemove = this.vitrages.findIndex(
      (productEl) => {
        if(productEl === product) {
          return true;
        }
      }
    );
    this.vitrages.splice(IndexToRemove, 1);
    this.saveVitrages();
    this.emitVitrages();
  }

}


export class Vitrage {

  Numero:string;
  Type:string;
  Fournisseur: string;

  constructor(Numero: string, Type: string, Fournisseur: string) {
    this.Numero = Numero;
    this.Type = Type;
    this.Fournisseur = Fournisseur;
  }
}
