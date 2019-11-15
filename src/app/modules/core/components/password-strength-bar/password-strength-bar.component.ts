import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import zxcvbn from './zxcvbn.js';


@Component({
  selector: 'app-password-strength-bar',
  templateUrl: './password-strength-bar.component.html',
  styleUrls: ['./password-strength-bar.component.scss'],
})
export class PasswordStrengthBar implements OnInit {

  static classes = {
    0: 'too-weak',
    1: 'weak',
    2: 'mediocre',
    3: 'strong',
    4: 'epic',
  };

  strengthPercentage: number;
  strengthClass: string;

  @Input() passwordControl: AbstractControl;

  constructor() {
  }

  ngOnInit(): void {
    this.passwordControl.valueChanges.subscribe((value: string) => {
      const passwordScore = zxcvbn(value).score;
      this.strengthPercentage = passwordScore === 0 ? 12.5 : passwordScore / 4 * 100;
      this.strengthClass = PasswordStrengthBar.classes[passwordScore];
    });
  }

}
