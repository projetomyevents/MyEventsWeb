import { Component, OnInit } from '@angular/core';
import { RoutesConfig } from '../../config/routes.config';

@Component({
  selector: 'app-error-404-page',
  templateUrl: './error-404-page.component.html',
  styleUrls: ['./error-404-page.component.scss']
})
export class Error404PageComponent implements OnInit {

  homeRoute = RoutesConfig.routes.home;

  constructor() { }

  ngOnInit(): void { }

}
