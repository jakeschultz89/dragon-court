for(var i = 0; i < IMGS.length; i++){
 var preImg = $('<link rel="prefetch" href="'+IMGS[i]+'" as="image">');
 $('head').append(preImg);
}

document.addEventListener('DOMContentLoaded', () => {
 
 fbInit(document, 'script', 'facebook-jssdk');
 DC.init();
}, false);

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

var Socket = io.connect();

function setCookie(name,value,days) {
 var expires = "";
 if (days) {
  var date = new Date();
  date.setTime(date.getTime() + (days*24*60*60*1000));
  expires = "; expires=" + date.toUTCString();
 }
 document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
 var nameEQ = name + "=";
 var ca = document.cookie.split(';');
 for(var i=0;i < ca.length;i++) {
  var c = ca[i];
  while (c.charAt(0)==' ') c = c.substring(1,c.length);
  if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
 }
 return null;
}

function eraseCookie(name) {
 document.cookie = name+'=; Max-Age=-99999999;';  
}

function fbInit(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) return;
 js = d.createElement(s);
 js.id = id;
 js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&autoLogAppEvents=1&version=v2.12&appId=199922540602335';
 fjs.parentNode.insertBefore(js, fjs);
}