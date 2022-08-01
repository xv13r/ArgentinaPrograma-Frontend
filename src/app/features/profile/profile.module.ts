import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';

import { EducationsComponent } from '../components/educations/educations.component';
import { ExperiencesComponent } from '../components/experiences/experiences.component';
import { ExperienceFormComponent } from '../components/experiences/experience-form/experience-form.component';
import { EducationFormComponent } from '../components/educations/education-form/education-form.component';
import { FooterComponent } from '../components/footer/footer.component';
import { NavBarComponent } from '../components/navbar/navbar.component';
import { ProyectsComponent } from '../components/proyects/proyects.component';
import { SkillsComponent } from '../components/skills/skills.component';
import { AboutComponent } from '../components/about/about.component';
import { AvatarComponent } from '../components/avatar/avatar.component';
import { BannerComponent } from '../components/banner/banner.component'; 
import { ProfileComponent } from './profile.component';
import { SkillFormComponent } from '../components/skills/skill-form/skill-form.component';
import { ProyectFormComponent } from '../components/proyects/proyect-form/proyect-form.component';
import { AboutFormComponent } from '../components/about/about-form/about-form.component'; 
import { ProfileFormComponent } from '../components/profile-form/profile-form.component';
import { SectionFormComponent } from '../components/section-form/section-form.component';
import { FirstTimeFormComponent } from '../components/firsttime-form/firsttime-form.component';
import { EducationItemComponent } from '../components/educations/education-item/education-item.component';
import { ExperienceItemComponent } from '../components/experiences/experience-item/experience-item.component';
import { ProyectItemComponent } from '../components/proyects/proyect-item/proyect-item.component';
import { SkillItemComponent } from '../components/skills/skill-item/skill-item.component';
import { SocialFormComponent} from '../components/social/social-form/social-form.component'; 

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProfileComponent,
      },
      {
        path: 'firsttime',
        component: FirstTimeFormComponent,
      }
    ],
  }
];

@NgModule({
  declarations: [
    ProfileComponent,
    ExperiencesComponent,
    EducationsComponent,
    SkillsComponent,
    ProyectsComponent,
    AboutComponent,
    AvatarComponent,
    BannerComponent,
    NavBarComponent,
    FooterComponent,
    ExperienceFormComponent,
    EducationFormComponent,
    SkillFormComponent,
    ProyectFormComponent,
    AboutFormComponent,
    ProfileFormComponent,
    SectionFormComponent,
    FirstTimeFormComponent,
    EducationItemComponent,
    ExperienceItemComponent,
    ProyectItemComponent,
    SkillItemComponent,
    SocialFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})

export class ProfileModule { }