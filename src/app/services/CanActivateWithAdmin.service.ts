import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';
import {SessionService} from './session.service';

@Injectable()
export class CanActivateWithAdmin implements CanActivate {
  canActivate() {
    return this._session.isAdmin();
  }

  constructor(private _session: SessionService){

  }
}