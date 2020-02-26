import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import {Subject} from "rxjs";
import DataSnapshot = firebase.database.DataSnapshot;


export class Product {
  Description:string;
  Ref:string;
  ProjectId:string;
  VitrageId:string;
  AluId:string;
  Poseurs:any;
  Vitreurs:any;
  Assembleurs:any;
  Date:string;
  Loc:string;
  Im:string;
  Etage:string;
  Gh:string;
  Longueur:string ;
  Largeur:string;
  SProducts:any;
  link:string;
  quantite: string;
  DateV: string;
  DateP: string;
  DateAss: string;

  constructor(Description: string, Ref: string, ProjectId: string, VitrageId: string, AluId: string, Poseurs: any, Vitreurs: any, Assembs: any, Date: string,Loc:string,Im:string,Etage:string,Gh:string,Longueur:string,Largeur:string,SProducts:any,link:string,quantite: string, DateV: string, DateP: string, DateAss: string) {
    this.Description = Description;
    this.Ref = Ref;
    this.ProjectId = ProjectId;
    this.VitrageId = VitrageId;
    this.AluId = AluId;
    this.Poseurs = Poseurs;
    this.Vitreurs = Vitreurs;
    this.Assembleurs = Assembs
    this.Date = Date;
    this.DateV = DateV;
    this.DateP = DateP;
    this.DateAss = DateAss;
    this.Loc = Loc;
    this.Im = Im ;
    this.Etage = Etage ;
    this.Gh = Gh;
    this.Largeur=Largeur;
    this.Longueur=Longueur;
    this.SProducts=SProducts;
    this.link = link;
    this.quantite = quantite;
  }

}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  nbrItems=0;
 products : Product[] = [];
 productsSubject = new Subject<Product[]>();


emitProducts(){
  this.productsSubject.next(this.products);
}

saveProducts(){
  firebase.database().ref("/products").set(this.products);
}

  LoadProducts(){
    firebase.database().ref('/products')
      .on('value', (data: DataSnapshot) => {
          this.products = data.val() ? data.val() : [];
          this.emitProducts();
        }
      );
    this.nbrItems = this.products.length;
  }



  getProduct(id:string){

  return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/products/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  addNewProduct(product: Product) {
    this.products.push(product);
    this.saveProducts();
    this.emitProducts();
  }

  removeProduct(product: Product) {
    const IndexToRemove = this.products.findIndex(
      (productEl) => {
        if(productEl === product) {
          return true;
        }
      }
    );
    this.products.splice(IndexToRemove, 1);
    this.saveProducts();
    this.emitProducts();
  }
}
