import { Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Subject } from 'rxjs';

class Phone {
  constructor(public area: string, public exchange: string, public subscriber: string) { }
}

Phone.prototype.toString = function() {
  return this.area + this.exchange + this.subscriber;
};

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: PhoneInput}]
})
export class PhoneInput implements OnInit, OnDestroy, MatFormFieldControl<Phone>, ControlValueAccessor {

  static nextId = 0;

  @ViewChild('area', {static: false, read: ElementRef}) area: ElementRef;
  @ViewChild('exchange', {static: false, read: ElementRef}) exchange: ElementRef;
  @ViewChild('subscriber', {static: false, read: ElementRef}) subscriber: ElementRef;

  phone: FormGroup;

  autofilled: boolean;

  private _placeholder: string;
  private _required: boolean;
  private _disabled: boolean;

  @HostBinding() id = `app-phone-input-${PhoneInput.nextId++}`;
  @HostBinding('class.floating')
  get shouldLabelFloat() { return this.focused || !this.empty; }
  @HostBinding('attr.aria-describedby') describedBy = '';

  focused = false;
  controlType = 'phone-input';
  stateChanges = new Subject<void>();

  onChange = (_: any) => {};
  onTouched = () => {};

  @Input()
  get value(): Phone | null {
    const {area, exchange, subscriber} = this.phone.value;
    if (!!area || !!exchange || !!subscriber) { return new Phone(area, exchange, subscriber); }
    return null;
  }
  set value(phone: Phone | null) {
    phone = phone || new Phone('', '', '');
    this.phone.setValue({area: phone.area, exchange: phone.exchange, subscriber: phone.subscriber});
    this.stateChanges.next();
  }

  @Input()
  get placeholder(): string { return this._placeholder; }
  set placeholder(plh: string) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  @Input()
  get required(): boolean { return this._required; }
  set required(req: boolean) {
    this._required = req;
    this.stateChanges.next();
  }

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = value;
    if (this._disabled) { this.phone.disable(); } else { this.phone.enable(); }
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return  this.ngControl.errors !== null
      && this.phone.get('area').touched
      && this.phone.get('exchange').touched
      && this.phone.get('subscriber').touched;
  }

  get empty(): boolean {
    const {area, exchange, subscriber} = this.phone.value;
    return area.length === 0 && exchange.length === 0 && subscriber.length === 0;
  }

  constructor(@Optional() @Self() public ngControl: NgControl,
              private focusMonitor: FocusMonitor,
              private elRef: ElementRef<HTMLElement>) {
    this.phone = new FormGroup({
      area: new FormControl({value: '', disabled: this.disabled}),
      exchange: new FormControl({value: '', disabled: this.disabled}),
      subscriber: new FormControl({value: '', disabled: this.disabled})
    });

    this.focusMonitor.monitor(this.elRef.nativeElement, true).subscribe((origin: string) => {
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl != null) { this.ngControl.valueAccessor = this; }
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.stateChanges.complete();
    this.focusMonitor.stopMonitoring(this.elRef.nativeElement);
  }

  onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      if (this.area.nativeElement.value.length !== 3) { this.area.nativeElement.focus(); }
      else if (this.exchange.nativeElement.value.length !== 3) { this.exchange.nativeElement.focus(); }
      else { this.subscriber.nativeElement.focus(); }
    }
  }

  updateValue(): void {
    this.onChange(this.value);

    // pequeno hack para mostrar erros, quem nunca
    if (this.phone.untouched) { this.phone.markAllAsTouched(); }
  }

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(phone: Phone | null): void {
    this.value = phone;
  }

}
