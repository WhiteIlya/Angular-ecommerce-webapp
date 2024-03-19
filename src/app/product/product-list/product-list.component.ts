import {Component, OnInit} from '@angular/core';
import { ProductService } from "../product.service";
import { Product } from "../../models/product";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  products: Product[] = []; //property
  //errorMessage: string = '';

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.authenticateAndGetProducts()
  }

  authenticateAndGetProducts():void {
    this.productService.authenticate('root', 'belka516').subscribe(response => {
      this.productService.setAuthToken(response.token);
      this.getProducts();
  });
  }

  getProducts(): void{
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }



}
