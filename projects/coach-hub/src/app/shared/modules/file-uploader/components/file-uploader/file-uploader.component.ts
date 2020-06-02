import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  SecurityContext,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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

  @Input('imageUrl')
  set imageUrl(value: string) {
    if (value) {
      this.imageSrcSubject.next(value);
    }
  }
  @ViewChild('fileUpload', { read: ElementRef }) fileUpload: ElementRef<HTMLInputElement>;
  onChange: any;
  file: File | null = null;
  imageSrcSubject = new BehaviorSubject<SafeResourceUrl>('');

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    const fileName = file.name;
    const reader = new FileReader();
    console.log(file.size);

    reader.onload = (e) => {
      if (typeof e.target.result === 'string') {
        // this.displayImage.nativeElement.src = e.target.result;
        // this.imageSrcSubject.next(e.target.result);

        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const elem = document.createElement('canvas');

          const width = 300;
          const scaleFactor = width / img.width;
          elem.width = width;
          elem.height = img.height * scaleFactor;

          const ctx = elem.getContext('2d');
          // img.width and img.height will contain the original dimensions
          ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);

          ctx.canvas.toBlob((blob) => {
            const file2 = new File([blob], fileName, {
              type: 'image/jpeg',
              lastModified: Date.now()
            });
            this.onChange(file2);
            this.file = file2;
            this.imageSrcSubject.next(
              this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob))
            );
            this.cdr.detectChanges();
          }, 'image/jpeg', 0.5);
        },
          reader.onerror = error => console.log(error);
      }
      // this.uploadedImage = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  constructor(
    private host: ElementRef<HTMLInputElement>,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {
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
    this.onChange('');
    this.imageSrcSubject.next('');
    this.cdr.detectChanges();
    // this.displayImage.nativeElement.src = '';
  }

  simulateFileUploadClick() {
    this.fileUpload.nativeElement.value = '';
    this.fileUpload.nativeElement.click();
  }
}
