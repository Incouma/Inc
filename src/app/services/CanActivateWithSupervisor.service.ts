import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';
import {SessionService} from './session.service';

@Injectable()
export class CanActivateWithSupervisor implements CanActivate {
  canActivate() {
    return this._session.isSupervisor();
  }

  constructor(private _session: SessionService){

  }
}