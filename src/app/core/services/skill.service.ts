import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Skill } from '../models/skill.model';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class SkillService extends BaseService<Skill> {
  constructor(private http: HttpClient) {
    super(
      http,
      Skill,
      `skills`
    );
  }
}
