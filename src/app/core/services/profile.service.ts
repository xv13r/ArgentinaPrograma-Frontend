import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Profile } from '../models/profile.model';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class ProfileService extends BaseService<Profile> {
  constructor(private http: HttpClient) {
    super(
      http,
      Profile,
      `profiles`
    );
  }
}
