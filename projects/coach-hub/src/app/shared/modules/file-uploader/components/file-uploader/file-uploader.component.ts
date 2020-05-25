import { Component, OnInit, ChangeDetectionStrategy, Input, HostListener, ElementRef, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ch-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // useExisting: FileUploaderComponent,
      useExisting: forwardRef(() => FileUploaderComponent),
      multi: true
    }
  ]
})
export class FileUploaderComponent implements ControlValueAccessor {

  @Input() progress;
  _imageUrl: string;
  get imageUrl(): string {
    return this._imageUrl;
  }

  @Input('imageUrl')
  set imageUrl(value: string) {
    this._imageUrl = value;
    console.log('setting image');
  }
  @ViewChild('displayImage', { read: ElementRef }) displayImage: ElementRef<HTMLImageElement>;
  @ViewChild('fileUpload', { read: ElementRef }) fileUpload: ElementRef<HTMLInputElement>;
  onChange: any;
  file: File | null = null;
  imageHidden = new BehaviorSubject<boolean>(true);

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
    console.log(this.file);

    const reader = new FileReader();

    reader.onload = (e) => {
      if (typeof e.target.result === 'string') {
        this.imageHidden.next(false);
        this.displayImage.nativeElement.src = e.target.result;
      }
      // this.uploadedImage = e.target.result;
    };

    reader.readAsDataURL(this.file);
  }

  constructor( private host: ElementRef<HTMLInputElement> ) {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  removeImage() {
    this.host.nativeElement.value = '';
    this.file = null;
    this.imageHidden.next(true);
    this.displayImage.nativeElement.src = '';
  }

  simulateFileUploadClick() {
    this.fileUpload.nativeElement.value = '';
    this.fileUpload.nativeElement.click();
  }
}
