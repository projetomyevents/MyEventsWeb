import { ErrorStateMatcher } from '@angular/material';
import { FormControl } from '@angular/forms';

export class ParentErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return (!!(control && control.invalid && control.parent.dirty)
            || !!(control && control.parent && control.parent.invalid && control.parent.dirty));
  }
}
