import {Injectable} from "@angular/core";
import {Component} from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod, Request} from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {SessionService} from './session.service';
import {Sorteo} from '../structures/structures';

@Injectable()
export class SorteosService{
	private port = 7000;
	private url = "http://localhost";
	private token : String;
	
	constructor (private _http: Http, private session: SessionService){
		if ('production' === ENV) {
			this.url = "http://198.199.90.61";
		}
		this.url = this.url +":"+this.port+"/api"+"/sorteos";
		this.token = "";
	}

	getAll(){
		let headers = new Headers();
		this.token = this.session.getSession().id;
		headers.append('Authorization', this.token.toString());
		return this._http.get(this.url, {headers: headers})
			.map(res => {return res.json()});
	}
	
    getOne(id: number){
		let headers = new Headers();
		this.token = this.session.getSession().id;
		headers.append('Authorization', this.token.toString());
		return this._http.get(this.url + '/' + id, {headers: headers})
			.map(res => {return res.json()});
	}

	create(sorteo: Sorteo){
		let headers = new Headers();
        this.token = this.session.getSession().id;
  		headers.append('Content-Type', 'application/json');
		  headers.append('Authorization', this.token.toString());
		let options = new RequestOptions({ headers: headers });
		return this._http.post(this.url, JSON.stringify(sorteo), {
		headers: headers
		})
			.map(res => {return JSON.stringify(res)});
	}

    update(sorteo: Sorteo){
        let headers = new Headers();
        this.token = this.session.getSession().id;
  		headers.append('Content-Type', 'application/json');
		  headers.append('Authorization', this.token.toString());
		let options = new RequestOptions({ headers: headers });
		return this._http.put(this.url, JSON.stringify(sorteo), {
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

    getWithoutWinner(date1: Date, date2: Date){
    	let headers = new Headers();
		this.token = this.session.getSession().id;
		headers.append('Authorization', this.token.toString());

		//let filter = "?filter[where][fecha][between][0]=" + date1.toISOString() + "&filter[where][fecha][between][1]=" + date2.toISOString();
		let filter = "?filter[where][nganador]= ";
		return this._http.get(this.url + filter, {headers: headers})
			.map(res => {return res.json()});
    }

    getReporte(id: string){
    	let headers = new Headers();
		this.token = this.session.getSession().id;
		headers.append('Authorization', this.token.toString());

		//let filter = "?filter[where][fecha][between][0]=" + date1.toISOString() + "&filter[where][fecha][between][1]=" + date2.toISOString();
		let filter = "?id=" + id;
		return this._http.get(this.url + "/getReport" + filter, {headers: headers})
			.map(res => {return res.json()});
    }
    
}