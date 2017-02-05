
module.exports = function(app) {
  ///*
  if(process.env.seed == 1 )
  {
  app.dataSources.mysqlDs.automigrate('Users', function(err){
    if(err) throw err;
  });
  app.dataSources.mysqlDs.automigrate('Role', function(err){
    if(err) throw err;
  });
  app.dataSources.mysqlDs.automigrate('ACL', function(err){
    if(err) throw err;
  });

  app.dataSources.mysqlDs.automigrate('RoleMapping', function(err){
    if(err) throw err;
  });

  app.dataSources.mysqlDs.automigrate('AccessToken', function(err){
    if(err) throw err;
  });
  app.dataSources.mysqlDs.automigrate('agentes', function(err){
    if(err) throw err;
  });
  app.dataSources.mysqlDs.automigrate('sorteos', function(err){
    if(err) throw err;
  });
  app.dataSources.mysqlDs.automigrate('vdiaria', function(err){
    if(err) throw err;
  });
}
  //*/
};
