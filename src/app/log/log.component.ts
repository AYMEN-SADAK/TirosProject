import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MauthentificationService} from "../mauthentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  AuthForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private mauthService: MauthentificationService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.AuthForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  OnSubmit() {
    const email = this.AuthForm.get('login').value+"@tiros.ma";
    const password = this.AuthForm.get('password').value;

    this.mauthService.AuthentifierUtilisateur(email, password).then(
      () => {
        this.router.navigate(['/Home']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }


}


