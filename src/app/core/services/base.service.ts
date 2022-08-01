import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { BaseModel } from '../models/base.model';

export abstract class BaseService<T extends BaseModel<T>> {
  private baseUrl!: String;

  constructor(
    private httpClient: HttpClient,
    private tConstructor: { new(m: Partial<T>, ...args: unknown[]): T },
    protected endpointUrl: String
  ) {
    this.baseUrl = environment.apiURL;
  }

  //GET: http://localhost:8080/api/profile/455/experience
  public getAllByProfileId(id: String): Observable<T[]> {
    return this.httpClient
      .get<T[]>(`${this.baseUrl}/profiles/${id}/${this.endpointUrl}`)
      .pipe(map((result) => result.map((i) => new this.tConstructor(i))));
  }

  //POST: http://localhost:8080/api/profile/455/experience
  public createByProfileId(id: String, resource: Partial<T> & { toJson: () => T }): Observable<T> {
    return this.httpClient
      .post<T>(`${this.baseUrl}/profiles/${id}/${this.endpointUrl}`, resource.toJson())
      .pipe(map((result) => new this.tConstructor(result)));
  }

  //GET: http://localhost:8080/api/profile/455/user
  public getByUserId(userId: String): Observable<T> {
    return this.httpClient
      .get<T>(`${this.baseUrl}/profiles/${userId}/user`)
      .pipe(map((result) => new this.tConstructor(result)));
  }

  //GET: http://localhost:8080/api/experience
  public getAll(): Observable<T[]> {
    return this.httpClient
      .get<T[]>(`${this.baseUrl}/${this.endpointUrl}`)
      .pipe(map((result) => result.map((i) => new this.tConstructor(i))));
  }

  //GET: http://localhost:8080/api/experience/455
  public getById(id: String): Observable<T> {
    return this.httpClient
      .get<T>(`${this.baseUrl}/${this.endpointUrl}/${id}`)
      .pipe(map((result) => new this.tConstructor(result)));
  }

  //POST: http://localhost:8080/api/profile
  public create(resource: Partial<T> & { toJson: () => T }): Observable<T> {
    console.log("resource");
    console.log(resource);
    console.log("end resource");
    return this.httpClient
      .post<T>(`${this.baseUrl}/${this.endpointUrl}`, resource.toJson())
      .pipe(map((result) => new this.tConstructor(result)));
  }

  //PUT: http://localhost:8080/api/experience/455
  public update(id: String, resource: Partial<T> & { toJson: () => T }): Observable<T> {
    return this.httpClient
      .put<T>(`${this.baseUrl}/${this.endpointUrl}/${id}`, resource.toJson())
      .pipe(map((result) => new this.tConstructor(result)));
  }

  //DELETE: http://localhost:8080/api/experience/455
  public delete(id: String): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.baseUrl}/${this.endpointUrl}/${id}`);
  }
}