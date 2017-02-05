import { Component, OnInit } from '@angular/core';
import {SorteosService} from '../../services/sorteos.service';
import {SessionService} from '../../services/session.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.html'
})
export class ReportesComponent implements OnInit {
	reporte: any[];

  constructor(private _sorteos: SorteosService, private _session: SessionService) { }

  ngOnInit() {
  	this._sorteos.getReporte(this._session.getSession().userId).subscribe(
  		res => {this.reporte = res.getReporte}
  	);
  }

}
