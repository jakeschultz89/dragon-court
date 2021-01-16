DC.Encounter = {
 creature: [],
 init: (location) => {
  DC.Encounter.listeners.init();
  DC.Encounter.events.init();
  
  Socket.emit("encounter-init", location);
 },
 listeners: {
  init: () => {
   Socket.on("encounter-init-result", (data) => {
    console.log(data);
    DC.Encounter.creature = '';
   });
  }
 },
 events: {
  init: () => {
  
  }
 }
};