import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Aluminium, AluService} from "../alu.service";
import * as firebase from "firebase";

@Component({
  selector: 'app-alu-list',
  templateUrl: './alu-list.component.html',
  styleUrls: ['./alu-list.component.css']
})
export class AluListComponent implements OnInit {

  aluminium:Aluminium;
  aluminiums : Aluminium[] ;
  aluminiumsSub : Subscription;
  demAjout =false;
  isExact = true;
  myform: FormGroup;
  name : string;
  constructor(private Aluminiumservice:AluService ,private formBuilder: FormBuilder,private router : Router) { }

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
    this.aluminiumsSub = this.Aluminiumservice.aluminiumsSubject.subscribe((Aluminiums:Aluminium[])=>{
      this.aluminiums=Aluminiums;
    });
    this.Aluminiumservice.LoadAluminiums();
    this.Aluminiumservice.emitAluminiums();

  }
  ngOnDestroy() {
    this.aluminiumsSub.unsubscribe();
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
    //const numero = this.myform.get('num').value;
    const numero = "AL00"+(this.aluminiums.length+1).toString();
    const ral = this.myform.get('ral').value;
    const gam = this.myform.get('gam').value;

    if(this.myform.valid){
      this.aluminium = new Aluminium(numero,ral,gam);
      console.log(this.aluminium);
      this.Aluminiumservice.addNewAluminium(this.aluminium);
      this.router.navigate(['/Aluminium']);
      this.myform.reset();
      this.demAjout=false;
    }
    else {
      alert("Remplissez tous les champs s'il vout plait !");
    }
  }
  private initForm() {
    this.myform = this.formBuilder.group({

      ral: ['', [Validators.required]],
      gam: ['', [Validators.required]]
    });
  }

  open(Code: number) {

//    this.router.navigate(['/Aluminium', Code]);

  }

  delete(prod:Aluminium) {
    this.Aluminiumservice.removeAluminium(prod);
    this.router.navigate(['/Aluminium']);
  }
}
