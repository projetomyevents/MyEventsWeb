import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../../../core/shared/authentication.service';
import { EventService } from '../../shared/event.service';
import { Event } from '../../shared/event.model';
import { EventFile } from '../../shared/event-file.model';
import { RoutesConfig } from '../../../../config/routes.config';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import JSZip from '../../../core/shared/jszip.js';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-event-page-overview',
  templateUrl: './event-page-overview.component.html',
  styleUrls: ['./event-page-overview.component.scss'],
})
export class EventPageOverviewComponent implements OnInit {

  eventRoutes = RoutesConfig.routes.event;

  event: Event;

  resolved: boolean;
  resolving: boolean;

  jsZip = new JSZip();

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

        // criar pasta zippada de anexos e inserir os arquivos
        const attachmentsFolder = this.jsZip.folder('anexos');
        // noinspection TypeScriptValidateJSTypes
        response.attachments.forEach(
          (attachment: EventFile) => attachmentsFolder.file(attachment.name, attachment.content, {base64: true}));
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
          this.resolving = true;
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

  async downloadAttachments(): Promise<void> {
    this.resolving = true;
    const blobZip = await this.jsZip.generateAsync({type: 'blob'});

    saveAs(blobZip, `anexos-${this.event.name.replace(/\s/g, '_')}.zip`);
    this.resolving = false;
  }

  formatedPhone(): string {
    const phone = this.event.user.phone;
    const phoneHifenIndex = phone.length === 11 ? 7 : 6;
    return `(${phone.substring(0, 2)}) ${phone.substring(2, phoneHifenIndex)}-${phone.substring(phoneHifenIndex)}`;
  }

  formatedCEP(): string {
    const cep = this.event.cep;
    return `${cep.substring(0, 3)}-${cep.substring(3)}`;
  }

  getBackgroundImage(): string {
    return `url(${this.event.image
      ? 'data:' + this.event.image.type + ';base64,' + this.event.image.content
      : '../../../../assets/default-event-image.jpeg'})`;
  }

}
