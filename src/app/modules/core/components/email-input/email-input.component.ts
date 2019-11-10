import {
  Component,
  DoCheck,
  ElementRef,
  HostBinding, Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: EmailInput}]
})
export class EmailInput implements OnInit, OnDestroy, DoCheck, ControlValueAccessor, MatFormFieldControl<string> {

  static nextId = 0;
  static providers = [
    'gmail.com',
    'outlook.com',
    'hotmail.com',
    'yahoo.com'
  ];

  @ViewChild('emailInput', {static: false, read: ElementRef}) emailInput: ElementRef;

  email: FormControl;

  suggestions: string[];

  focused: boolean;
  autofilled: boolean;
  errorState: boolean;

  controlType = 'email-input';
  stateChanges = new Subject<void>();

  @HostBinding() id = `app-email-input-${EmailInput.nextId++}`;
  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }
  @HostBinding('attr.aria-describedby') describedBy = '';

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(dis: boolean) {
    this._disabled = dis;
    if (dis) {
      this.email.disable();
    } else {
      this.email.enable();
    }
    this.stateChanges.next();
  }
  private _disabled: boolean;

  get empty(): boolean {
    return this.email.value.length === 0;
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
  get value(): string | null {
    return this.email.value;
  }
  set value(email: string | null) {
    this.email.setValue(email);
    this.stateChanges.next();
  }

  @Input() name: string;

  constructor(@Optional() @Self() public ngControl: NgControl,
              private focusMonitor: FocusMonitor,
              private elRef: ElementRef<HTMLElement>) {
    this.email = new FormControl({value: '', disabled: this.disabled});

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.focusMonitor.monitor(this.elRef.nativeElement, true).subscribe((origin: string) => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  onChange = (_: any) => {};
  onTouched = () => {};

  onAnyInputChange(): void {
    const [email, provider] = this.value.split('@');
    this.suggestions = EmailInput.providers.filter(p => p.toLowerCase().startsWith(provider)).map(p => email + '@' + p);
    this.onChange(this.value);
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
      this.emailInput.nativeElement.focus();
    }
  }

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

}
