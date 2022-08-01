import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Proyect } from '../models/proyect.model';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class ProyectService extends BaseService<Proyect> {
  constructor(private http: HttpClient) {
    super(
      http,
      Proyect,
      `proyects`
    );
  }
}
