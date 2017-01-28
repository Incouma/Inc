import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../services/session.service';
import {EventsEmitter} from '../../services/event-emitter.service';
import { Subscription }   from 'rxjs/Subscription';

import {User} from '../../structures/structures';
import {UsersService} from '../../services/users.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.html'
})
export class HomeComponent implements OnInit {
	isAdmin: boolean;
	isSupervisor: boolean;
	public user: User;

	constructor(private _session: SessionService, private _users: UsersService) {
		this.isAdmin = false;
		this.isSupervisor = false;
	}


	validateSession(){
		this.isAdmin = this._session.isAdmin();
		this.isSupervisor = this._session.isSupervisor();
	}

	ngOnDestroy(){
	}

	ngOnInit() {
		this.user = new User(null, '','','','');
		this.validateSession();
		this._users.getOne(this._session.getSession().userId).subscribe(
			res => {this.user = res},
			err => {}
		);
	}

}
