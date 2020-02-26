import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product, ProductsService} from "../products.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent implements OnInit {
  myform: FormGroup;
  product:Product;
  constructor(private productservice:ProductsService,private router:Router,private formBuilder :FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.myform = this.formBuilder.group({
      name: ['', [Validators.required]],
      id: ['', [Validators.required]],
      description: ['', [Validators.required]],
      code: ['', [Validators.required]],
      categorie: ['', [Validators.required]],
      details: ['', [Validators.required]],
    });
  }

  onSubmit() {
  const name = this.myform.get('name').value;
  const description = this.myform.get('description').value;
  const id = this.myform.get('id').value;
  const code = this.myform.get('code').value;
  const details = this.myform.get('details').value;
    const categorie = ""
  // this.product = new Product(name,id,description,details,categorie,code);
  this.productservice.addNewProduct(this.product);
  this.router.navigate(['/Products']);
  }
}
