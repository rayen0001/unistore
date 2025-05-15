import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl = 'http://localhost:3000/images'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Upload multiple images for a product
  uploadBulkImages(productId: number, files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    return this.http.post(`${this.apiUrl}/bulk-upload/${productId}`, formData);
  }

  // Get all images for a product
  getImagesByProductId(productId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/product/${productId}`);
  }
}