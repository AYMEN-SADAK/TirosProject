import { Component, OnInit } from '@angular/core';
import {Product, ProductsService} from "../products.service";
import {Subject, Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Project, ProjectService} from "../project.service";
import {AllServService, Vitreur} from "../all-serv.service";
import {Aluminium, AluService} from "../alu.service";
import {Vitrage, VitrageService} from "../vitrage.service";
import {Poseur, PoseurService} from "../poseur.service";
import {SProduct, SProductsService} from "../sproducts.service";
import * as firebase from "firebase";
import {Assemb, AssembService} from "../assemb.service";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  vitrages:Vitrage[];
  aluminiums:Aluminium[];
  vitreurs:Vitreur[];
  projects:Project[];
  poseurs:Poseur[];assembleurs:Assemb[];
  vitragesSub:Subscription;
  aluminiumsSub:Subscription;
  vitreursSub:Subscription;
  projectsSub:Subscription;
  poseursSub:Subscription; assembleursSub:Subscription;
  product:Product;
  products : Product[] ;
  productsDB : Product[] ;
  productsSub : Subscription;
  sproducts : SProduct[] ;
  sproductsSub : Subscription;
  demAjout =false;
  isExact = true;
  myform: FormGroup;
  currentId: number;
  i=['n'];
  v=['n'];
  a=['n'];
  p=['n'];
  sprod=[];
  listvitreurs = [];
  listposeurs = [];
  listassembs = [];
  name : string;
  tri='d';
  private loaded = false;
  curDate=new Date();

  constructor(private productservice:ProductsService,
  private sproductservice:SProductsService
    ,private aluservice:AluService
    ,private vitrageservice:VitrageService
    ,private vitreurservice:AllServService,private assembleurservice:AssembService
    ,private poseurservice:PoseurService
    ,private projetservice:ProjectService
              ,private formBuilder: FormBuilder,private router : Router) { }

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
    this.productsSub = this.productservice.productsSubject.subscribe((products:Product[])=>{
      this.productsDB = [...products];
      this.products=products;
      if (this.tri === 'd')
      this.triDate();
      if (this.tri === 'p')
        this.triProjet();
      if (this.tri === 'r')
        this.triRef();

    });
  this.productservice.LoadProducts();

  this.productservice.emitProducts();

    this.sproductsSub = this.sproductservice.sproductsSubject.subscribe((sproducts:SProduct[])=>{
      this.sproducts=sproducts;
    });
    this.sproductservice.LoadSProducts();

    this.sproductservice.emitSProducts();

  this.projectsSub = this.projetservice.projectsSubject.subscribe((projects:Project[])=>{
    this.projects = projects ;
  });
    this.projetservice.LoadProjects();
    this.projetservice.emitProjects();


    this.vitragesSub = this.vitrageservice.vitragesSubject.subscribe((vitrages:Vitrage[])=>{
    this.vitrages = vitrages ;
  });
    this.vitrageservice.LoadVitrages();
    this.vitrageservice.emitVitrages();

    this.assembleursSub = this.assembleurservice.AssembsSubject.subscribe((assembleurs:Assemb[])=>{
    this.assembleurs = assembleurs ;
  });
    this.assembleurservice.LoadAssembs();
    this.assembleurservice.emitAssembs();

    this.poseursSub = this.poseurservice.poseursSubject.subscribe((poseurs:Poseur[])=>{
    this.poseurs = poseurs ;
  });
    this.poseurservice.LoadPoseurs();
    this.poseurservice.emitPoseurs();


    this.vitreursSub = this.vitreurservice.vitreursSubject.subscribe((vitreurs:Vitreur[])=>{
    this.vitreurs = vitreurs ;
  });
    this.vitreurservice.LoadVitreurs();
    this.vitreurservice.emitVitreurs();


