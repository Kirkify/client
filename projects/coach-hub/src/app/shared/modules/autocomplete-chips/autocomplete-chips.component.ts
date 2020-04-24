import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { BehaviorSubject, combineLatest, merge, Observable, Subscription } from 'rxjs';
import { AutoCompleteChipInterface } from './models/auto-complete-chip.interface';
import { auditTime, debounceTime, mergeMap, tap, map, share } from 'rxjs/internal/operators';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'ch-autocomplete-chips',
  templateUrl: './autocomplete-chips.component.html',
  styleUrls: [ './autocomplete-chips.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteChipsComponent implements OnInit, OnDestroy {
  @ViewChild('autoCompleteInput') autoCompleteInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) autoTrigger: MatAutocompleteTrigger;

  /**
   * Whenever the selected items are updated an event of the selected items is emitted
   */
  @Output() selectedItemsUpdated = new EventEmitter();

  /**
   * Whenever the created items are updated an event of the created items is emitted
   */
  @Output() createdItemsUpdated = new EventEmitter();

  /**
   * Displayed value for the floating label
   */
  @Input() label = '';

  /**
   * Displayed value for the placeholder text
   */
  @Input() placeHolder = '';

  /**
   * How should items be displayed
   */
  @Input() displayFunc: (item: any) => string;

  /**
   * Should the add function be called when input is blurred
   */
  @Input() addOnBlur = false;

  /**
   * Can items which are not in the list be added on demand
   */
  @Input() canAddNewItems = false;

  /**
   * How should the FormField appear
   */
  @Input() appearance: MatFormFieldAppearance = 'standard';

  /**
   * Can the mat chips be selected
   */
  @Input() selectable = true;

  /**
   * Can a chip item be removed
   */
  @Input() removable = true;

  @Input() hasPadding = false;

  @Input() preSelectedItems: number[] | AutoCompleteChipInterface[] = [];

  /**
   * Codes which allow separators
   */
  separatorKeysCodes: number[] = [ ENTER, COMMA ];

  /**
   * Form Control related to the input
   */
  formCtrl = new FormControl('');

  /**
   * Items which are shown in the chip list
   */
  selectedItems: (AutoCompleteChipInterface|string)[] = [];

  /**
   * Items which are shown in the auto complete list
   */
  _filteredItemsSubject = new BehaviorSubject<AutoCompleteChipInterface[]>([]);
  get filteredItems$() {
    return this._filteredItemsSubject.asObservable();
  }

  private _subscriptions = new Subscription();

  /**
   * Is the component loading
   */
  private _isLoading = false;
  @Input()
  set isLoading(isLoading: boolean) {
    this._isLoading = isLoading;

    if (this._isLoading) {
      this._isDisabledSubject.next(true);
    } else {
      this._isDisabledSubject.next(false);
    }
  }

  get isLoading() {
    return this._isLoading;
  }

  private _isDisabledSubject = new BehaviorSubject<boolean>(false);

  get isDisabled$() {
    return this._isDisabledSubject.asObservable();
  }


  private _selectedItemsSubject = new BehaviorSubject<AutoCompleteChipInterface[]>([]);
  get selectedItems$() {
    return this._selectedItemsSubject.asObservable();
  }

  private _createdItemsSubject = new BehaviorSubject<string[]>([]);
  get createdItems$() {
    return this._createdItemsSubject.asObservable();
  }

  // The items passed in, which can then be filtered / selected
  private _allItems: AutoCompleteChipInterface[] = [];
  @Input()
  set allItems(allItems: AutoCompleteChipInterface[]) {
    this._allItems = allItems;

    if (this.preSelectedItems.length && allItems.length) {
      const items = this._allItems.filter(x => {
        for (const item of this.preSelectedItems) {
          if (typeof item === 'number') {
            if (x.id === item) {
              return true;
            }
          } else {
            if (x.id === item.id) {
              return true;
            }
          }
        }
      });

      if (items.length) {
        this.preSelectedItems = [];
        const selectedItems = this._selectedItemsSubject.value.concat(items);
        this._selectedItemsSubject.next(selectedItems);
      }
    }

    // console.error('CALLLLED');
    // this._filterItems();
  }

  /**
   * Function for displaying the items in the selected items list
   */
  filterIt(item: AutoCompleteChipInterface | string): string {
    if (typeof item === 'string') {
      return item;
    } else {
      return this.displayFunc(item);
    }
  }

  inputClicked() {
    if (!this.matAutocomplete.isOpen) {
      this.autoTrigger.openPanel();
    }
  }

  ngOnInit(): void {
    const formControlChanges = this.formCtrl.valueChanges.pipe(
      debounceTime(350)
    );

    const selectedItemChanges = combineLatest(
      this.selectedItems$.pipe(
        tap(items => {
          this.selectedItemsUpdated.emit(items);
        })
      ),
      this.createdItems$.pipe(
        tap(items => {
          this.createdItemsUpdated.emit(items);
        })
      )).pipe(
        tap(([selectedItems, createdItems]) => {
          // TODO: Here we can add sorting capabilities, ex: Alphabetical display
          const items = [ ...selectedItems, ...createdItems ];
          this.selectedItems = items;
        })
    );

    // Combine both into one, so that items are only filtered once
    this._subscriptions.add(
      merge(
        formControlChanges,
        selectedItemChanges
      ).pipe(
        auditTime(1),
        tap(() => {
          this._filterItems();
        })
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (this.canAddNewItems && !this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        const items = this._createdItemsSubject.value;
        this._createdItemsSubject.next(items.concat(value));
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }
    }
  }

  remove(item: AutoCompleteChipInterface | string): void {
    if (typeof item === 'string') {
      this._createdItemsSubject.next(this._createdItemsSubject.value.filter(x => x !== item));
    } else {
      this._selectedItemsSubject.next(this._selectedItemsSubject.value.filter(x => x !== item));
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.value;
    this._selectedItemsSubject.next([ ...this._selectedItemsSubject.value, value ]);
    this.autoCompleteInput.nativeElement.value = '';
  }

  private _filterText(text: string): AutoCompleteChipInterface[] {
    return this._allItems.filter(item => this.displayFunc(item).toLowerCase().indexOf(text.toLowerCase()) !== -1);
  }

  private _filterItems() {
    let filterText = '';
    if (typeof this.formCtrl.value === 'string') {
      filterText = this.formCtrl.value;
    }
    const filteredItems = [];
    const allItems = this._filterText(filterText);

    for (const item of allItems) {
      if (!this._selectedItemsSubject.value.some(selectedItem => selectedItem.id === item.id)) {
        filteredItems.push(item);
      }
    }
    this._filteredItemsSubject.next(filteredItems);
  }
}
