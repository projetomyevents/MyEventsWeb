import {
  Component,
  DoCheck,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Subject } from 'rxjs';
import { Phone } from '../../shared/phone.model';


@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: PhoneInput}],
})
export class PhoneInput implements OnInit, OnDestroy, DoCheck, ControlValueAccessor, MatFormFieldControl<Phone> {

  static nextId = 0;

  @ViewChild('area', {static: false, read: ElementRef}) area: ElementRef;
  @ViewChild('exchange', {static: false, read: ElementRef}) exchange: ElementRef;
  @ViewChild('subscriber', {static: false, read: ElementRef}) subscriber: ElementRef;

  phone: FormGroup;

  focused: boolean;
  autofilled: boolean;
  errorState: boolean;

  controlType = 'phone-input';
  stateChanges = new Subject<void>();

  @HostBinding() id = `app-phone-input-${PhoneInput.nextId++}`;
  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }
  @HostBinding('attr.aria-describedby') describedBy = '';

  constructor(@Optional() @Self() public ngControl: NgControl,
              private focusMonitor: FocusMonitor,
              private elRef: ElementRef<HTMLElement>) {
    this.phone = new FormGroup({
      area: new FormControl({value: '', disabled: this.disabled}),
      exchange: new FormControl({value: '', disabled: this.disabled}),
      subscriber: new FormControl({value: '', disabled: this.disabled}),
    });

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    this.focusMonitor.monitor(this.elRef.nativeElement, true).subscribe((origin: string) => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }


  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(dis: boolean) {
    this._disabled = dis;
    if (dis) {
      this.phone.disable();
    } else {
      this.phone.enable();
    }
    this.stateChanges.next();
  }
  private _disabled: boolean;

  get empty(): boolean {
    const {area, exchange, subscriber} = this.phone.value;
    return area.length === 0 && exchange.length === 0 && subscriber.length === 0;
  }

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(plh: string) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(req: boolean) {
    this._required = req;
    this.stateChanges.next();
  }
  private _required: boolean;

  @Input()
  get value(): Phone | null {
    const {area, exchange, subscriber} = this.phone.value;
    return !!area || !!exchange || !!subscriber ? new Phone(area, exchange, subscriber) : null;
  }
  set value(phone: Phone | null) {
    phone = phone || new Phone('', '', '');
    this.phone.setValue({area: phone.area, exchange: phone.exchange, subscriber: phone.subscriber});
    this.stateChanges.next();
  }

  onChange = (_: any) => {};
  onTouched = () => {};

  onAnyInputChange(value?: string, length?: string, nextInput?: any): void {
    this.onChange(this.value);
    if (value && nextInput && value.length === Number(length)) {
      nextInput.focus();
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
    this.focusMonitor.stopMonitoring(this.elRef.nativeElement);
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      this.errorState = this.ngControl.invalid && this.ngControl.touched;
      this.stateChanges.next();
    }
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

  writeValue(value: any): void {
    this.value = value;
  }

  onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      if (this.area.nativeElement.value.length !== 3) {
        this.area.nativeElement.focus();
      } else if (this.exchange.nativeElement.value.length !== 3) {
        this.exchange.nativeElement.focus();
      } else {
        this.subscriber.nativeElement.focus();
      }
    }
  }

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

}
