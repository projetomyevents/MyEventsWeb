import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { EventService } from '../../shared/event.service';
import { RoutesConfig } from '../../../../config/routes.config';
import { Event } from '../../shared/event.model';
import { SimpleGuest } from '../../../guest/shared/guest.model';
import { PresenceStatus } from '../../../guest/shared/presence-status.enum';


@Component({
  selector: 'app-event-page-guests',
  templateUrl: './event-page-guests.component.html',
  styleUrls: ['./event-page-guests.component.scss'],
})
export class EventPageGuestsComponent implements OnInit {

  event: Event;
  guests: MatTableDataSource<SimpleGuest>;

  resolved: boolean;

  headers = ['name', 'presenceStatus'];

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
  }

  hasGuests = () => Array.isArray(this.guests.data) && this.guests.data.length;
  getPresenceStatus = (presenceStatus: string) => PresenceStatus[presenceStatus];

  ngOnInit(): void {
    this.eventService.get(Number(this.route.snapshot.paramMap.get('id'))).then(
      (eventResponse: any) => {
        this.event = eventResponse;
        this.eventService.getGuests(eventResponse.id).then(
          (guestsResponse: any) => {
            this.resolved = true;
            this.guests = new MatTableDataSource(guestsResponse);
          },
          async (err: any) => {
            await this.snackBar.open(err.status ? err.message : 'Erro interno no servidor. Tente mais tarde.', 'OK',
              {duration: -1, panelClass: 'snack-bar-failure'}).onAction().toPromise();

            await this.router.navigateByUrl(RoutesConfig.routes.home);
          });
      },
      async (err: any) => await this.router.navigateByUrl(RoutesConfig.routes.error404));
  }

}
