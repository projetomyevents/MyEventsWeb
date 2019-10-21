import { Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

class CPF {
  constructor(public grupo1: string, public grupo2: string, public grupo3: string,
              public identificador: string) {}
}

CPF.prototype.toString = function() {
  return this.grupo1 + this.grupo2 + this.grupo3 + this.identificador;
};

// TODO: MELHORAR ISSO
@Component({
  selector: 'app-cpf-input',
  templateUrl: './cpf-input.component.html',
  styleUrls: ['./cpf-input.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: CPFInput}]
})
export class CPFInput implements OnInit, OnDestroy, MatFormFieldControl<CPF>, ControlValueAccessor {

  static nextId = 0;

  @ViewChild('grupo1', {static: false, read: ElementRef}) grupo1: ElementRef;
  @ViewChild('grupo2', {static: false, read: ElementRef}) grupo2: ElementRef;
  @ViewChild('grupo3', {static: false, read: ElementRef}) grupo3: ElementRef;
  @ViewChild('identificador', {static: false, read: ElementRef}) identificador: ElementRef;

  cpf: FormGroup;

  autofilled: boolean;

  private _placeholder: string;
  private _required: boolean;
  private _disabled: boolean;

  @HostBinding() id = `app-cpf-input-${CPFInput.nextId++}`;
  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }
  @HostBinding('attr.aria-describedby') describedBy = '';

  focused = false;
  controlType = 'cpf-input';
  stateChanges = new Subject<void>();

  onChange = (_: any) => {};
  onTouched = () => {};

  @Input()
  get value(): CPF | null {
    const {grupo1, grupo2, grupo3, identificador} = this.cpf.value;
    if (!!grupo1 || !!grupo2 || !!grupo3 || !!identificador) {
      return new CPF(grupo1, grupo2, grupo3, identificador);
    }
    return null;
  }
  set value(cpf: CPF | null) {
    cpf = cpf || new CPF('', '', '', '');
    this.cpf.setValue({grupo1: cpf.grupo1, grupo2: cpf.grupo2, grupo3: cpf.grupo3,
      identificador: cpf.identificador});
    this.stateChanges.next();
  }

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(plh: string) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(req: boolean) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    if (this._disabled) { this.cpf.disable(); } else { this.cpf.enable(); }
    this.stateChanges.next();
  }

  get errorState() {
    // TODO: melhorar isso
    return this.ngControl.errors !== null
      && !!this.cpf.get('grupo1').touched
      && !!this.cpf.get('grupo2').touched
      && !!this.cpf.get('grupo3').touched
      && !!this.cpf.get('identificador').touched;
  }

  get empty(): boolean {
    const {grupo1, grupo2, grupo3, identificador} = this.cpf.value;
    return grupo1.length === 0 && grupo2.length === 0 && grupo3.length === 0 && identificador.length === 0;
  }

  constructor(@Optional() @Self() public ngControl: NgControl,
              private focusMonitor: FocusMonitor, private elRef: ElementRef<HTMLElement>) {
    this.cpf = new FormGroup({
      grupo1: new FormControl({value: '', disabled: this.disabled}),
      grupo2: new FormControl(''),
      grupo3: new FormControl(''),
      identificador: new FormControl('')
    });

    this.focusMonitor.monitor(this.elRef.nativeElement, true).subscribe((origin: string) => {
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
    this.focusMonitor.stopMonitoring(this.elRef.nativeElement)
  }

  onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      if (this.grupo1.nativeElement.value.length !== 3) {
        this.grupo1.nativeElement.focus();
      } else if (this.grupo2.nativeElement.value.length !== 3) {
        this.grupo2.nativeElement.focus();
      } else if (this.grupo3.nativeElement.value.length !== 3) {
        this.grupo3.nativeElement.focus();
      } else {
        this.identificador.nativeElement.focus();
      }
    }
  }

  updateValue(): void {
    this.onChange(this.value);
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

  writeValue(cpf: CPF | null): void {
    this.value = cpf;
  }

}
