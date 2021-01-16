EncounterService = require("../services/encounter")(db);

module.exports = {init};

function init(socket){
  socket.on('encounter-init', (location) => {
    EncounterService.getCreature(location, (results) => {
      socket.emit('encounter-init-result', results);
    });
  });
}