import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { HomeComponent } from './components/home/home.component';
import {NavComponent} from './components/subcomponents/nav/nav.component';
import {FooterComponent} from './components/subcomponents/footer/footer.component';
import {LoginComponent} from './components/login/login.component';
import {VentasComponent} from './components/ventas/ventas.component';
import {ReportesComponent} from './components/reporte/reporte.component';
import {SorteosComponent} from './components/sorteos/sorteos.component';
import {UsuariosComponent} from './components/usuarios/usuarios.component';
import {NotFoundComponent} from './components/notfound/notfound.component';
//import {} from './components/';

import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';
import {UsersService} from './services/users.service';
import {SorteosService} from './services/sorteos.service';
import {SessionService} from './services/session.service';
import {AgentesService} from './services/agentes.service';
import {VentasService} from './services/ventas.service';
import {TimeService} from './services/time.service';
import {EventsEmitter} from './services/event-emitter.service';
import {CanActivateWithSession} from './services/CanActivateWithSession.service';
import {CanActivateWithAdmin} from './services/CanActivateWithAdmin.service';
import {CanActivateWithSupervisor} from './services/CanActivateWithSupervisor.service';

//import {} from './services/.service';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    VentasComponent,
    SorteosComponent,
    UsuariosComponent,
    ReportesComponent,
    NotFoundComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    ToasterModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    UsersService,
    ToasterService,
    SessionService,
    EventsEmitter,
    CanActivateWithSession,
    CanActivateWithAdmin,
    CanActivateWithSupervisor,
    SorteosService,
    AgentesService,
    TimeService,
    VentasService
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}

}

