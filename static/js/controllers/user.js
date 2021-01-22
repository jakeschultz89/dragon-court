DC.User = {
 init: () => {
  DC.User.listeners.init();
  DC.User.events.init();
 },
 listeners: {
  init: () => {
   Socket.on("login-success", (data) => {
	   DC.models.User.id = data.user.id;
	   DC.models.User.name = data.user.name;
	   DC.models.User.firstRun = data.user.firstRun;
	   DC.models.User.hasChar = data.user.hasChar;
	   DC.models.User.chat = data.user.chat;
	   DC.models.User.token = data.token;
	        
	   setCookie('uid', DC.models.User.id, 365);
	        
	   window.location = "http://"+DC.host+"/game";
	  });
	      
	  Socket.on("login-failed", (data) => {
	   DC.Tpl.buildModal("error", data);
	  });
	      
	  Socket.on("register-success", (data) => {
	   window.location = "http://"+DC.host+":"+DC.port+data.redirect;
	  });
	      
	  Socket.on("logout-success", (data) => {
	  
	  });
	  
	  Socket.on("user-get-success", (data) => {
	   DC.models.User.id = data.user.id;
	   DC.models.User.name = data.user.name;
	   DC.models.User.firstRun = data.user.first_run;
	   DC.models.User.hasChar = data.user.has_char;
	   DC.models.User.chat = data.user.chat;
	   DC.models.User.token = data.token;
	  });
	 }
 },
 events: {
  init: () => {
   $(document).on('click', '#register', function(e){
    e.preventDefault();
    
    var name = $('input[name=username]').val(),
     email = $('input[name=email]').val(),
     password = $('input[name=password]').val();
     
    if(name == '' || email == '' || password == ''){
     // modal showing error
    }else{
     Socket.emit('user-register', {name: name, email: email, password: password});
    }
   });
    
   $(document).on('click', '#login', function(e){
    e.preventDefault();
     
    var name = $('input[name=username]').val(),
     password = $('input[name=password]').val();
     
    if(name == '' || password == ''){
     // modal showing error
     console.log('login error');
    }else{
     Socket.emit('user-login', {name: name, password: password});
    }
   });
  }
 }
};