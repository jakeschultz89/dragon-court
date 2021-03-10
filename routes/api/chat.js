const router = express.Router();
var Tpl = require('../../lib/tpl');

const PlayerService = require('../../lib/services/user')();
const ChatService = require('../../lib/services/chat')();

router.use(global.tokenAuth);

router.post("/init", (req, res) => {
 var channel = req.body.channel;
 ChatService.init(channel, (msgs) => {
  if(!msgs.length){
   var msg = {
    author: '<a href="#" data-uid="0">DC Bot</a>',
    dateString: Tpl.chatDate(new Date()),
    channel: channel,
    message: 'Naught is heard but the sound of crickets...'
   };
   msgs.push(msg);
  }
  
  Tpl.render('chat', (html) => {
   var data = {
    data: msgs,
    html: html
   };
   
   var r = {
    status: 'ok',
    data: data
   };
   
   res.json(r);
  });
 });
});

router.post("/pop", (req, res) => {
 Tpl.render('chat', (html) => {
  var template = Tpl.getTpl(html),
   htmlStr = '';
  
  ChatService.init(User.chat, (msgs) => {
   if(!msgs.length){
    var msg = {
     author: '<a href="#" data-uid="0">DC Bot</a>',
     dateString: Tpl.chatDate(new Date()),
     channel: User.chat,
     message: 'Naught is heard but the sound of crickets...'
    };
    msgs.push(msg);
   }
   for(var i = 0; i < msgs.length; i++){
    var m = msgs[i];
    htmlStr += template(m);
   }
   
   Tpl.render('chatPop', (popHtml) => {
    var d = {
     data: {
      chat: htmlStr
     },
     html: popHtml
    };
    var data = Tpl.build(d);
    
    res.json({html: data});
   });
  });
 });
});

router.post("/change", (req, res) => {
 global.User.chat = req.body.id;
 UserService.update(User.id, User, (result) => {
  res.json({ status: "ok" });
 });
});

router.post("/submit", (req, res) => {
 ChatService.insert(req.body.message, function(result){
  Tpl.render('chat', (html) => {
   var data = {
    data: result,
    html: html
   };
   console.log(data);
   var r = {
    status: "ok",
    data: data
   };
   res.json(r);
  });
 });
});

router.post("/poll", (req, res) => {
 console.log(req.body);
 
 res.json({data: null});
});

module.exports = router;