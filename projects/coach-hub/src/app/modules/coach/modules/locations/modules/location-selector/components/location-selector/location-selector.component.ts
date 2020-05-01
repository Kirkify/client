import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { LocationsService } from '../../../../services/locations.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { LocationsQuery } from '../../../../state/locations.query';
import { LocationInterface } from '../../../../models/location.interface';
import { LocationDialogComponent } from '../location-dialog/location-dialog.component';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'ch-location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: [ './location-selector.component.scss' ],
  // Set this to default as we want the form control to react to the parent submit
  changeDetection: ChangeDetectionStrategy.Default
})
export class LocationSelectorComponent implements OnInit, OnDestroy {
  @Input() locationControl: AbstractControl;
  @Input() disabled = false;
  @Output() selected = new EventEmitter<number>();

  locations: LocationInterface[] = [];
  isLoading: Observable<boolean>;
  selectedLocation = new BehaviorSubject<LocationInterface>(null);
  private _subscriptions = new Subscription();

  constructor(
    private service: LocationsService,
    private query: LocationsQuery,
    private dialog: MatDialog
  ) {
  }


  getValue() {
    return JSON.stringify(this.locationControl.value);
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  ngOnInit() {
    if (this.disabled) {
      this.locationControl.disable();
    }

    this.isLoading = this.query.selectLoading().pipe(
      tap(loading => {
        if (loading) {
          this.locationControl.disable();
        } else {
          if (!this.disabled) {
            this.locationControl.enable();
          }
        }
      })
    );

    this._subscriptions.add(
      this.service.selectAll().subscribe()
    );

    this._subscriptions.add(
      this.query.selectAll().pipe(
        tap(locations => {
          if (locations.length) {
            this.locations = locations;
            if (!this.disabled) {
              this.locationControl.enable();
            }
            const defaultValue = this.locationControl.value;
            const location = locations.find(x => x.id === defaultValue);
            this.selectedLocation.next(location);
            this.sendSelectedEvent(location ? location.id : locations[ 0 ].id);
          }
        })
      ).subscribe()
    );
  }

  onSelectClicked() {
    if (this.locations.length === 0) {
      this.addLocation();
    }
  }

  addLocation() {
    if (this.locationControl && this.locationControl.disabled) {
      return;
    }

    this._subscriptions.add(
      this.dialog.open(LocationDialogComponent).afterClosed().pipe(
        tap(id => {
          this.sendSelectedEvent(id);
        })
      ).subscribe()
    );
  }

  onSelectChanged(ev: MatSelectChange) {
    this.sendSelectedEvent(ev.value);
  }

  sendSelectedEvent(id: number) {
    this.locationControl.setValue(id);
    this.selected.emit(id);
  }
}
