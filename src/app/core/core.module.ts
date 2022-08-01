import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PreventImportGuard } from './guards/prevent-import-guard';
import { RouterModule } from '@angular/router';

import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';
import { ExperienceService } from './services/experience.service';
import { EducationService } from './services/education.service';
import { SkillService } from './services/skill.service';
import { ProyectService } from './services/proyect.service';
import { SessionService } from './services/session.service';
import { CategoryService } from './services/category.service';
import { EmploymentService } from './services/employment.service';
import { UserService } from './services/user.service';
import { UploadService } from './services/file.service';


@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    RouterModule
  ],
  providers: [
    AuthService,
    SessionService,
    CategoryService,
    EmploymentService,
    UserService,
    ProfileService,
    ExperienceService,
    EducationService,
    SkillService,
    ProyectService,
    UploadService
  ]
})
export class CoreModule {
  constructor(@SkipSelf() @Optional() parentModule: CoreModule) {
    PreventImportGuard(parentModule, 'CoreModule');
  }
}