import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgramFormComponent } from './program-form.component';
import { SimpleLoaderModule } from '../../../../../../../../shared/modules/simple-loader/simple-loader.module';
import { SimpleMessageModule } from '../../../../../../../../shared/modules/simple-message/simple-message.module';
import { LocationSelectorModule } from '../../../locations/modules/location-selector/location-selector.module';
import { TagsModule } from '../../../tags/tags.module';
import { RouterModule } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { PriceListComponent } from './components/price-list/price-list.component';
import { PriceGroupComponent } from './components/price-group/price-group.component';
import { QuestionsGeneratorComponent } from './components/questions-generator/questions-generator.component';
import { GeneralInfoComponent } from './components/general-info/general-info.component';
import { AddSpecificProgramTimesDialogComponent } from './components/add-specific-program-times-dialog/add-specific-program-times-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormCreatorModule } from '../../../../../../../../shared/modules/form-creator/form-creator.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { StickyHeaderModule } from '../../../../../../../../shared/modules/sticky-header/sticky-header.module';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    ProgramFormComponent,
    PriceListComponent,
    PriceGroupComponent,
    QuestionsGeneratorComponent,
    GeneralInfoComponent,
    AddSpecificProgramTimesDialogComponent
  ],
  exports: [
    ProgramFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    LocationSelectorModule,
    TagsModule,
    SimpleLoaderModule,
    SimpleMessageModule,
    StickyHeaderModule,
    FormCreatorModule,

    MatDividerModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatToolbarModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatCardModule,
    MatDialogModule
  ],
  entryComponents: [ AddSpecificProgramTimesDialogComponent ]
})
export class ProgramFormModule {
}
