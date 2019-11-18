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
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: FileInput}],
})
export class FileInput implements OnInit, OnDestroy, DoCheck, ControlValueAccessor, MatFormFieldControl<File[]> {

  static nextId = 0;

  @ViewChild('filesInput', {static: false, read: ElementRef}) filesInput: ElementRef;

  _files: File[];

  suggestions: string[];

  focused: boolean;
  autofilled: boolean;
  errorState: boolean;

  controlType = 'file-input';
  stateChanges = new Subject<void>();

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private focusMonitor: FocusMonitor,
    private elRef: ElementRef<HTMLElement>,
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    this.focusMonitor.monitor(this.elRef.nativeElement, true).subscribe((origin: string) => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  @HostBinding() id = `app-file-input-${FileInput.nextId++}`;
  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }
  @HostBinding('attr.aria-describedby') describedBy = '';

  @Input() multiple: boolean;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(dis: boolean) {
    this._disabled = dis;
    this.stateChanges.next();
  }
  private _disabled: boolean;

  get empty(): boolean {
    return this.value ? this.value.length === 0 : true;
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
  get value(): File[] | null {
    return this._files;
  }
  set value(files: File[] | null) {
    this._files = files;
    this.stateChanges.next();
  }

  onChange = (_: any) => {};
  onTouched = () => {};

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

  onInputChanges(files: FileList): void {
    this._files = Array.from<File>(files);
    this.onChange(this._files);
  }

  getFileNames(): any {
    return this.value ? this.value.map<string>((file: File) => file.name).join(', ') : '.';
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
    if ((event.target as Element).tagName.toLowerCase() !== 'input' && !this.disabled) {
      this.filesInput.nativeElement.focus();
    }
  }

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

}
