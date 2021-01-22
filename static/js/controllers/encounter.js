DC.Encounter = {
 creature: [],
 init: (location) => {
  console.log('encounter init', location);
  DC.Encounter.listeners.init();
  DC.Encounter.events.init();
  
  Socket.emit("encounter-init", location);
 },
 listeners: {
  init: () => {
   Socket.on("encounter-init-result", (data) => {
    console.log(JSON.stringify(data));
    var html = DC.Tpl.build(data);
    DC.Game.container.html(html);
   });
  }
 },
 events: {
  init: () => {
  
  }
 }
};