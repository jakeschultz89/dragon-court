for(var i = 0; i < IMGS.length; i++){
 var preImg = $('<link rel="prefetch" href="'+IMGS[i]+'" as="image">');
 $('head').append(preImg);
}

var xDown = null;
var yDown = null;

function getTouches(evt) {
 return evt.touches ||  evt.originalEvent.touches;
}

function handleTouchStart(evt) {
 const firstTouch = getTouches(evt)[0];
 xDown = firstTouch.clientX;
 yDown = firstTouch.clientY;
}

function handleTouchMove(evt){
 if(!xDown || !yDown){
  return;
 }
 var xUp = evt.touches[0].clientX;
 var yUp = evt.touches[0].clientY;
 var xDiff = xDown - xUp;
 var yDiff = yDown - yUp;
 if(Math.abs(xDiff) > Math.abs(yDiff)){
  if(xDiff > 0){
   /* left swipe */
  } else {
   /* right swipe */
  }
 } else {
  if(yDiff > 0) {
   /* up swipe */
  } else {
   /* down swipe */
  }
 }
 /* reset values */
 xDown = null;
 yDown = null;
}

$(function(){
 var loc = window.location.href;
 if(/login/.test(loc)){
  $('.nav-login').siblings().removeClass('active');
  $('.nav-login').addClass('active');
 }
 if(/register/.test(loc)){
  $('.nav-register').siblings().removeClass('active');
  $('.nav-register').addClass('active');
 }
});

function fbInit(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) return;
 js = d.createElement(s);
 js.id = id;
 js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&autoLogAppEvents=1&version=v2.12&appId=199922540602335';
 fjs.parentNode.insertBefore(js, fjs);
}