import { Component, OnInit } from '@angular/core';
import {Vitrage, VitrageService} from "../Vitrage.service";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import * as firebase from "firebase";

@Component({
  selector: 'app-vitrages-list',
  templateUrl: './vitrages-list.component.html',
  styleUrls: ['./vitrages-list.component.css']
})
export class VitragesListComponent implements OnInit {
  Vitrage:Vitrage;
  Vitrages : Vitrage[] ;
  VitragesSub : Subscription;
  demAjout =false;
  isExact = true;
  myform: FormGroup;
  name : string;
  constructor(private Vitrageservice:VitrageService ,private formBuilder: FormBuilder,private router : Router) { }

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
    this.VitragesSub = this.Vitrageservice.vitragesSubject.subscribe((Vitrages:Vitrage[])=>{
      this.Vitrages=Vitrages;
    });
    this.Vitrageservice.LoadVitrages();
    this.Vitrageservice.emitVitrages();

  }
  ngOnDestroy() {
    this.VitragesSub.unsubscribe();
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
    const numero =  "VITR00"+(this.Vitrages.length+1).toString();
    const type = this.myform.get('type').value;
    const fournisseur = this.myform.get('fourn').value;

    if(this.myform.valid){
      this.Vitrage = new Vitrage(numero,type,fournisseur);
      console.log(this.Vitrage);
      this.Vitrageservice.addNewVitrage(this.Vitrage);
      this.router.navigate(['/Vitrages']);
      this.myform.reset();
      this.demAjout=false;
    }
    else {
      alert("Remplissez tous les champs s'il vout plait !");
    }
  }
  private initForm() {
    this.myform = this.formBuilder.group({

      type: ['', [Validators.required]],
      fourn: ['', [Validators.required]]
    });
  }

  open(Code: number) {

//    this.router.navigate(['/Vitrage', Code]);

  }

  delete(prod:Vitrage) {
    this.Vitrageservice.removeVitrage(prod);
    this.router.navigate(['/Vitrages']);
  }
}
