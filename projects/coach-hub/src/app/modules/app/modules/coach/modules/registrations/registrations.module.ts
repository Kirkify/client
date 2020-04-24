import { NgModule } from '@angular/core';
import { RegistrationsRoutingModule } from './registrations-routing.module';
import { RootComponent } from './root.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { CommonModule } from '@angular/common';
import { RegistrationFormModule } from './modules/registration-form/registration-form.module';
import { RegistrationsTableModule } from './modules/registrations-table/registrations-table.module';
import { MainComponent } from './components/main/main.component';
import { CrudModule } from '../../../../../../shared/modules/crud/crud.module';
import { ViewComponent } from './components/view/view.component';

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
        RegistrationsRoutingModule,
        RegistrationFormModule,
        CrudModule,
        RegistrationsTableModule,
    ]
})
export class RegistrationsModule { }
