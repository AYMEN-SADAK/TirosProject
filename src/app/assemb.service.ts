import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import {Subject} from "rxjs";
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class AssembService {


  Assembs : Assemb[] = [];
  AssembsSubject = new Subject<Assemb[]>();


  emitAssembs(){
    this.AssembsSubject.next(this.Assembs);
  }

  saveAssembs(){
    firebase.database().ref("/Assembs").set(this.Assembs);
  }

  LoadAssembs(){
    firebase.database().ref('/Assembs')
      .on('value', (data: DataSnapshot) => {
          this.Assembs = data.val() ? data.val() : [];
          this.emitAssembs();
        }
      );
  }

  getAssemb(id:string){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/Assembs/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  addNewAssemb(product: Assemb) {
    this.Assembs.push(product);
    this.saveAssembs();
    this.emitAssembs();
  }

  removeAssemb(product: Assemb) {
    const IndexToRemove = this.Assembs.findIndex(
      (productEl) => {
        if(productEl === product) {
          return true;
        }
      }
    );
    this.Assembs.splice(IndexToRemove, 1);
    this.saveAssembs();
    this.emitAssembs();
  }

}


export class Assemb {

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
