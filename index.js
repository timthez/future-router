$(document).ready(function(){
  $('a').click(function(e){
    e.preventDefault();
    var href = $(this).attr("href");
    var jsn = $.parseJSON(href);
    changeRoute(jsn);

 });
  $(window).on('hashchange',function(){ 
    var jsn = urlDecode(window.location);
    if(jsn.hasOwnProperty('route')){
      func = jsn.route;
    }   
    jsn.hasOwnProperty('args')?Router.Routes[func](jsn.args):Router.Routes[func]();
});
});
 

 function changeRoute(jsn){
  if(jsn == null){
      throw "No Specified Route! Please include in the href tag";
    }
    var func = 'root';
    if(jsn.hasOwnProperty('route')){
      func = jsn.route;
    }   
    if(jsn.hasOwnProperty('args')){
      var args = jsn.args;    
      Router.Routes[func](args);
      window.history.pushState('','',"#/"+(func == 'root'?'':func)+'?'+$.param(args,true));
    }else{

      Router.Routes[func]();
      window.history.pushState('','',"#/"+(func == 'root'?'':func));
    }
   
 };

 exports.Router = {
  Routes: {},
  route: function(route, args, execute){
    execute = execute === undefined ? false : execute
    if(!execute){
      if(args == undefined){
        return('{"route":"'+route+'"}');
      }else{              
       return('{"route":"'+route+'","args":'+JSON.stringify(args)+'}');
      }
    }else{
      var jsn = $.parseJSON(Router.route(route,args));
      changeRoute(jsn);
    }
    },
  init: function(){
    var jsn = Router.route('root');
    if(window.location.hash.length > 2){
      jsn = urlDecode();
    }
    changeRoute(jsn);    
    
  }
};


function urlDecode(hash){
    var hash =window.location.hash.substring(2);
    var index = hash.indexOf('?');
    var func = index !== -1?hash.substring(0,index):hash;
    var args = index !== -1?hash.substring(index+1):null;
    var dec = args ? JSON.parse(('{"' + args.replace(/&/g, '","').replace(/=/g,'":"') + '"}'),function(key, value) { return key==="" ? value : decodeURIComponent(value) }) : null
    console.log(dec);
    if(dec){
      return ({route: func,args: dec});
    }else{
      return ({route: func});
    }
}