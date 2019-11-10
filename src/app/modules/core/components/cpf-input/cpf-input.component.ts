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
import { ControlValueAccessor, FormControl, FormGroup, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Subject } from 'rxjs';
import { CPF } from '../../shared/CPF.model';

@Component({
  selector: 'app-cpf-input',
  templateUrl: './cpf-input.component.html',
  styleUrls: ['./cpf-input.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: CPFInput}]
})
export class CPFInput implements OnInit, OnDestroy, DoCheck, ControlValueAccessor, MatFormFieldControl<CPF> {

  static nextId = 0;

  @ViewChild('group1', {static: false, read: ElementRef}) group1: ElementRef;
  @ViewChild('group2', {static: false, read: ElementRef}) group2: ElementRef;
  @ViewChild('group3', {static: false, read: ElementRef}) group3: ElementRef;
  @ViewChild('cv', {static: false, read: ElementRef}) cv: ElementRef;

  cpf: FormGroup;

  focused: boolean;
  autofilled: boolean;
  errorState: boolean;

  controlType = 'cpf-input';
  stateChanges = new Subject<void>();

  @HostBinding() id = `app-cpf-input-${CPFInput.nextId++}`;
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
      this.cpf.disable();
    } else {
      this.cpf.enable();
    }
    this.stateChanges.next();
  }
  private _disabled: boolean;

  get empty(): boolean {
    const {group1, group2, group3, cv} = this.cpf.value;
    return group1.length === 0 && group2.length === 0 && group3.length === 0 && cv.length === 0;
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
  get value(): CPF | null {
    const {group1, group2, group3, cv} = this.cpf.value;
    return !!group1 || !!group2 || !!group3 || !!cv ? new CPF(group1, group2, group3, cv) : null;
  }
  set value(cpf: CPF | null) {
    cpf = cpf || new CPF('', '', '', '');
    this.cpf.setValue({group1: cpf.group1, group2: cpf.group2, group3: cpf.group3, cv: cpf.cv});
    this.stateChanges.next();
  }

  constructor(@Optional() @Self() public ngControl: NgControl,
              private focusMonitor: FocusMonitor,
              private elRef: ElementRef<HTMLElement>) {
    this.cpf = new FormGroup({
      group1: new FormControl({value: '', disabled: this.disabled}),
      group2: new FormControl({value: '', disabled: this.disabled}),
      group3: new FormControl({value: '', disabled: this.disabled}),
      cv: new FormControl({value: '', disabled: this.disabled})
    });

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
      if (this.group1.nativeElement.value.length !== 3) {
        this.group1.nativeElement.focus();
      } else if (this.group2.nativeElement.value.length !== 3) {
        this.group2.nativeElement.focus();
      } else if (this.group3.nativeElement.value.length !== 3) {
        this.group3.nativeElement.focus();
      } else {
        this.cv.nativeElement.focus();
      }
    }
  }

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

}
