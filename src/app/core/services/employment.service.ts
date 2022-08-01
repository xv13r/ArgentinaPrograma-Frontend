import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Employment } from '../models/employment.model';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class EmploymentService extends BaseService<Employment> {
  constructor(private http: HttpClient) {
    super(
      http,
      Employment,
      `employments`
    );
  }
}