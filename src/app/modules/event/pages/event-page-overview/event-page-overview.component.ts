import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Event } from '../../shared/event.model';
import { EventService } from '../../shared/event.service';
import { RoutesConfig } from '../../../../config/routes.config';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';

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
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.eventService.get(Number(this.route.snapshot.paramMap.get('id'))).then(
      (response: any) => {
        response.startDate = new Date(response.startDate);
        this.event = response;
      },
      async () => {
        await this.router.navigateByUrl(RoutesConfig.routes.error404);
      });
  }

  async guests(): Promise<void> {
  }

  async cancel(): Promise<void> {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Cancelar evento',
        message: `Tem certeza que deseja CANCELAR o evento '${this.event.name}'?`,
        accept: () => {
          // TODO: this shit
          new Audio('../../../../assets/i-giorno-giovanna-have-a-dream.mp3').play();
        },
        reject: () => null
      }
    });
  }

}
