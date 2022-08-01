import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Education } from '../models/education.model';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class EducationService extends BaseService<Education> {
  constructor(private http: HttpClient) {
    super(
      http,
      Education,
      `educations`
    );
  }
}
