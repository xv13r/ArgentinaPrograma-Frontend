import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UploadService {
  baseUrl = environment.apiURL;
  headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
  
  constructor(private http: HttpClient) { }

  public upload(file: File): Observable<File> {
    const formData: FormData = new FormData();
    formData.append('file', file);
     return this.http
     .post<File>(`${this.baseUrl}/upload`, formData);
  }

  public getById(id: String): Observable<any> {
    return this.http.get(`${this.baseUrl}/files/${id}`, { responseType: "blob" });
  }

  public getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}
