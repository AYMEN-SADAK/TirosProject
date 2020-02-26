import { Component, OnInit } from '@angular/core';
import {Assemb, AssembService} from "../Assemb.service";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import * as firebase from "firebase";

@Component({
  selector: 'app-assemb',
  templateUrl: './assemb.component.html',
  styleUrls: ['./assemb.component.css']
})
export class AssembComponent implements OnInit {
  Assemb:Assemb;
  Assembs : Assemb[] ;
  AssembsSub : Subscription;
  demAjout =false;
  isExact = true;
  myform: FormGroup;
   name: string;
  constructor(private Assembservice:AssembService ,private formBuilder: FormBuilder,private router : Router) { }

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
    this.AssembsSub = this.Assembservice.AssembsSubject.subscribe((Assembs:Assemb[])=>{
      this.Assembs=Assembs;
    });
    this.Assembservice.LoadAssembs();
    this.Assembservice.emitAssembs();

  }
  ngOnDestroy() {
    this.AssembsSub.unsubscribe();
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
      this.Assemb = new Assemb(code,{},nom,prenom);
      console.log(this.Assemb);
      this.Assembservice.addNewAssemb(this.Assemb);
      this.router.navigate(['/Assembleurs']);
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

//    this.router.navigate(['/Assemb', Code]);

  }

  delete(prod:Assemb) {
    this.Assembservice.removeAssemb(prod);
    this.router.navigate(['/Assembleurs']);
  }
}
