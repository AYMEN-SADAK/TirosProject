import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import {Subject} from "rxjs";
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class PoseurService {


  poseurs : Poseur[] = [];
  poseursSubject = new Subject<Poseur[]>();


  emitPoseurs(){
    this.poseursSubject.next(this.poseurs);
  }

  savePoseurs(){
    firebase.database().ref("/Poseurs").set(this.poseurs);
  }

  LoadPoseurs(){
    firebase.database().ref('/Poseurs')
      .on('value', (data: DataSnapshot) => {
          this.poseurs = data.val() ? data.val() : [];
          this.emitPoseurs();
        }
      );
  }

  getPoseur(id:string){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/Poseurs/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  addNewPoseur(product: Poseur) {
    this.poseurs.push(product);
    this.savePoseurs();
    this.emitPoseurs();
  }

  removePoseur(product: Poseur) {
    const IndexToRemove = this.poseurs.findIndex(
      (productEl) => {
        if(productEl === product) {
          return true;
        }
      }
    );
    this.poseurs.splice(IndexToRemove, 1);
    this.savePoseurs();
    this.emitPoseurs();
  }

}


export class Poseur {

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
