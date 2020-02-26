import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Poseur, PoseurService} from "../poseur.service";
import * as firebase from "firebase";

@Component({
  selector: 'app-poseur-list',
  templateUrl: './poseur-list.component.html',
  styleUrls: ['./poseur-list.component.css']
})
export class PoseurListComponent implements OnInit {
  Poseur:Poseur;
  Poseurs : Poseur[] ;
  PoseursSub : Subscription;
  demAjout =false;
  isExact = true;
  myform: FormGroup;
  name: string;
  constructor(private Poseurservice:PoseurService ,private formBuilder: FormBuilder,private router : Router) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.name = user.displayName;
        } else {
        }
      }
    );
    this.initForm();
    this.PoseursSub = this.Poseurservice.poseursSubject.subscribe((Poseurs:Poseur[])=>{
      this.Poseurs=Poseurs;
    });
    this.Poseurservice.LoadPoseurs();
    this.Poseurservice.emitPoseurs();

  }
  ngOnDestroy() {
    this.PoseursSub.unsubscribe();
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
      this.Poseur = new Poseur(code,{},nom,prenom);
      console.log(this.Poseur);
      this.Poseurservice.addNewPoseur(this.Poseur);
      this.router.navigate(['/Poseurs']);
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

//    this.router.navigate(['/Poseur', Code]);

  }

  delete(prod:Poseur) {
    this.Poseurservice.removePoseur(prod);
    this.router.navigate(['/Poseurs']);
  }
}
