import { Component, OnInit } from '@angular/core';
import {Vitrage, VitrageService} from "../vitrage.service";
import {Aluminium, AluService} from "../alu.service";
import {AllServService, Vitreur} from "../all-serv.service";
import {Project, ProjectService} from "../project.service";
import {Poseur, PoseurService} from "../poseur.service";
import {Subscription} from "rxjs";
import {Product, ProductsService} from "../products.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SProduct, SProductsService} from "../sproducts.service";

@Component({
  selector: 'app-sproduct',
  templateUrl: './sproduct.component.html',
  styleUrls: ['./sproduct.component.css']
})
export class SproductComponent implements OnInit {


  projects:Project[];
  projectsSub:Subscription;
  product:SProduct;
  products : SProduct[] ;
  productsSub : Subscription;
  demAjout =false;
  isExact = true;
  myform: FormGroup;
  currentId: number;

  constructor(private productservice:SProductsService
    ,private projetservice:ProjectService
    ,private formBuilder: FormBuilder,private router : Router) { }

  ngOnInit() {
    this.initForm();
    this.productsSub = this.productservice.sproductsSubject.subscribe((products:Product[])=>{
      this.products=products;
    });
    this.productservice.LoadSProducts();

    this.productservice.emitSProducts();


    this.projectsSub = this.projetservice.projectsSubject.subscribe((projects:Project[])=>{
      this.projects = projects ;
    });
    this.projetservice.LoadProjects();
    this.projetservice.emitProjects();

  }
  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }

  add() {
    this.demAjout=!this.demAjout ;
  }

  dem() {
    this.demAjout=true;
  }

  annuller() {
    this.myform.reset();
    this.demAjout=false;
  }

  choseExact() {
    this.isExact = true;
  }

  choseNExact() {
    this.isExact = false;
  }

  onSubmit() {
    const Description = this.myform.get('Description').value;
    const ref = this.myform.get('ref').value;
    const projet = this.myform.get('projet').value;
    const date = this.myform.get('date').value;
    const larg = this.myform.get('larg').value;
    const long = this.myform.get('long').value;


    if(this.myform.valid){
      console.log(this.myform.get('date').value);
      this.product = new SProduct(Description,ref,projet,date,long,larg);
      console.log(this.product);
      this.productservice.addNewSProduct(this.product);
      this.router.navigate(['/Sous-Produits']);
      this.myform.reset();
      this.demAjout=false;
    }
    else {
      alert("Remplissez tous les champs s'il vout plait !");
    }
  }
  private initForm() {
    this.myform = this.formBuilder.group({
      Description: ['', [Validators.required]],
      ref: ['', [Validators.required]],
      projet: ['', [Validators.required]],
      date: ['', [Validators.required]],
      larg: ['', [Validators.required]],
      long: ['', [Validators.required]],
    });
  }


  delete(prod:SProduct) {
    this.productservice.removeSProduct(prod);
    this.router.navigate(['/Sous-Produits']);
  }



}
