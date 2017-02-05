'use strict';
var app = require('../../server/server');

module.exports = function(Sorteos) {
	Sorteos.getReporte = function(id, cb){
		let mysql = app.datasources.mysqlDs.connector;
		let sql_st = `
		Select distinct v.sorteo, s.fecha, a.agente, u.username as supervisor, s.nganador, (Select sum(venta) from INCOUMA.vdiaria where agente = a.id) as totalVenta,
		(select sum(venta) from INCOUMA.vdiaria v1 
		inner join INCOUMA.sorteos s1 on s1.sorteo = v1.sorteo
		where v1.sorteo = s.sorteo and v1.agente = a.id and v1.numero = s.nganador) as totalGane
		from INCOUMA.vdiaria v 
		inner join INCOUMA.agentes a on v.agente = a.id
		inner join INCOUMA.Users u on u.id = a.supervisor
		inner join INCOUMA.sorteos s on v.sorteo = s.sorteo
		where v.sorteo = (Select sorteo from INCOUMA.sorteos where fecha = (SELECT MAX(fecha) from INCOUMA.sorteos where nganador >= 0)) and u.id = ?
		UNION
		select NULL, NULL, NULL, NULL, NULL, (SELECT sum(venta) from INCOUMA.vdiaria where 
		sorteo = (Select sorteo from INCOUMA.sorteos where fecha = (SELECT MAX(fecha) from INCOUMA.sorteos where nganador >= 0)) ) as totalVenta, 
		(select sum(venta) from INCOUMA.vdiaria where sorteo = ((Select sorteo from INCOUMA.sorteos where fecha = (SELECT MAX(fecha) from INCOUMA.sorteos where nganador >= 0))) 
		and numero = ((Select nganador from INCOUMA.sorteos where fecha = (SELECT MAX(fecha) from INCOUMA.sorteos where nganador >= 0))) ) as totalGane;

		;`;
		mysql.execute(sql_st, [id], function(err, data){
			if(err)
				cb(err, null);
			else
				cb(null, data);
		});
	}

	Sorteos.remoteMethod('getReporte', {
        accepts:[
        {arg: 'id', type: 'number', required: true}
        ],
        returns: {arg: 'getReporte', type: 'Object'},
        http: {path: '/getReport', verb: 'get'}
    }
    );
};
