import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SimpleEvent } from '../../shared/event.model';
import { EventService } from '../../shared/event.service';
import { RoutesConfig } from '../../../../config/routes.config';


@Component({
  selector: 'app-event-page-list',
  templateUrl: './event-page-list.component.html',
  styleUrls: ['./event-page-list.component.scss'],
})
export class EventPageListComponent implements OnInit {

  events: SimpleEvent[];

  resolved: boolean;

  constructor(
    private eventService: EventService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
  }

  hasEvents = () => Array.isArray(this.events) && this.events.length;

  ngOnInit(): void {
    this.eventService.getAll().then(
      (response: any) => {
        this.resolved = true;
        this.events = response.map((simpleEvent: SimpleEvent) => {
          simpleEvent.startDate = new Date(simpleEvent.startDate);
          return simpleEvent;
        });
      },
      async (err: any) => {
        await this.snackBar.open(err.status ? err.message : 'Erro interno no servidor. Tente mais tarde.', 'OK',
          {duration: -1, panelClass: 'snack-bar-failure'}).onAction().toPromise();

        await this.router.navigateByUrl(RoutesConfig.routes.home);
      });
  }

  async details(id: any): Promise<void> {
    await this.router.navigateByUrl(RoutesConfig.routes.event.event(id));
  }

  getBackgroundImage(event: SimpleEvent): string {
    return `url(${event.image
      ? 'data:' + event.image.type + ';base64,' + event.image.content
      : '../../../../assets/default-event-image.jpeg'})`;
  }

}
