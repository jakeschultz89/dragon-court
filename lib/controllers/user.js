const bcrypt = require('bcrypt');
global.UserService = require("../services/user")(db);
PlayerService = require('../services/player')(db);

module.exports = {init};

function init(socket){
 socket.on('user-login', (data) => {
  UserService.login(data, (result) => {
   if(result.id){
    global.User = result;
    socket.emit('login-success', {user: User});
   }else{
    socket.emit('login-failed', {redirect: "/login/"});
   }
  });
 });
  
  socket.on('user-register', (data) => {
    bcrypt.hash(data.password, 10, function(err, hash) {
      data.hash = hash;
      
      UserService.create(data, function(d){
        socket.emit('register-success', {redirect: "/login/"});
      });
    });
	});
	
  socket.on('user-get', (id) => {
    UserService.get(id, function(result){
      socket.emit('user-get-success', result);
    });
  });
  
  socket.on('user-logout', (data) => {
    socket.emit('logout-success', {redirect: "/"});
  });
}