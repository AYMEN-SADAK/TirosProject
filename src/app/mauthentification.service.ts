import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class MauthentificationService {

  constructor() {
  }

    AjouterUtilisateur(email: string, password: string,name:string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            if(firebase.auth().currentUser){
              firebase.auth().currentUser.updateProfile({
                displayName: name,
                photoURL: "url"
            }).then(
                (s)=>{} // perform any other operation
              )}
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }

    );
  }

  setDisplays(name:string , img:string){

    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name,
      photoURL: img
    }).then(function() {
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    });

  }

  AuthentifierUtilisateur(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  FinConnexion() {
    firebase.auth().signOut();
  }
}

