import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-navb',
  templateUrl: './navb.component.html',
  styleUrls: ['./navb.component.css']
})
export class NavbComponent implements OnInit {
   isConnected: boolean;

  constructor() { }

  ngOnInit() {
      firebase.auth().onAuthStateChanged(
        (user) => {
          if(user) {
            this.isConnected = true;
          } else {
            this.isConnected = false;
          }
        }
      );
  }

}
