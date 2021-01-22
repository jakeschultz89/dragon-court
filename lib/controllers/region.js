var fs = require('fs');

module.exports = {init};

function init(socket){
 console.log("region init");
    socket.on('region-init', (id) => {
      fs.readFile("views/partials/regions/"+id+".html", "UTF8", (err, html) => {
        if (err) { throw err };
        
        let json = {
          data: {},
          html: html
        };
        socket.emit('region-init-result', json);
      });
    });
  }


