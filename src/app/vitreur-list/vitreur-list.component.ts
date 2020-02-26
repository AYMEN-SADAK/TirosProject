import { Component, OnInit } from '@angular/core';
import {Product, ProductsService} from "../products.service";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AllServService, Vitreur} from "../all-serv.service";
import * as firebase from "firebase";

@Component({
  selector: 'app-vitreur-list',
  templateUrl: './vitreur-list.component.html',
  styleUrls: ['./vitreur-list.component.css']
})
export class VitreurListComponent implements OnInit {
  vitreur:Vitreur;
  vitreurs : Vitreur[] ;
  vitreursSub : Subscription;
  demAjout =false;
  isExact = true;
  myform: FormGroup;
  name : string;
  constructor(private vitreurservice:AllServService ,private formBuilder: FormBuilder,private router : Router) { }

  ngOnInit() {
    this.initForm();
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.name = user.displayName;
        } else {
        }
      }
    );
    this.vitreursSub = this.vitreurservice.vitreursSubject.subscribe((vitreurs:Vitreur[])=>{
      this.vitreurs=vitreurs;
    });
    this.vitreurservice.LoadVitreurs();
    this.vitreurservice.emitVitreurs();

  }
  ngOnDestroy() {
    this.vitreursSub.unsubscribe();
  }

  add() {
    this.demAjout=!this.demAjout ;
  }

  dem() {
    this.demAjout=true;
  }

  annuller() {
    this.demAjout=false;
  }

  choseExact() {
    this.isExact = true;
  }

  choseNExact() {
    this.isExact = false;
  }

  onSubmit() {
    const code = this.myform.get('code').value;
    const nom = this.myform.get('nom').value;
    const prenom = this.myform.get('prenom').value;

    if(this.myform.valid){
      this.vitreur = new Vitreur(code,{},nom,prenom);
      console.log(this.vitreur);
      this.vitreurservice.addNewVitreur(this.vitreur);
      this.router.navigate(['/Vitreurs']);
      this.myform.reset();
      this.demAjout=false;
    }
    else {
      alert("Remplissez tous les champs s'il vout plait !");
    }
  }
  private initForm() {
    this.myform = this.formBuilder.group({
      code: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]]
    });
  }

  open(Code: number) {

//    this.router.navigate(['/Vitreur', Code]);

  }

  delete(prod:Vitreur) {
    this.vitreurservice.removeVitreur(prod);
    this.router.navigate(['/Vitreurs']);
  }
}
