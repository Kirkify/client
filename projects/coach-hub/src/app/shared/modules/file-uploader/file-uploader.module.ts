import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    FileUploaderComponent
  ],
  exports: [
    FileUploaderComponent
  ],
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule
  ]
})
export class FileUploaderModule { }
