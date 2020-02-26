import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {Product, ProductsService} from "../products.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {
  isExact = false;
  product: Product;
  constructor(private productservice: ProductsService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.productservice.getProduct(id).then(
      (product: Product) => {
        this.product = product;
        this.isExact = (product.Gh === null)
      }
    );


}

  print() {

  }
}
