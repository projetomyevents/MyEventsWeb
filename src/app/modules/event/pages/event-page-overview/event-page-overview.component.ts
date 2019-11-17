import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../../../core/shared/authentication.service';
import { EventService } from '../../shared/event.service';
import { Event } from '../../shared/event.model';
import { RoutesConfig } from '../../../../config/routes.config';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-event-page-overview',
  templateUrl: './event-page-overview.component.html',
  styleUrls: ['./event-page-overview.component.scss'],
})
export class EventPageOverviewComponent implements OnInit {

  eventRoutes = RoutesConfig.routes.event;

  event: Event;

  resolved: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
  }

  isOwner = () => this.authenticationService.logged() && this.event.user.email === this.authenticationService.userValue.email;

  ngOnInit(): void {
    this.eventService.get(Number(this.route.snapshot.paramMap.get('id'))).then(
      (response: any) => {
        this.resolved = true;
        response.startDate = new Date(response.startDate);
        this.event = response;
      },
      async () => {
        await this.router.navigateByUrl(RoutesConfig.routes.error404);
      });
  }

  async guests(): Promise<void> {
    await this.router.navigateByUrl(RoutesConfig.routes.event.eventGuests(this.event.id));
  }

  async guestsEdit(): Promise<void> {
    await this.router.navigateByUrl(RoutesConfig.routes.event.eventGuestsEdit(this.event.id));
  }

  async cancel(): Promise<void> {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Cancelar evento',
        message: `Tem certeza que deseja CANCELAR o evento '${this.event.name}'?`,
        accept: async () => {
          // TODO: this shit
          new Audio('../../../../assets/i-giorno-giovanna-have-a-dream.mp3').play();
          try {
            const response = await this.eventService.cancel(this.event.id);

            await this.snackBar.open(response.message, 'OK', {duration: -1, panelClass: 'snack-bar-success'}).onAction()
              .toPromise();

            await this.router.navigateByUrl(this.eventRoutes.events);
          } catch (err) {
            this.snackBar.open(err.status ? err.message : 'Erro interno no servidor. Tente mais tarde.', 'OK',
              {panelClass: 'snack-bar-failure'});
          }
        },
        reject: () => null,
      },
    });
  }

}
