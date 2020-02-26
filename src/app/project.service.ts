import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import {Subject} from "rxjs";
import DataSnapshot = firebase.database.DataSnapshot;

export class Project {

  Description:string;
  Nom:string;
  Maitre:string;
  Architecte:string;
  Ville:string;
  link:string;


  constructor(Description: string, Nom: string, Maitre: string, Architecte: string, Ville: string,  link:string) {
    this.Description = Description;
    this.Nom = Nom;
    this.Maitre = Maitre;
    this.Architecte = Architecte;
    this.Ville = Ville;
    this.link = link;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects : Project[] = [];
  projectsSubject = new Subject<Project[]>();
  private nbrItems: number;


  emitProjects(){
    this.projectsSubject.next(this.projects);
  }

  saveProjects(){
    firebase.database().ref("/Projects").set(this.projects);
  }

  LoadProjects(){
    firebase.database().ref('/Projects')
      .on('value', (data: DataSnapshot) => {
          this.projects = data.val() ? data.val() : [];
          this.emitProjects();
        }
      );
    this.nbrItems = this.projects.length;
  }

  getProject(id:string){

    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/Projects/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  addNewProject(Project: Project) {
    this.projects.push(Project);
    this.saveProjects();
    this.emitProjects();
  }

  removeProject(Project: Project) {
    const IndexToRemove = this.projects.findIndex(
      (ProjectEl) => {
        if(ProjectEl === Project) {
          return true;
        }
      }
    );
    this.projects.splice(IndexToRemove, 1);
    this.saveProjects();
    this.emitProjects();
  }
}
