import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {VentasComponent} from './components/ventas/ventas.component';
import {ReportesComponent} from './components/reporte/reporte.component';
import {SorteosComponent} from './components/sorteos/sorteos.component';
import {UsuariosComponent} from './components/usuarios/usuarios.component';
import {NotFoundComponent} from './components/notfound/notfound.component';

import {CanActivateWithSession} from './services/CanActivateWithSession.service';
import {CanActivateWithAdmin} from './services/CanActivateWithAdmin.service';
import {CanActivateWithSupervisor} from './services/CanActivateWithSupervisor.service';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: LoginComponent },
  { path: 'home',  component: HomeComponent, canActivate: [CanActivateWithSession] },
  { path: 'login',  component: LoginComponent },
  { path: 'ventas',  component: VentasComponent, canActivate: [CanActivateWithSupervisor] },
  { path: 'reporte',  component: ReportesComponent, canActivate: [CanActivateWithSession] },
  { path: 'usuarios',  component: UsuariosComponent, canActivate: [CanActivateWithAdmin] },
  { path: 'sorteos',  component: SorteosComponent, canActivate: [CanActivateWithAdmin] },
  { path: 'notfound',  component: NotFoundComponent },
  { path: '**', redirectTo: 'notfound'}
];
