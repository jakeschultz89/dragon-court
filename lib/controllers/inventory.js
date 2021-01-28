InventoryService = require('../services/inventory')(db);

module.exports = {init};

function init(socket){
 socket.on('inventory-remove', (item) => {
  InventoryService.remove(item, (result) => {
    socket.emit('inventory-seed', result);
  });
 });
 
 socket.on('inventory-add', (item) => {
  InventoryService.add(item, (result) => {
    socket.emit('inventory-seed', result);
  });
 });
 
 socket.on('inventory-get', (id) => {
  console.log(id);
  InventoryService.get(id, (result) => {
    socket.emit('inventory-seed', result);
  });
 });
}