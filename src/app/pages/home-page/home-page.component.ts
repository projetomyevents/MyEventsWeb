import { Component, OnInit } from '@angular/core';
import { RoutesConfig } from '../../config/routes.config';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  eventRegisterRoute = RoutesConfig.routes.event.create;

  constructor() {
  }

  ngOnInit(): void {
  }

}
