import { Component, OnInit } from '@angular/core';
import {User} from '../../structures/structures';
import {UsersService} from '../../services/users.service';
import {ToasterService} from 'angular2-toaster/angular2-toaster';

@Component({
	selector: 'app-usuarios',
	templateUrl: './usuarios.html'
})
export class UsuariosComponent implements OnInit {

	public tipos = ['Administrador', 'Supervisor'];
	public model : User;
	public users = [];
	public action : string;

	constructor(private _users: UsersService, private toasterService: ToasterService) { 
		
	}

	ngOnInit() {
		document.getElementById('closeUserModal').click();
		this.action = "Agregar";
		this.model = new User(0,'','','', 'Seleccione');
		this._users.getAll().subscribe(
			res => {this.users = res},
			err => {this.toasterService.pop("error", "Error cargando usuarios", "")}
			);
	}

	createOrUpdate(){
		let r_message = this.action == "Agregar" ? "Usuario creado" : "Usuario editado";
		let w_message = this.action == "Agregar" ? "Error creando usuario" : "Error editando usuario";
		this._users.update(this.model).subscribe(
			res => {this.toasterService.pop("success", r_message, ""); this.ngOnInit()},
			err => {this.toasterService.pop("error", w_message, "");}

			);
	}

	showEdit(user: User){
		this.action = "Editar";
		this.model = user;
		document.getElementById('addUserBtn').click();
	}

	delete(user: User){
		if(confirm("Confirme eliminacion de usuario: " + user.username)){
			this._users.delete(user.id).subscribe(
				res => {this.toasterService.pop("success", "Usuario eliminado", ""); this.ngOnInit()},
				err => {this.toasterService.pop("error", "Error eliminando usuario", "");}
				);
		}
	}

}
