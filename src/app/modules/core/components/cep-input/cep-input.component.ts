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
import { CEP } from '../../shared/CEP.model';


@Component({
  selector: 'app-cep-input',
  templateUrl: './cep-input.component.html',
  styleUrls: ['./cep-input.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: CEPInput}],
})
export class CEPInput implements OnInit, OnDestroy, DoCheck, ControlValueAccessor, MatFormFieldControl<CEP> {

  static nextId = 0;

  @ViewChild('local', {static: false, read: ElementRef}) local: ElementRef;
  @ViewChild('distribution', {static: false, read: ElementRef}) distribution: ElementRef;

  cep: FormGroup;

  focused: boolean;
  autofilled: boolean;
  errorState: boolean;

  controlType = 'cep-input';
  stateChanges = new Subject<void>();

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private focusMonitor: FocusMonitor,
    private elRef: ElementRef<HTMLElement>,
  ) {
    this.cep = new FormGroup({
      local: new FormControl({value: '', disabled: this.disabled}),
      distribution: new FormControl({value: '', disabled: this.disabled}),
    });

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    this.focusMonitor.monitor(this.elRef.nativeElement, true).subscribe((origin: string) => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  @HostBinding() id = `app-cep-input-${CEPInput.nextId++}`;
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
      this.cep.disable();
    } else {
      this.cep.enable();
    }
    this.stateChanges.next();
  }
  private _disabled: boolean;

  get empty(): boolean {
    const {local, distribution} = this.cep.value;
    return local.length === 0 && distribution.length === 0;
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
  get value(): CEP | null {
    const {local, distribution} = this.cep.value;
    return !!local || !!distribution ? new CEP(local, distribution) : null;
  }
  set value(cep: CEP | null) {
    cep = cep || new CEP('', '');
    this.cep.setValue({local: cep.local, distribution: cep.distribution});
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
      if (this.local.nativeElement.value.length !== 5) {
        this.local.nativeElement.focus();
      } else {
        this.distribution.nativeElement.focus();
      }
    }
  }

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

}
