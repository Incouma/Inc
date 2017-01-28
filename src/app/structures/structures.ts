export class Session{
	constructor(
		public id: string,
		public ttl: string,
		public userId: string,
		public created: Date
	){}
}

export class User{
	constructor(
		public id: number,
		public username: string,
		public email: string,
		public password: string,
		public tipo: string
	){}
}

export class Sorteo{
	constructor(
		public fecha: Date,
		public sorteo: number,
		public nganador: string
	){}
}


export class Agente{
	constructor(
		public id: number,
		public supervisor: number,
		public agente: string,
		public password: string,
		public comision: string
	){}
}

export class Venta{
	constructor(
		public id: number,
		public sorteo: number, 
		public fecha: Date,
		public numero: string,
		public venta: number,
		public agente: number
	){

	}
}