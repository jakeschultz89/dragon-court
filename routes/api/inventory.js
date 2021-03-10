const router = express.Router();
var Tpl = require('../../lib/tpl');

const InventoryService = require('../../lib/services/inventory')();

router.use(global.tokenAuth);

router.post('/get', (req, res) => {
 InventoryService.get(User.id, (items) => {
  var r = {
    error: false,
    data: items
   };
  
   res.json(r);
 });
});

module.exports = router;