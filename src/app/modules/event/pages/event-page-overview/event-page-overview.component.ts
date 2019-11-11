import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../../shared/event.model';
import { EventService } from '../../shared/event.service';
import { RoutesConfig } from '../../../../config/routes.config';

@Component({
  selector: 'app-event-page-overview',
  templateUrl: './event-page-overview.component.html',
  styleUrls: ['./event-page-overview.component.scss']
})
export class EventPageOverviewComponent implements OnInit {

  event: Event;

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.eventService.get(Number(this.route.snapshot.paramMap.get('id'))).then(
      (response: any) => {
        this.event = response;
      },
      async () => {
        await this.router.navigateByUrl(RoutesConfig.routes.error404);
      });
  }

}
