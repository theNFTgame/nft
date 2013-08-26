
var fntA = new Object();
var AppRouter = Backbone.Router.extend({  
  routes : {  
    '' : 'mainfunc', 
    'index' : 'mainfunc', 
    'reg' : 'regfunc',
    'run':'runfunc',
    '*error' : 'renderError'  
  },
  mainfunc : function() {
   console.log('mainfunc'); 
   showSubFrame('homepage','loginbox');
  }, 
  regfunc : function() {
  	//alert("111");
  	console.log('levelfunc'); 
  	showSubFrame('homepage','registerbox');
  }, 
  shakefunc : function (level){
  	if(!level){ fntA.level = 1 };
  	fntA.level = level;
  	showFrame('energybox');
  },
  runfunc : function (){
  	showFrame('runbox');
  	fntRun();
  },
  renderError : function(error) {  
    console.log('URL错误, 错误信息: ' + error); 
    //$('.link_home').show(); 
  }  
});  

var router = new AppRouter();  
Backbone.history.start(); 
function showFrame(framename) {
  if(!framename){ framename = 'homepage'}
    $('.frame').hide();
  //if(framename !=='homepage' ){ };
  $('.' + framename ).show();
  setTimeout(function(){window.scrollTo(0, 0);}, 0);
}

function showSubFrame(framename,subframename) {
  if(!framename && !subframename) {return false;};
  showFrame(framename);
  $('.' + framename + ' .subframe').hide();
  $('.' + framename + ' .' + subframename).show();
}

window.requestAFrame = (function () {
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  // if all else fails, use setTimeout
  function (callback) {
    return window.setTimeout(callback, 1000 / 60); // shoot for 60 fps
  };
})();

// handle multiple browsers for cancelAnimationFrame()
window.cancelAFrame = (function () {
  return window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.oCancelAnimationFrame ||
  function (id) {
    window.clearTimeout(id);
  };
})();

