import { NgModule } from '@angular/core';
import { LocationsRoutingModule } from './locations-routing.module';
import { CreateComponent } from './components/create/create.component';
import { AddressLocationModule } from '../../../../shared/modules/address-location/address-location.module';
import { FormFieldSpinnerModule } from '../../../../shared/modules/form-field-spinner/form-field-spinner.module';
import { EditComponent } from './components/edit/edit.component';
import { CommonModule } from '@angular/common';
import { SimpleLoaderModule } from '../../../../shared/modules/simple-loader/simple-loader.module';
import { SimpleMessageModule } from '../../../../shared/modules/simple-message/simple-message.module';
import { LocationFormModule } from './modules/location-form/location-form.module';
import { LocationsTableModule } from './modules/locations-table/locations-table.module';
import { MainComponent } from './components/main/main.component';
import { CrudModule } from '../../../../shared/modules/crud/crud.module';
import { ViewComponent } from './components/view/view.component';
import { SimpleRouterModule } from '../../../../shared/modules/simple-router/simple-router.module';

@NgModule({
  declarations: [
    MainComponent,
    CreateComponent,
    EditComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    LocationsRoutingModule,

    SimpleRouterModule,
    LocationFormModule,
    AddressLocationModule,
    CrudModule,
    FormFieldSpinnerModule,
    SimpleLoaderModule,
    SimpleMessageModule,
    LocationsTableModule,
  ]
})
export class LocationsModule {
}
