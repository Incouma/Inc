import {Injectable} from "@angular/core";
import {Component} from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod, Request} from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {SessionService} from './session.service';
import {User} from '../structures/structures';

@Injectable()
export class UsersService{
	private port = 8000;
	private url = "http://localhost";
	private token : String;
	
	constructor (private _http: Http, private session: SessionService){
		if ('production' === ENV) {
			//this.port = 8021;
			this.url = "https://e3471de6.ngrok.io";
		}
		this.url = this.url + ":"+this.port+"/api"+"/users";
		this.token = "";
	}

	login(usuario: string, password: string){
		let headers = new Headers();
  		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		let options = new RequestOptions({ headers: headers });
		var params = "username=" + usuario + "&password=" + password;
		return this._http.post(this.url + "/login", params, {
		headers: headers
		})
			.map(res => {this.session.setSession(res.json()); return res.json()});
	}

	logout(){
		this.session.deleteSession();
	}

	getAll(){
		let headers = new Headers();
		this.token = this.session.getSession().id;
		headers.append('Authorization', this.token.toString());
		return this._http.get(this.url, {headers: headers})
			.map(res => {return res.json()});
	}
	
    getOne(id: string){
		let headers = new Headers();
		this.token = this.session.getSession().id;
		headers.append('Authorization', this.token.toString());
		return this._http.get(this.url + '/' + id, {headers: headers})
			.map(res => {return res.json()});
	}

    create(user: User){
		let headers = new Headers();
		this.token = this.session.getSession().id;
  		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		headers.append('Authorization', this.token.toString());
		let options = new RequestOptions({ headers: headers });
		var params = "email=" + user.email + "&username=" + user.username + "&tipo=" + user.tipo + "&password=" + user.password;
		return this._http.post(this.url, params, {
		headers: headers
		})
			.map(res => {return res.json()});
	}

    update(user: User){
        let headers = new Headers();
        this.token = this.session.getSession().id;
  		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		  headers.append('Authorization', this.token.toString());
		let options = new RequestOptions({ headers: headers });
		var params = "email=" + user.email + "&username=" + user.username + "&tipo=" + user.tipo + "&password=" + user.password + "&id=" + user.id;
		
		return this._http.put(this.url, params, {
		headers: headers
		})
			.map(res => {return JSON.stringify(res)});
    }

    delete(id: number){
		let headers = new Headers();
		this.token = this.session.getSession().id;
		headers.append('Authorization', this.token.toString());
		return this._http.delete(this.url + '/' + id, {headers: headers})
			.map(res => {return JSON.stringify(res)});
    }

    getAgentes(id: string){
    	let headers = new Headers();
		this.token = this.session.getSession().id;
		headers.append('Authorization', this.token.toString());
		return this._http.get(this.url + '/' + id + "/agentes", {headers: headers})
			.map(res => {return res.json()});
    }
    
}