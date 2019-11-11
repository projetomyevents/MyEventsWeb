import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EventService } from '../../shared/event.service';
import { SimpleEvent } from '../../shared/event.model';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-event-page-list',
  templateUrl: './event-page-list.component.html',
  styleUrls: ['./event-page-list.component.scss']
})
export class EventPageListComponent implements OnInit {

  events: SimpleEvent[];

  constructor(
    private eventService: EventService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.updateEvents();
  }

  updateEvents(): void {
    this.eventService.getAll().then(
      (response: any) => {
        this.events = response;
      },
      (err: any) => {
        this.snackBar.open(err.message, 'OK', {panelClass: 'snack-bar-failure'});
      });
  }

  async details(id: any): Promise<void> {
    await this.router.navigateByUrl(`event/${id}`);
  }

  async cancel(event: SimpleEvent): Promise<void> {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Cancelar evento',
        message: `Tem certeza que deseja CANCELAR o evento '${event.name}'?`,
        accept: () => {
          // TODO: this shit
          new Audio('../../../../assets/i-giorno-giovanna-have-a-dream.mp3').play();
        },
        reject: () => null
      }
    });
  }

}
