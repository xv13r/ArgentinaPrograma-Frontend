import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Social } from '../models/social.model';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class SocialService extends BaseService<Social> {
  constructor(private http: HttpClient) {
    super(
      http,
      Social,
      `socials`
    );
  }
}
