import { NgModule } from '@angular/core';
import { ProgramsRoutingModule } from './programs-routing.module';
import { RootComponent } from './root.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { CommonModule } from '@angular/common';
import { ProgramFormModule } from './modules/program-form/program-form.module';
import { ProgramsTableModule } from './modules/programs-table/programs-table.module';
import { MainComponent } from './components/main/main.component';
import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { ViewComponent } from './components/view/view.component';
import { SimpleMessageModule } from '../../../../../../shared/modules/simple-message/simple-message.module';
import { SimpleLoaderModule } from '../../../../../../shared/modules/simple-loader/simple-loader.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CanDeactivateGuard } from '../../../../../../guards/can-deactivate/can-deactivate-guard.service';

@NgModule({
  declarations: [
    RootComponent,
    MainComponent,
    CreateComponent,
    EditComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    ProgramsRoutingModule,
    ProgramFormModule,
    CrudModule,
    ProgramsTableModule,
    SimpleMessageModule,
    SimpleLoaderModule,

    MatToolbarModule
  ],
  providers: [ CanDeactivateGuard ]
})
export class ProgramsModule {
}
