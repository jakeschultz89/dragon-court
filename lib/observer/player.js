const PlayerService = require('../services/player')();

class PlayerObserver {
  update(data){
   PlayerService.update(data, () => {});
  }
}