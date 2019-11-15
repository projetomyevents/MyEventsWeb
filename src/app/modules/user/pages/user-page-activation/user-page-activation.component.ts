import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { RoutesConfig } from '../../../../config/routes.config';
import { UserService } from '../../shared/user.service';


@Component({
  selector: 'app-user-page-confirmation',
  templateUrl: './user-page-activation.component.html',
  styleUrls: ['./user-page-activation.component.scss'],
})
export class UserPageActivationComponent implements OnInit {

  userRoutes = RoutesConfig.routes.user;

  info: string;
  confirmed: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.userService.activate(this.route.snapshot.paramMap.get('token')).then(
      async (response: any) => {
        this.snackBar.open(response.message, 'OK', {panelClass: 'snack-bar-success'});
        await this.router.navigateByUrl(RoutesConfig.routes.home);
      },
      (err: any) => {
        this.info = err.message;
        this.confirmed = true;
        this.snackBar.open(err.message, 'OK', {panelClass: 'snack-bar-failure'});
      });
  }

}