// create GUID 
function G() {
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function NewGuid() {
	return (G()+G());
}
function fRandomBy(under, over){ 
  switch(arguments.length){ 
    case 1: return parseInt(Math.random()*under+1); 
    case 2: return parseInt(Math.random()*(over-under+1) + under);  
    default: return 0; 
  } 
} 
function funMapload(){
	fntA.imgArr = [
		'img/map_a_01.jpg',
		'img/map_a_02.jpg',
		'img/map_a_03.jpg',
		'img/map_b_01.jpg',
		'img/map_b_02.jpg',
		'img/map_b_03.jpg',
		'img/map_c_01.jpg',
		'img/map_c_02.jpg',
		'img/map_c_03.jpg',
		'img/map_a_b.jpg' ,
		'img/map_b_c.jpg' ,
		'img/map_c_a.jpg' ];
}
function fntRun(){
  fntA.requestId = 0;
  fntA.startime = 0;
  fntA.image0 = new Image();  
  fntA.image1 = new Image();  
  fntA.image2 = new Image();
  fntA.image3 = new Image();  
  fntA.image4 = new Image();  
  fntA.image5 = new Image();
  fntA.w = 320;  
  fntA.h = 491; 
  var ctx0,ctx1;  
  var y0,y1,y2,y3,y4,y5;  
  fntA.gameLevel = 1;
  fntA.allmove = 0;
  fntA.alltimes = 0;

  funMapload();

  function runInit() {
    ctx0 =  document.getElementById('canvas').getContext('2d');
    ctx1 =  document.getElementById('canvas2').getContext('2d');
    fntA.mapArr = new Array();
    y0 = 0;
    y1 = -1*fntA.h;
    y2 = -2*fntA.h;
    y3 = 0;
    y4 = -1*fntA.h;
    y5 = -2*fntA.h;
      //generat map
      if(fntA.gameLevel === 1){
        for (var i = 14 - 1; i >= 0; i--) {
          if (i === 7){
            fntA.mapArr.push(fntA.imgArr[9]);
          }else if (i === 3){
            fntA.mapArr.push(fntA.imgArr[10]);
          }else if (i>7){
            fntA.mapArr.push(fntA.imgArr[fRandomBy(0,2)]);
          }else if (i<7 && i>3){
            fntA.mapArr.push(fntA.imgArr[fRandomBy(3,5)]);
          }else if (i<3){
            fntA.mapArr.push(fntA.imgArr[fRandomBy(6,8)]);
          }
        };
        console.log(fntA.mapArr);
      }
      //set map image
      fntA.image0.src = fntA.mapArr[0];  
      fntA.image1.src = fntA.mapArr[1];
      fntA.image2.src = fntA.mapArr[2];
      fntA.image3.src = fntA.mapArr[0];  
      fntA.image4.src = fntA.mapArr[1];
      fntA.image5.src = fntA.mapArr[2];
    }
  //}
    function start() {
      runInit();
      fntA.moveA = 5;
      fntA.moveB = 5;
      fntA.allmove = 0;
      fntA.alltimes = 0;
      fntA.alltimesB = 0;
      $('.player').addClass('running');
      //console.log("start");
      // if (window.performance.now) {
      //     startime = window.performance.now();
      // } else {
        fntA.startime = Date.now();
      // }
      fntA.requestId = window.requestAFrame(render);
    }
    function stop() {
      if (fntA.requestId)
        window.cancelAFrame(fntA.requestId); 
      $('.player').removeClass('running');       
    }

    function render(time) {

      //clear
      ctx0.clearRect(0,0,fntA.w,fntA.h);
      ctx1.clearRect(0,0,fntA.w,fntA.h);  
      //draw now
      var move = Math.floor(fntA.moveA);
      var moveB = Math.floor(fntA.moveB);

      //ctx a
      y0 +=move;  
      y1 +=move;  
      y2 +=move; 
      //console.log("new: y0=" + y0 + ",y1=" + y1 + ",y2=" + y2 + ",move=" + move + ",fntA.moveA=" + fntA.moveA); 
      if(y0>=fntA.h){  
        y0=move-2*fntA.h;  
        fntA.alltimes++;
        fntA.image0.src = fntA.mapArr[(Number(fntA.alltimes)+3)]; 
        console.log("y0 new image:" + fntA.image0.src + "fntA.alltimes:"+fntA.alltimes);
      }  
      if(y1>=fntA.h){  
        y1=move-2*fntA.h;  
        fntA.alltimes++;
        fntA.image1.src = fntA.mapArr[(Number(fntA.alltimes)+3)];
        console.log("y1 new image:" + fntA.image1.src+ "fntA.alltimes:"+fntA.alltimes);
      }  
      if(y2>=fntA.h){  
        y2=move-2*fntA.h; 
        fntA.alltimes++; 
        fntA.image2.src = fntA.mapArr[(Number(fntA.alltimes)+3)];
        console.log("y2 new image:" + fntA.image2.src+ "fntA.alltimes:"+fntA.alltimes);
      }  
      //draw now
      ctx0.drawImage(fntA.image0,0,y0,fntA.w,fntA.h);  
      ctx0.drawImage(fntA.image1,0,y1,fntA.w,fntA.h);  
      ctx0.drawImage(fntA.image2,0,y2,fntA.w,fntA.h);

      //ctx b
      y3 = y3 + moveB;  
      y4 = y4 + moveB;  
      y5 = y5 + moveB; 
      
      //console.log("new: y3=" + y3 + ",y4=" + y4 + ",y5=" + y5 + ",moveB=" + moveB + ",fntA.moveB=" + fntA.moveB); 
      if(y3>=fntA.h){  
        y3=moveB-2*fntA.h;  
        fntA.alltimesB++;
        fntA.image3.src = fntA.mapArr[(Number(fntA.alltimesB)+3)]; 
        console.log("y3 new image:" + fntA.image3.src+ "fntA.alltimesB:"+fntA.alltimesB + ",image id:" + (Number(fntA.alltimesB)+3));
      }  
      if(y4>=fntA.h){  
        y4=moveB-2*fntA.h;  
        fntA.alltimesB++;
        fntA.image4.src = fntA.mapArr[(Number(fntA.alltimesB)+3)];
        console.log("y4 new image:" + fntA.image4.src+ "fntA.alltimesB:"+fntA.alltimesB+ ",image id:" + (Number(fntA.alltimesB)+3));
      }  
      if(y5>=fntA.h){  
        y5=moveB-2*fntA.h; 
        fntA.alltimesB++; 
        fntA.image5.src = fntA.mapArr[(Number(fntA.alltimesB)+3)];
        console.log("y5 new image:" + fntA.image5.src+ "fntA.alltimesB:"+fntA.alltimesB+ ",image id:" + (Number(fntA.alltimesB)+3));
      }  
      ctx1.drawImage(fntA.image3,0,y3,fntA.w,fntA.h);  
      ctx1.drawImage(fntA.image4,0,y4,fntA.w,fntA.h);  
      ctx1.drawImage(fntA.image5,0,y5,fntA.w,fntA.h); 

      //set requestId
      fntA.requestId = window.requestAFrame(render);
      //set stop process
      if(fntA.alltimes > 8){
        fntA.moveA = fntA.moveA * 0.998;
      }
      //console.log("old: y0=" + y0 + ",y1=" + y1 + ",y2=" + y2 + ",move=" + move + ",fntA.alltimes=" + fntA.alltimes);
      if(fntA.moveA<=4){
        console.log("stop running at " + time + ", and allmove = " + fntA.allmove + ",fntA.alltimes= " +fntA.alltimes);
        stop();
      }
      fntA.allmove +=move; 
    }
    // handle multiple browsers for requestAnimationFrame()
    //runInit();
    $('.startrun').on('click',function(){
      start();
    });
    $('.stop').on('click',function(){
      stop();
    });
}
$(document).ready(function(){
	var key = NewGuid();
	var pageUrl = window.location.href;
	pageUrl=pageUrl.replace(/pc.html/g,"m.html");

	fntA.gameLevel = 1;
	fntA.shakerecord = 0;
	//run
	function shakeEventDidOccur () {
		//put your own code here etc.
		fntA.shakerecord = fntA.shakerecord + 1;
		$('#ShowDiv').html('Power:' + fntA.shakerecord);
   }


	//run
	console.log(key +"," + pageUrl);
	$("#qrcode").append("<img src='http://chart.apis.google.com/chart?chs=300x300&cht=qr&chl="+ pageUrl +"?key=" + key + "&choe=UTF-8' />");
  // NodeJS Server
  var nodejs_server = "222.73.241.58:8081";

  // connect
  var socket = io.connect("http://" + nodejs_server);

  socket.on("get_response", function (b) {
  	var combine = b.key + "_" + b.act;
  	console.log(combine);
  	switch (combine) {

      // when open m.page，call enter event，then show the game
      case key + "_enter":
      setTimeout(function () {

      	$("#qrcode").hide();
      	$("#main").show();

      }, 500);
      break;

      // shake event
      case key + "_changebg":
      setTimeout(function () {

      	var str = "0123456789abcdef", t = "";
      	for (j = 0; j < 6; j++) {
      		t = t + str.charAt(Math.random() * str.length);
      	}

      	$("#main").html("background-color:" + t);
      	console.log('background-color:' + t);
      	$("body").css("background-color", "#"+t);

      }, 500);
      break;

    }
  });
  //run for pc
  $(".start").live("click", function(e){
    loadPower(fntA.gameLevel*10);
  });

});


