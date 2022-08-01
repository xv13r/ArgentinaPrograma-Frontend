import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user.model';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService<User> {
  constructor(private http: HttpClient) {
    super(
      http,
      User,
      `users`
    );
  }
}
