import { Component, OnInit } from '@angular/core';
import {MauthentificationService} from "../mauthentification.service";
import * as firebase from "firebase";

@Component({
  selector: 'app-usersession',
  templateUrl: './usersession.component.html',
  styleUrls: ['./usersession.component.css']
})
export class UsersessionComponent implements OnInit {

  User ;
  state ;
  name;

  isConnected: boolean;

  constructor(private authService: MauthentificationService) { }

  ngOnInit() {


    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isConnected = true;
          this.name = user.displayName;
        } else {
          this.isConnected = false;
        }
      }
    );



  }
  


  disconnect() {
    this.authService.FinConnexion();
  }
}
