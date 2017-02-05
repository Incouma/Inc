import {Injectable} from "@angular/core";
import {Component} from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod, Request} from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TimeService{
	
	constructor (private _http: Http){
		
	}
	
    getTime(){
		let headers = new Headers();
		return this._http.get("https://script.googleusercontent.com/macros/echo?user_content_key=RhsZfMvu3dBOoy9BAcoJqKT-d0Egeoc1ViFhSrnIEtkQqZ4rQHT8MuAVYK2z9ziFN6AQ9uXpiQXs4uDMdiLNS6awoZH3Js76m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJ9GRkcRevgjTvo8Dc32iw_BLJPcPfRdVKhJT5HNzQuXEeN3QFwl2n0M6ZmO-h7C6bwVq0tbM60-_IQDS8gp7-zCrh9fCgQkYW-bQtjVd81z&lib=MwxUjRcLr2qLlnVOLh12wSNkqcO1Ikdrk", {headers: headers})
			.map(res => {return res.json()});
	}
    
}