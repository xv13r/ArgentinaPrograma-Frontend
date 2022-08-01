import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal, NgbCarouselConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NavSocialComponent } from './components/nav/social/social.component';
import { CardEpochComponent } from './components//card/epoch/epoch.component';
import { CardFormComponent } from './components/card/form/form.component';
import { CardConfirmComponent } from './components/card/confirm/confirm.component';
import { CardContainerComponent } from './components/card/container/container.component';
import { CardImagesComponent } from './components/card/images/images.component';
import { CardItemComponent } from './components/card/item/item.component';
import { CardProgressComponent } from './components/card/progress/progress.component';
import { CardTitleComponent } from './components/card/title/title.component';
import { InputComponent } from './components/form/inputs/input/input.component';
import { InputButtonComponent } from './components/input/button/button.component';
import { InputDatePickerComponent } from './components/input/datepicker/datepicker.component';
import { InputFileComponent } from './components/input/file/file.component';
import { InputFilesComponent } from './components/input/files/files.component';
import { InputSelectComponent } from './components/input/select/select.component';
import { CustomDatePipe } from './pipes/customDate.pipe';
import { InputTextComponent } from './components/input/text/text.component';

export const componentsTo = [
  NavSocialComponent,
  CardEpochComponent,
  CardFormComponent,
  CardConfirmComponent,
  CardContainerComponent,
  CardImagesComponent,
  CardItemComponent,
  CardProgressComponent,
  CardTitleComponent,
  InputComponent,
  InputButtonComponent,
  InputDatePickerComponent,
  InputFileComponent,
  InputFilesComponent,
  InputSelectComponent,
  InputTextComponent
];

@NgModule({
  declarations: [...componentsTo, CustomDatePipe ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule,
    NgbModule,
    NgCircleProgressModule.forRoot({
      backgroundOpacity: 1,
      backgroundStrokeWidth: 0,
      backgroundPadding: 0,
      innerStrokeColor: "#0d6efd",
      radius: 80,
      space: -1,
      toFixed: 1,
      maxPercent: 100,
      unitsFontSize: "20",
      outerStrokeColor: "#555",
      outerStrokeWidth: 10,
      outerStrokeLinecap: "butt",
      innerStrokeWidth: 10,
      subtitleFontSize: "60",
      subtitleFontWeight: "600",
      showBackground: false,
      animationDuration:1500,
      responsive: false})
  ],
  providers: [NgbActiveModal, NgbCarouselConfig],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgCircleProgressModule,
    FontAwesomeModule,
    ...componentsTo,
    ]
})
export class SharedModule { }