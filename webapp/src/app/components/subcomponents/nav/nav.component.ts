import { Component, OnInit, Input } from '@angular/core';
import {UsersService} from '../../../services/users.service';
import {EventsEmitter} from '../../../services/event-emitter.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'nav-bar',
    templateUrl: './nav.html'
})
export class NavComponent implements OnInit {
  hasSession: boolean;
  event : string;
  subscription: Subscription;
  
  constructor(private events: EventsEmitter) { 
    this.hasSession = false;
    this.subscription = this.events.getSessionEvents().subscribe(
      event => {this.event = event;this.validateSession();}
    );
  }

  validateSession(){
    if(this.event == "Logged")
      this.hasSession = true;
    else
      this.hasSession = false;
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
