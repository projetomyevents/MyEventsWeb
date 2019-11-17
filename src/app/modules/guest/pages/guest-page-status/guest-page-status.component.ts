import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { GuestService } from '../../shared/guest.service';
import { RoutesConfig } from '../../../../config/routes.config';
import { Guest } from '../../shared/guest.model';

@Component({
  selector: 'app-guest-page-status',
  templateUrl: './guest-page-status.component.html',
  styleUrls: ['./guest-page-status.component.scss'],
})
export class GuestPageStatusComponent implements OnInit {

  guest: FormGroup;
  rawGuest: Guest;

  info: string;
  extraInfo: string[];
  resolved: boolean;
  resolving: boolean;

  constructor(
    private guestService: GuestService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.guestService.get(this.route.snapshot.paramMap.get('token')).then(
      async (response: any) => {
        this.rawGuest = response;
        this.guest = new FormGroup({
          presenceStatus: new FormControl(response.presenceStatus),
          confirmedCompanions: new FormControl(response.confirmedCompanions, Validators.required),
        });
      },
      async (err: any) => {
        await this.snackBar.open(err.status ? err.message : 'Erro interno no servidor. Tente mais tarde.', 'OK',
          {duration: -1, panelClass: 'snack-bar-failure'}).onAction().toPromise();

        await this.router.navigateByUrl(RoutesConfig.routes.error404);
      }).finally(() => this.resolved = true);
  }

  async update(): Promise<void> {
    this.info = null;
    this.extraInfo = null;
    console.log(this.guest.getRawValue());
    if (this.guest.invalid) {
      this.info = 'Preencha os campos requeridos.';
      this.guest.markAllAsTouched();
    } else {
      this.resolving = true;
      try {
        const response = await this.guestService.update(
          this.route.snapshot.paramMap.get('token'), this.guest.getRawValue());

        await this.snackBar.open(response.message, 'OK', {duration: -1, panelClass: 'snack-bar-success'}).onAction()
          .toPromise();

        await this.router.navigateByUrl(RoutesConfig.routes.home);
      } catch (err) {
        this.resolving = false;
        const message = err.status ? err.message : 'Erro interno no servidor. Tente mais tarde.';
        if (err.subErrors) {
          this.extraInfo = err.subErrors.map((subErr: any) => subErr.message);
        }
        this.info = message;
        this.snackBar.open(message, 'OK', {panelClass: 'snack-bar-failure'});
      }
    }
  }

}
