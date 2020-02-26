import { Component, OnInit } from '@angular/core';
import {Product, ProductsService} from "../products.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-oneprodview',
  templateUrl: './oneprodview.component.html',
  styleUrls: ['./oneprodview.component.css']
})
export class OneprodviewComponent implements OnInit {

    isExact=true;
    product :Product;
    id;
  constructor(private productservice:ProductsService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
     this.id= this.route.snapshot.params.id;
    this.productservice.getProduct(this.id).then(
      (product: Product) => {
        this.product = product;
        this.isExact = (this.product.Gh !== undefined && this.product.Gh !== "" && this.product.Gh !== null)
      }
    );

  }

  print() {

    window.focus();
    window.print();
    window.close();
  }
}
