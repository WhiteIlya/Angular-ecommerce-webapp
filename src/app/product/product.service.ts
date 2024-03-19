import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import { Product } from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl + "/item/";
  private authToken: string = '';

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    return this.http.post<any>(environment.apiUrl + "/api-token-auth/", credentials)
  }

  setAuthToken(token: string): void {
    this.authToken = token;
  }

  getProducts():Observable<Product[]> {
   // return this.http.get<Product[]>(this.apiUrl);
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Token ${this.authToken}`
    });
    return this.http.get<any>(this.apiUrl, {headers}).pipe(
      map(response => {
        return response.data.map((item: any) => {
          const attributes = item.attributes;
          return {
            id: item.id,
            name: attributes.title,
            price: attributes.price,
            stock: attributes.stock,
            image_url: attributes.image_url
          };
        });
      })
    );
  }
}
