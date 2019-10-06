import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './shared/shared.module';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';
import { Pagina404Component } from './pages/pagina404/pagina404.component';
import { UsuarioModule } from './modules/usuario/usuario.module';

@NgModule({
  declarations: [
    AppComponent,
    PaginaInicialComponent,
    Pagina404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    UsuarioModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
