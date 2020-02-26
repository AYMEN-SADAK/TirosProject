import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TirosProject';
  constructor(){
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyC_1kekl7xyzMUuapK9VCl7hwdbuc_Bo-8",
      authDomain: "tirosdatabase.firebaseapp.com",
      databaseURL: "https://tirosdatabase.firebaseio.com",
      projectId: "tirosdatabase",
      storageBucket: "",
      messagingSenderId: "785935463498",
      appId: "1:785935463498:web:6b76ada54960e5e2"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
