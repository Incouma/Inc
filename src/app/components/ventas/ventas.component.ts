import { Component, OnInit } from '@angular/core';
import {Venta, Agente, User, Sorteo} from '../../structures/structures';
import {UsersService} from '../../services/users.service';
import {SessionService} from '../../services/session.service';
import {AgentesService} from '../../services/agentes.service';
import {SorteosService} from '../../services/sorteos.service';
import {VentasService} from '../../services/ventas.service';
import {TimeService} from '../../services/time.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { Subscription }   from 'rxjs/Subscription';
import {ToasterService} from 'angular2-toaster/angular2-toaster';

@Component({
	selector: 'app-ventas',
	templateUrl: './ventas.html'
})
export class VentasComponent implements OnInit {
	public model: Venta[];
	public cant: number;
	public suma: number;
	public user: User;
	public agentesByUser: Agente[];
	public agenteName: string;
	public agenteId: number;
	public now: Date;
	public sorteo: Sorteo;
	subscription: Subscription;
	hasNegatives: boolean;

	constructor(private _ventas: VentasService, private toasterService: ToasterService, private _sorteos: SorteosService, private _users: UsersService, private _session: SessionService, private _agentes: AgentesService, private _time: TimeService) { }

	ngOnInit() {
		this.cant = 50;
		this.suma = 0;
		this.model = new Array<Venta>();
		this.agentesByUser = new Array<Agente>();
		this.agenteName = "Seleccione";
		this.user = new User(null,'','','','',);
		this.now = new Date();
		this.sorteo = new Sorteo(null, null, '');
		this.hasNegatives = false;


		this.subscription = this.getTime$.subscribe(t => {
			this.now = new Date(t.fulldate);
		});

		for (let i = 0; i < this.cant; i++) {
			let supervisor = new User(null, '','','','');
			let temp = new Venta(null, null, new Date(), '', null, null);
			this.model.push(temp);
		}
		this._users.getOne(this._session.getSession().userId).subscribe(
			res => {this.user = res},
			err =>{}
			);
		this._users.getAgentes(this._session.getSession().userId).subscribe(
			res => {this.agentesByUser = res}
			);

		this._sorteos.getWithoutWinner(new Date('2017-01-25'), new Date('Sat, 28 Jan 2017 03:04:32 -0600')).subscribe(
			res => {this.sorteo = res.length == 1 ? res[0] :new Sorteo(null, null, ''); console.log(res)}
			);
	}

	addRecords(ncant: number){
		this.cant += ncant;
		for (let i = 0; i < ncant; i++) {
			let supervisor = new User(null, '','','','');
			let temp = new Venta(null, null, new Date(), '', null, null);
			this.model.push(temp);
		}
	}

	sum(){
		this.suma = 0;
		for (let i = 0; i < this.cant; i++){
			if(this.model[i].venta != null){
				if(this.model[i].venta > 0){
					this.suma += parseInt(this.model[i].venta.toString());
				}
				else{
					this.hasNegatives = true;
				}
			}
		}
	}

	refreshTime(){
		return Observable.timer(500);
	}

	getTime$ = Observable.of(null).switchMap(e=>this.refreshTime())
	.switchMap(r => this._time.getTime())
	.repeat();

	ngOnDestroy(){
		this.subscription.unsubscribe();
	}


	crearVenta(){
		if(confirm("Confirme envio de venta")){
			if(this.hasNegatives){
				if(!confirm("Se encuentran ventas negativas, de continuar, dichas ventas no seran registradas. Continuar?")){
					return;
				}
			}
			for (let i = 0; i < this.cant; i++){
				if(this.model[i].venta != null && this.model[i].venta > 0){
					this.model[i].fecha = this.now;
					this.model[i].sorteo = this.sorteo.sorteo;
					this.model[i].agente = this.agenteId;
					this._ventas.create(this.model[i]).subscribe(
						res =>{this.toasterService.pop("success", "Venta de numero" + this.model[i].numero + " registrada", ""); i == this.cant -1 ? this.ngOnInit() : null},
						err =>{this.toasterService.pop("error", "Error registrando venta de numero" + this.model[i].numero, "")}
					);
				}
			}
		}
	}

}
