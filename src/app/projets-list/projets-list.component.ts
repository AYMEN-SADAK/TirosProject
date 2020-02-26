import { Component, OnInit } from '@angular/core';
import {Product, ProductsService} from "../products.service";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Project, ProjectService} from "../project.service";
import * as firebase from "firebase";


@Component({
  selector: 'app-projets-list',
  templateUrl: './projets-list.component.html',
  styleUrls: ['./projets-list.component.css']
})
export class ProjetsListComponent implements OnInit {
  project:Project;
  projects : Project[] ;
  projectsSub : Subscription;
  demAjout =false;
  isExact = true;
  myform: FormGroup;
  name : string;
  constructor(private projectservice:ProjectService ,private formBuilder: FormBuilder,private router : Router) { }

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
    this.projectsSub = this.projectservice.projectsSubject.subscribe((Projects:Project[])=>{
      this.projects=Projects;
    });
    this.projectservice.LoadProjects();
    this.projectservice.emitProjects();

  }
  ngOnDestroy() {
    this.projectsSub.unsubscribe();
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
    const Description = this.myform.get('Description').value;
    const nom = this.myform.get('nom').value;
    const mo = this.myform.get('mo').value;
    const ville = this.myform.get('city').value;
    const arch = this.myform.get('arch').value;
    const link = this.myform.get('link').value;

  if(this.myform.valid){
    this.project = new Project(Description,nom,mo,arch,ville,link);
    console.log(this.project);
    this.projectservice.addNewProject(this.project);
    this.router.navigate(['/Projets']);
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
      nom: ['', [Validators.required]],
      mo: ['', [Validators.required]],
      city: ['', [Validators.required]],
      arch: ['', [Validators.required]],
      link: [''],
    });
  }

  open(Description: any) {

      alert(" DropBox link : " + Description.link);

  }

  delete(prod:Project) {
    this.projectservice.removeProject(prod);
    this.router.navigate(['/Projets']);
  }
}
