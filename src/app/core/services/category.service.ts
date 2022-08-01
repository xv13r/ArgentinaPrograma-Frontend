import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Category } from '../models/category.model';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class CategoryService extends BaseService<Category> {
  constructor(private http: HttpClient) {
    super(
      http,
      Category,
      `categories`
    );
  }
}
