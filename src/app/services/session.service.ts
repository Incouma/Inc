import {Injectable} from "@angular/core";
import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Session} from '../structures/structures';
import {Http, Response, Headers, RequestOptions, RequestMethod, Request} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class SessionService{

	session: Session = new Session('','','', new Date());
	loggedIn : boolean = false;
	
	constructor(private _http: Http){
		var session = JSON.parse(sessionStorage.getItem('token'));
		if(session)
			this.session = session;
		this.loggedIn = !!sessionStorage.getItem('token');
	}

	setSession(nsession: Session){
		this.session = nsession;
		sessionStorage.setItem('token', JSON.stringify(nsession));
	}

	getSession(){
		var session = JSON.parse(sessionStorage.getItem('token'));
		if(session)
			this.session = session;
		else
			this.session = new Session('','','',new Date());
		return this.session;
	}

	deleteSession(){
		sessionStorage.removeItem('token');
		this.session = new Session('','','',new Date());
	}

	isAdmin(){
		if(this.hasSession){
			return this.getUser(this.session.userId).tipo == "Administrador";
		}else{
			return false;
		}
	}

	isSupervisor(){
		if(this.hasSession)
			return !this.isAdmin();
		return false;
	}

	hasSession(){
		this.loggedIn = !!sessionStorage.getItem('token');
		return this.loggedIn;
	}

	getUser(id: string){
		var request = new XMLHttpRequest();
		request.open('GET', 'http://localhost:8000/api/users/' + id, false);  // `false` makes the request synchronous
		request.setRequestHeader("Authorization", this.session.id);
		request.send(null);

		if (request.status === 200) {
			return JSON.parse(request.responseText);
		}
	}
}