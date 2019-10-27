import { Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Subject } from 'rxjs';

class CPF {
  constructor(public group1: string, public group2: string, public group3: string, public cv: string) { }
}

CPF.prototype.toString = function() {
  return this.group1 + this.group2 + this.group3 + this.cv;
};

@Component({
  selector: 'app-cpf-input',
  templateUrl: './cpf-input.component.html',
  styleUrls: ['./cpf-input.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: CPFInput}]
})
export class CPFInput implements OnInit, OnDestroy, MatFormFieldControl<CPF>, ControlValueAccessor {

  static nextId = 0;

  @ViewChild('group1', {static: false, read: ElementRef}) group1: ElementRef;
  @ViewChild('group2', {static: false, read: ElementRef}) group2: ElementRef;
  @ViewChild('group3', {static: false, read: ElementRef}) group3: ElementRef;
  @ViewChild('cv', {static: false, read: ElementRef}) cv: ElementRef;

  cpf: FormGroup;

  autofilled: boolean;

  private _placeholder: string;
  private _required: boolean;
  private _disabled: boolean;

  @HostBinding() id = `app-cpf-input-${CPFInput.nextId++}`;
  @HostBinding('class.floating')
  get shouldLabelFloat() { return this.focused || !this.empty; }
  @HostBinding('attr.aria-describedby') describedBy = '';

  focused = false;
  controlType = 'cpf-input';
  stateChanges = new Subject<void>();

  onChange = (_: any) => {};
  onTouched = () => {};

  @Input()
  get value(): CPF | null {
    const {group1, group2, group3, cv} = this.cpf.value;
    if (!!group1 || !!group2 || !!group3 || !!cv) { return new CPF(group1, group2, group3, cv); }
    return null;
  }
  set value(cpf: CPF | null) {
    cpf = cpf || new CPF('', '', '', '');
    this.cpf.setValue({group1: cpf.group1, group2: cpf.group2, group3: cpf.group3, cv: cpf.cv});
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
    if (this._disabled) { this.cpf.disable(); } else { this.cpf.enable(); }
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return  this.ngControl.errors !== null
      && this.cpf.get('group1').touched
      && this.cpf.get('group2').touched
      && this.cpf.get('group3').touched
      && this.cpf.get('cv').touched;
  }

  get empty(): boolean {
    const {group1, group2, group3, cv} = this.cpf.value;
    return group1.length === 0 && group2.length === 0 && group3.length === 0 && cv.length === 0;
  }

  constructor(@Optional() @Self() public ngControl: NgControl,
              private focusMonitor: FocusMonitor, private elRef: ElementRef<HTMLElement>) {
    this.cpf = new FormGroup({
      group1: new FormControl({value: '', disabled: this.disabled}),
      group2: new FormControl({value: '', disabled: this.disabled}),
      group3: new FormControl({value: '', disabled: this.disabled}),
      cv: new FormControl({value: '', disabled: this.disabled})
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
      if (this.group1.nativeElement.value.length !== 3) { this.group1.nativeElement.focus(); }
      else if (this.group2.nativeElement.value.length !== 3) { this.group2.nativeElement.focus(); }
      else if (this.group3.nativeElement.value.length !== 3) { this.group3.nativeElement.focus(); }
      else { this.cv.nativeElement.focus(); }
    }
  }

  updateValue(): void {
    this.onChange(this.value);

    // pequeno hack para mostrar erros, quem nunca
    if (this.cpf.untouched) { this.cpf.markAllAsTouched(); }
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
