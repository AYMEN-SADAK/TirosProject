import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import {Subject} from "rxjs";
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class AllServService {


  vitreurs : Vitreur[] = [];
  vitreursSubject = new Subject<Vitreur[]>();


  emitVitreurs(){
    this.vitreursSubject.next(this.vitreurs);
  }

  saveVitreurs(){
    firebase.database().ref("/vitreurs").set(this.vitreurs);
  }

  LoadVitreurs(){
    firebase.database().ref('/vitreurs')
      .on('value', (data: DataSnapshot) => {
          this.vitreurs = data.val() ? data.val() : [];
          this.emitVitreurs();
        }
      );
  }

  getVitreur(id:string){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/vitreurs/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  addNewVitreur(product: Vitreur) {
    this.vitreurs.push(product);
    this.saveVitreurs();
    this.emitVitreurs();
  }

  removeVitreur(product: Vitreur) {
    const IndexToRemove = this.vitreurs.findIndex(
      (productEl) => {
        if(productEl === product) {
          return true;
        }
      }
    );
    this.vitreurs.splice(IndexToRemove, 1);
    this.saveVitreurs();
    this.emitVitreurs();
  }

}


export class Vitreur {

  Code:string;
  Nom:string;
  ProjectsId;
  Prenom: string;


  constructor(Code: string,  ProjectsId: any , Nom :string ,Prenom:string) {
    this.Nom = Nom;
    this.Prenom = Prenom;
    this.Code = Code;
    this.ProjectsId = ProjectsId;

  }

}
