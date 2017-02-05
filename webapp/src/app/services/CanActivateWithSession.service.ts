import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';
import {SessionService} from './session.service';

@Injectable()
export class CanActivateWithSession implements CanActivate {
  canActivate() {
    return this._session.hasSession();
  }

  constructor(private _session: SessionService){

  }
}