const router = express.Router();
var Tpl = require('../../lib/tpl');

const ShopService = require('../../lib/services/shop')();

router.post('/init', (req, res) => {
 ShopService.get(req.body.id, (result) => {
  var blurb = Tpl.shopBlurb(result.type);
  Tpl.render('shop', (html) => {
   var data = {
    'type': result.type,
			'title': result.name,
			'blurb': blurb,
			'region': result.region
   };
   var hasTransactions = false,
    identifyBtn = false,
    polishBtn = false,
    infoBtn = false,
    hasItems = false;
   
   switch(result.type){
    case 'armor':
     transactions = true;
     identifyBtn = false;
     polishBtn = true;
     infoBtn = false;
     hasItems = true;
    break;
    
    case 'tavern':
     transactions = false;
     identifyBtn = false;
     polishBtn = false;
     infoBtn = false;
     hasItems = true;
    break;
    
    case 'trade':
     transactions = true;
     identifyBtn = false;
     polishBtn = false;
     infoBtn = true;
     hasItems = true;
    break;
    
    case 'weapons':
     transactions = true;
     identifyBtn = true;
     polishBtn = false;
     infoBtn = false;
     hasItems = true;
    break;
   }
   
   data.transactions = transactions;
   data.identifyBtn = identifyBtn;
   data.polishBtn = polishBtn;
   data.infoBtn = infoBtn;
   data.hasItems = hasItems;
   
   if(hasItems){
    ShopService.items(data.type, data.region, (items) => {
     data.items = items;
     let json = {
      data: data,
      html: html
     };
     var r = {
      error: false,
      data: json
     };
  
     res.json(r);
    });
   }else{
    let json = {
     data: data,
     html: html
    };
    var r = {
     error: false,
     data: json
    };
  
    res.json(r);
   }
  });
 });
});

router.post('/buy', (req, res) => {

});

router.post('/sell', (req, res) => {

});

router.post('/polish', (req, res) => {

});

router.post('/identify', (req, res) => {

});

router.post('/info', (req, res) => {

});

module.exports = router;