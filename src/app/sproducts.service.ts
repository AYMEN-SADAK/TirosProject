import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import {Subject} from "rxjs";
import DataSnapshot = firebase.database.DataSnapshot;


export class SProduct {

  Description:string;
  Ref:string;
  ProjectId:string;
  Date:string;
  Longueur:string ;
  Largeur:string;


  constructor(Description: string, Ref: string, ProjectId: string, Date: string, Longueur: string, Largeur: string) {
    this.Description = Description;
    this.Ref = Ref;
    this.ProjectId = ProjectId;
    this.Date = Date;
    this.Longueur = Longueur;
    this.Largeur = Largeur;
  }
}

@Injectable({
  providedIn: 'root'
})
export class SProductsService {

  nbrItems=0;
 sproducts : SProduct[] = [];
 sproductsSubject = new Subject<SProduct[]>();


  emitSProducts(){
    this.sproductsSubject.next(this.sproducts);
  }

  saveSProducts(){
    firebase.database().ref("/sproducts").set(this.sproducts);
  }

  LoadSProducts(){
    firebase.database().ref('/sproducts')
      .on('value', (data: DataSnapshot) => {
          this.sproducts = data.val() ? data.val() : [];
          this.emitSProducts();
        }
      );
    this.nbrItems = this.sproducts.length;
  }

  getSProduct(id:string){

    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/sproducts/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  addNewSProduct(sproduct:SProduct) {
    this.sproducts.push(sproduct);
    this.saveSProducts();
    this.emitSProducts();
  }

  removeSProduct(sproduct:SProduct) {
    const IndexToRemove = this.sproducts.findIndex(
      (productEl) => {
        if(productEl === sproduct) {
          return true;
        }
      }
    );
    this.sproducts.splice(IndexToRemove, 1);
    this.saveSProducts();
    this.emitSProducts();
  }
}
