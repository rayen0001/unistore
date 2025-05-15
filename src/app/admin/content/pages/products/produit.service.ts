import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Produit } from './produit.model';

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  private apiUrl = 'http://localhost:3000/produits'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Get all produits
  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl);
  }

  // Get a single produit by ID
  getProduit(id: number): Observable<Produit> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Create a new produit
  createProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.apiUrl, produit);
  }

  // Update a produit
  updateProduit(id: number, produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}/${id}`, produit);
  }

  // Delete a produit
  deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
   getProduitByCategory(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/category/${id}`);
  }
}