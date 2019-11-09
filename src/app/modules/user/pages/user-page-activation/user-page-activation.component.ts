import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { RoutesConfig } from '../../../../config/routes.config';
import { UserService } from '../../../core/shared/user.service';

@Component({
  selector: 'app-user-page-confirmation',
  templateUrl: './user-page-activation.component.html',
  styleUrls: ['./user-page-activation.component.scss']
})
export class UserPageActivationComponent implements OnInit {

  userRoutes = RoutesConfig.routes.user;

  info: string;
  confirmed: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userService.activate(this.route.snapshot.params.token)
      .then(
        () => {
          this.snackBar.open('Conta ativada.', 'OK', {panelClass: 'snack-bar-success'});
          this.router.navigateByUrl('').then();
        },
        (err: any) => {
          this.info = err.message;
          this.confirmed = true;
          this.snackBar.open('Falha na confirmação de conta!', 'OK', {panelClass: 'snack-bar-failure'});
        });
  }

}
