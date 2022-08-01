import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Experience } from '../models/experience.model';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class ExperienceService extends BaseService<Experience> {
  constructor(private http: HttpClient) {
    super(
      http,
      Experience,
      `experiences`
    );
  }
}