this.aluminiumsSub = this.aluservice.aluminiumsSubject.subscribe((aluminiums:Aluminium[])=>{
    this.aluminiums = aluminiums ;
  });
    this.aluservice.LoadAluminiums();
    this.aluservice.emitAluminiums();

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
   // const ref = this.myform.get('ref').value;
    const ref = "PR00"+(this.products.length+1).toString();
    //const vitreur = this.myform.get('vitreur').value;
    const vitrage = this.myform.get('vitrage').value;
    // const ass = this.myform.get('ass').value;
    const projet = this.myform.get('projet').value;
   // const  poseur= this.myform.get('poseur').value;
    const date = this.myform.get('date').value;
    const dateP = this.myform.get('dateP').value;
    const dateV = this.myform.get('dateV').value;
    const dateAss = this.myform.get('dateAss').value;
    const alu = this.myform.get('alu').value;
    const larg = this.myform.get('larg').value;
    const long = this.myform.get('long').value;
    const exact = this.myform.get('exact').value;
    const nexact = this.myform.get('nexact').value;
    const loc = this.myform.get('loc').value;
    const im = this.myform.get('im').value;
    const etage = this.myform.get('etage').value;
    const gh = this.myform.get('gh').value;
    const link = this.myform.get('link').value;
    const quantite = this.myform.get('quantite').value;


    for (let a = 0; a < 7; a++){
     // console.log(this.myform.get('sproduct'+a).value);console.log(this.myform.get('Nsprod'+a).value);
      this.sprod.push({ref : this.myform.get('sproduct'+a).value , nbr : this.myform.get('Nsprod'+a).value});
      this.listvitreurs.push(this.myform.get('vitreur'+a).value);
      this.listposeurs.push(this.myform.get('poseur'+a).value);
      this.listassembs.push(this.myform.get('ass'+a).value);
    }
    if(this.myform.valid){
    //console.log(this.myform.get('date').value);
    this.product = new Product(Description,ref,projet,vitrage,alu,this.listposeurs,this.listvitreurs,this.listassembs,date,loc,im,etage,gh,long,larg,this.sprod,link,quantite,dateV,dateP,dateAss);
    //console.log(this.product);
    this.productservice.addNewProduct(this.product);
    this.router.navigate(['/Products']);
    this.myform.reset();
    this.demAjout=false;
  }
  else {
    alert("Remplissez tous les champs s'il vout plait !");
    }
  }
  private initForm() {
    this.myform = this.formBuilder.group({
     Description: [''],
      quantite: [''],
      link: [''],
      vitreur0: [''],vitreur1: [''],vitreur2: [''],vitreur3: [''],vitreur4: [''],vitreur5: [''],vitreur6: [''],
      vitrage: [''],
      ass0: [''],ass1: [''],ass2: [''],ass3: [''],ass4: [''],ass5: [''],ass6: [''],
      projet: [''],
     poseur0: [''],poseur1: [''],poseur2: [''],poseur3: [''],poseur4: [''],poseur5: [''],poseur6: [''],
      date: [''],
      dateV: [''],
      dateP: [''],
      dateAss: [''],
      alu: [''],
      larg: [''],
      long: [''],
      exact: ['' ],
      nexact: ['',],
      loc: ['',],
      im: ['',],
      etage: ['',],
      gh: ['',],
      sproduct0: [''],sproduct1: [''], sproduct2: [''], sproduct3: [''], sproduct4: [''], sproduct5: [''], sproduct6: ['']
      ,Nsprod0: [''],Nsprod1: [''], Nsprod2: [''], Nsprod3: [''], Nsprod4: [''], Nsprod5: [''], Nsprod6: [''],



    });
  }

  open(ref) {
  var ind;
  var i=0;
    for (let product of this.productsDB){
      if (product.Ref === ref){
          ind = i;
      }
    i++;
    }

    this.router.navigate(['/product', ind]);

  }

  delete(prod:Product) {
    this.productservice.removeProduct(prod);
    this.router.navigate(['/Products']);
  }


  print(i: number) {
   this.currentId=i;

  }

  adds() {
    this.i.push('n');
  }

  addv() {
    this.v.push('n');
  }

  adda() {
    this.a.push('n');
  }

  addp() {
    this.p.push('n');
  }

  getarray(n: string): any[] {
    return Array(Number(n));
  }

  triDate() {
    this.tri='d';
    this.products.sort((a, b) => (a.Date < b.Date) ? 1 : -1);
    console.log( this.productsDB);
    console.log(this.products)
  }

  triRef() {
    this.tri='r';
    this.products.sort((a, b) => (a.Ref > b.Ref) ? 1 : -1);
    console.log(this.productsDB);
    console.log(this.products)
  }

  triProjet() {
    this.tri='p';
    this.products.sort((a, b) => (a.ProjectId > b.ProjectId) ? 1 : -1);
    console.log(this.productsDB);
    console.log(this.products)

  }
}
