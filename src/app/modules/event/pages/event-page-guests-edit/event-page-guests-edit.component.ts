import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { EventService } from '../../shared/event.service';
import { RoutesConfig } from '../../../../config/routes.config';
import { Event } from '../../shared/event.model';
import { Guest } from '../../../guest/shared/guest.model';
import { PresenceStatus } from '../../../guest/shared/presence-status.enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-event-page-guests-edit',
  templateUrl: './event-page-guests-edit.component.html',
  styleUrls: ['./event-page-guests-edit.component.scss'],
})
export class EventPageGuestsEditComponent implements OnInit {

  static nextGuestId = 0;

  eventRoutes = RoutesConfig.routes.event;

  event: Event;

  guestsId: MatTableDataSource<any>;
  guests: {[id: string]: {data: FormGroup, original: Guest, status: null | 'added' | 'removed' | 'modified'}} = {};

  resolved: boolean;
  resolving: boolean;

  headers = ['email', 'name', 'companionLimit', 'presenceStatus', 'operations'];

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
  }

  getPresenceStatus = (presenceStatus: string) => PresenceStatus[presenceStatus];

  ngOnInit(): void {
    this.eventService.get(Number(this.route.snapshot.paramMap.get('id'))).then(
      (eventResponse: any) => {
        this.event = eventResponse;
        this.eventService.getGuestsEdit(eventResponse.id).then(
          (guestsResponse: any) => {
            this.resolved = true;
            this.guestsId = new MatTableDataSource<any>(guestsResponse.map((guest: Guest) => guest.email));
            guestsResponse.forEach((guest: Guest) => {
              const id = guest.email;
              this.guests[id] = {
                data: new FormGroup({
                  name: new FormControl(guest.name, Validators.required),
                  email: new FormControl(guest.email, [Validators.required, Validators.email]),
                  companionLimit: new FormControl(guest.companionLimit),
                }),
                original: guest,
                status: null,
              };

              this.guests[id].data.valueChanges.subscribe((data) => {
                this.guests[data.email].status = 'modified';
              });
            });
          },
          async (err: any) => {
            await this.snackBar.open(err.status ? err.message : 'Erro interno no servidor. Tente mais tarde.', 'OK',
              {duration: -1, panelClass: 'snack-bar-failure'}).onAction().toPromise();

            await this.router.navigateByUrl(RoutesConfig.routes.home);
          });
      },
      async () => await this.router.navigateByUrl(RoutesConfig.routes.error404));
  }

  add(): void {
    const guestId = EventPageGuestsEditComponent.nextGuestId++;
    this.guests[guestId] = {
      data: new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        companionLimit: new FormControl(''),
      }),
      original: null,
      status: 'added',
    };
    const newData = this.guestsId.data;
    newData.push(guestId);
    this.guestsId.data = newData;
  }

  refresh(): void {
    this.guestsId.data = this.guestsId.data.filter((id: any) => {
      if (this.guests[id].status === 'added') {
        delete this.guests[id];
        return false;
      } else {
        this.revert(id);
        return true;
      }
    });
  }

  async save(): Promise<void> {
    this.resolving = true;
    try {
      const response = await this.eventService.putGuestsEdit(this.event.id, this.guestsId.data.filter((id: any) => {
        const guest = this.guests[id];
        if (guest.data.valid && guest.data.get('email').value.length !== 0 && guest.data.get('name').value.length !== 0
          && guest.status !== 'removed') {
          const data = guest.data.getRawValue();
          return data.email && data.name;
        } else {
          return false;
        }
      }).map((id: any) => {
        return this.guests[id].data.getRawValue();
      }));

      await this.snackBar.open(response.message, 'OK', {duration: -1, panelClass: 'snack-bar-success'}).onAction()
        .toPromise();

      location.reload();
    } catch (err) {
      this.resolving = false;

      this.snackBar.open(err.status ? err.message : 'Erro interno no servidor. Tente mais tarde.', 'OK',
        {panelClass: 'snack-bar-failure'});
    }
  }

  revert(id: any): void {
    const originalGuest = this.guests[id].original;
    this.guests[id].data.get('name').setValue(originalGuest.name);
    this.guests[id].data.get('companionLimit').setValue(originalGuest.companionLimit);
    this.guests[id].status = null;
  }

  remove(id: any): void {
    if (this.guests[id].status === 'added') {
      delete this.guests[id];
      this.guestsId.data = this.guestsId.data.filter((guestId: any) => guestId !== id);
    } else {
      this.guests[id].status = 'removed';
    }
  }

  async backToEvent(): Promise<void> {
    await this.router.navigateByUrl(this.eventRoutes.event(this.event.id));
  }

}
