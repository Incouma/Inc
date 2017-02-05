'use strict';
var app = require('../../server/server');

module.exports = function(Users) {
	Users.observe('after save', function(ctx, next){
		console.log(ctx.instance.id);

		let roleName = ctx.instance.tipo == "Administrador" ? "admin" : "supervisor";

		app.models.Role.findOne({
                  name: roleName
                }, function(err, role) {
                  if (err) throw err;
             
                  role.principals.create({
                    principalType: app.models.RoleMapping.USER,
                    principalId: ctx.instance.id
                  }, function(err, principal) {
                    if(err) throw err;
                    else console.log("Admin creado: " + ctx.instance.id);
                  });
                });

		next();
	})
};
