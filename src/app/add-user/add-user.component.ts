import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {MauthentificationService} from "../mauthentification.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  AddForm: FormGroup;
  errorMessage: string;
  name;

  constructor(private formBuilder: FormBuilder,
              private mauthService: MauthentificationService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();

  }

  initForm() {
    this.AddForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }


  OnSubmit() {
    const email = this.AddForm.get('login').value+"@tiros.ma";
    const name = this.AddForm.get('name').value;

    const password = this.AddForm.get('password').value;
    this.mauthService.AjouterUtilisateur(email, password,name).then(
      () => {
        this.router.navigate(['/Products']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

}
