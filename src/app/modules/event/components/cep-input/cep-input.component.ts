import { Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Subject } from 'rxjs';

class CEP {
  constructor(public local: string, public distribution: string) { }
}

CEP.prototype.toString = function() {
  return this.local + this.distribution;
};

@Component({
  selector: 'app-cep-input',
  templateUrl: './cep-input.component.html',
  styleUrls: ['./cep-input.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: CEPInput}]
})
export class CEPInput implements OnInit, OnDestroy, MatFormFieldControl<CEP>, ControlValueAccessor {

  static nextId = 0;

  @ViewChild('local', {static: false, read: ElementRef}) local: ElementRef;
  @ViewChild('distribution', {static: false, read: ElementRef}) distribution: ElementRef;

  cep: FormGroup;

  autofilled: boolean;

  private _placeholder: string;
  private _required: boolean;
  private _disabled: boolean;

  @HostBinding() id = `app-cep-input-${CEPInput.nextId++}`;
  @HostBinding('class.floating')
  get shouldLabelFloat() { return this.focused || !this.empty; }
  @HostBinding('attr.aria-describedby') describedBy = '';

  focused = false;
  controlType = 'cep-input';
  stateChanges = new Subject<void>();

  onChange = (_: any) => {};
  onTouched = () => {};

  @Input()
  get value(): CEP | null {
    const {local, distribution} = this.cep.value;
    if (!!local || !!distribution) { return new CEP(local, distribution); }
    return null;
  }
  set value(cep: CEP | null) {
    cep = cep || new CEP('', '');
    this.cep.setValue({local: cep.local, distribution: cep.distribution});
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
    if (this._disabled) { this.cep.disable(); } else { this.cep.enable(); }
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return  this.ngControl.errors !== null
      && this.cep.get('local').touched
      && this.cep.get('distribution').touched;
  }

  get empty(): boolean {
    const {local, distribution} = this.cep.value;
    return local.length === 0 && distribution.length === 0;
  }

  constructor(@Optional() @Self() public ngControl: NgControl,
              private focusMonitor: FocusMonitor, private elRef: ElementRef<HTMLElement>) {
    this.cep = new FormGroup({
      local: new FormControl({value: '', disabled: this.disabled}),
      distribution: new FormControl({value: '', disabled: this.disabled})
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
      if (this.local.nativeElement.value.length !== 5) { this.local.nativeElement.focus(); }
      else { this.distribution.nativeElement.focus(); }
    }
  }

  updateValue(): void {
    this.onChange(this.value);

    // pequeno hack para mostrar erros, quem nunca
    if (this.cep.untouched) { this.cep.markAllAsTouched(); }
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

  writeValue(cep: CEP | null): void {
    this.value = cep;
  }

}
