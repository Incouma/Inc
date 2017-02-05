import { Component, OnInit } from '@angular/core';
import {Sorteo} from '../../structures/structures';
import {SorteosService} from '../../services/sorteos.service';
import {ToasterService} from 'angular2-toaster/angular2-toaster';

@Component({
	selector: 'app-sorteos',
	templateUrl: './sorteos.html'
})
export class SorteosComponent implements OnInit {
	public model : Sorteo;
	public sorteos = [];
	public action : string;
	public fecha: string;

	constructor(private _sorteos: SorteosService, private toasterService: ToasterService) { }

	ngOnInit() {
		document.getElementById('closeSorteoModal').click();
		this.action = "Agregar";
		this.model = new Sorteo(new Date(), null, '');
		this._sorteos.getAll().subscribe(
			res => {this.sorteos = res},
			err => {this.toasterService.pop("error", "Error cargando sorteos", "")}
			);
	}

	createOrUpdate(){
		let r_message = this.action == "Agregar" ? "Sorteo creado" : "Sorteo editado";
		let w_message = this.action == "Agregar" ? "Error creando sorteo" : "Error editando sorteo";
		this._sorteos.update(this.model).subscribe(
			res => {this.toasterService.pop("success", r_message, ""); this.ngOnInit()},
			err => {this.toasterService.pop("error", w_message, "");}

			);
	}

	showEdit(model: Sorteo){
		this.action = "Editar";
		this.model = model;
		document.getElementById('addSorteoBtn').click();
	}

	getDate(){
		this.model.fecha = new Date();
		this.fecha = this.model.fecha.toLocaleDateString("es-HN", {
			day : 'numeric',
    		month : '2-digit',
    		year : 'numeric',
    		hour: 'numeric',
    		minute: 'numeric',
    		second: 'numeric',
    		hour12: true
		});
	}

	delete(model: Sorteo){
		if(confirm("Confirme eliminacion de sorteo: " + model.sorteo)){
			this._sorteos.delete(model.sorteo).subscribe(
				res => {this.toasterService.pop("success", "Sorteo eliminado", ""); this.ngOnInit()},
				err => {this.toasterService.pop("error", "Error eliminando sorteo", "");}
				);
		}
	}

	setGanadorShow(model: Sorteo){
		this.model = model;
		this.model.fecha = new Date(this.model.fecha);
		this.fecha = model.fecha.toLocaleDateString("es-HN", {
			day : 'numeric',
    		month : '2-digit',
    		year : 'numeric',
    		hour: 'numeric',
    		minute: 'numeric',
    		second: 'numeric',
    		hour12: true
		});
		document.getElementById('setGanador').click();
	}

}
