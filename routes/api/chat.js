const router = express.Router();
var Tpl = require('../../lib/tpl');

const ChatService = require('../../lib/services/chat')();

router.post("/submit", (req, res) => {
 console.log(req.body);
 
 res.json({data: null});
});

router.post("/poll", (req, res) => {
 console.log(req.body);
 
 res.json({data: null});
});

module.exports = router;