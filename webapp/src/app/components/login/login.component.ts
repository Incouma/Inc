import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router }   from '@angular/router';
import {User} from '../../structures/structures';
import {UsersService} from '../../services/users.service';
import {EventsEmitter} from '../../services/event-emitter.service';
import { Subscription }   from 'rxjs/Subscription';
import {SessionService} from '../../services/session.service';


@Component({
  	selector: 'login-bar',
    templateUrl: './login.html'
})
export class LoginComponent implements OnInit {
	model = new User(0,'','', '','');
    public waiting: boolean = false;
    failed: boolean;

    constructor(private _http: UsersService, private router: Router, private events: EventsEmitter, private _session: SessionService ){
        this.failed = false;
    }    

    login(){
        this.waiting = true;
        this._http.login(this.model.username, this.model.password).subscribe(
            res => {
                this.waiting = false;
                this.failed = false;
                this.events.createSessionEvent("Logged");
                this._session.hasSession();
                this.router.navigate(['/home']);
                console.log(res);
                    },
            err => {
                this.waiting = false;
                this.failed = true;
                }
        );
        
    }
	ngOnInit() {
	}

}
