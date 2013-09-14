
var fntA = new Object();
var AppRouter = Backbone.Router.extend({  
  routes : {  
    '' : 'levelfun', 
    'index' : 'levelfun', 
    'intro' : 'levelfun',
    'replay' : 'levelfun',
    'repower' : 'levelfun',
    'level' : 'levelfun',
    'shake' : 'shakefun',
    'shake/:level' : 'shakefun',
    'run':'runfun',
    '*error' : 'renderError'  
  },
  mainfun : function() {

  }, 
  levelfun : function() {
  	//alert("111");
  	console.log('levelfun'); 
  	showSubFrame('homepage','levelbox');
    $('.logo').show();
    $('.mask').hide();
  }, 
  shakefun : function (level){
  	if(!level){ fntA.level = 1 };
    fntA.gameLevel = level;
    $('.introbox .txt1').removeClass('txt1_l1 txt1_l2 txt1_l3').addClass('txt1_l'+fntA.gameLevel);
    fntA.shakerecord = 0;
    showSubFrame('energybox','introbox');
    loadPower(fntA.gameLevel*10);
    fntRun();
  },
  runfun : function (){
  	showFrame('runbox');
  	
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
  //setTimeout(function(){window.scrollTo(0, 0);}, 0);
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


function G() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
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
    'img/map/map_a_01.jpg',
    'img/map/map_a_02.jpg',
    'img/map/map_a_03.jpg',
    'img/map/map_b_01.jpg',
    'img/map/map_b_02.jpg',
    'img/map/map_b_03.jpg',
    'img/map/map_c_01.jpg',
    'img/map/map_c_02.jpg',
    'img/map/map_c_03.jpg',
    'img/map/map_a_b.jpg' ,
    'img/map/map_b_c.jpg' ,
    'img/map/map_c_a.jpg' ,
    'img/player-mini.png'];
}

function fntRun(){
  fntA.requestId = 0;
  fntA.startime = 0;
  fntA.image0 = new Image();  
  fntA.image1 = new Image();  
  fntA.image2 = new Image();
  fntA.w = 320;  
  fntA.h = 491; 
  var ctx0;  
  var y0,y1,y2;  
  if( !fntA.gameLevel ){ fntA.gameLevel = 1; };
  fntA.allmove = 0;
  fntA.alltimes = 0;
  fntA.mapitem = 16;

  funMapload();

  function runInit() {
    ctx0 =  document.getElementById('canvas').getContext('2d');
    fntA.mapArr = new Array();
    y0 = 0;
    y1 = -1*fntA.h;
    y2 = -2*fntA.h;
      //generat map

        for (var i = fntA.mapitem - 1; i >= 0; i--) {
          if (i === 9){
            fntA.mapArr.push(fntA.imgArr[9]);
          }else if (i === 4){
            fntA.mapArr.push(fntA.imgArr[10]);
          }else if (i === 0){
            fntA.mapArr.push(fntA.imgArr[11]);
          }else if (i>9){
            fntA.mapArr.push(fntA.imgArr[fRandomBy(0,2)]);
          }else if (i<9 && i>4){
            fntA.mapArr.push(fntA.imgArr[fRandomBy(3,5)]);
          }else if (i<4){
            fntA.mapArr.push(fntA.imgArr[fRandomBy(6,8)]);
          }

        console.log(fntA.mapArr);
      }
      //set map image
      fntA.image0.src = fntA.mapArr[0];  
      fntA.image1.src = fntA.mapArr[1];
      fntA.image2.src = fntA.mapArr[2];
    }

    function start() {
      runInit();
      fntA.moveA = 5;
      fntA.allmove = 0;
      fntA.alltimes = 0;
      $('.player').addClass('running');
      showSubFrame('runbox','runningbox');
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
    function wayRoll(e) {
      if((e+1) > fntA.mapitem ){
        e = e % fntA.mapitem;
      }
      return e;
    }
    function render(time) {

      //clear

      ctx0.clearRect(0,0,fntA.w,fntA.h);  
      //draw now
      var move = Math.floor(fntA.moveA);
      
      
      y0 +=move;  
      y1 +=move;  
      y2 +=move; 
      //console.log("new: y0=" + y0 + ",y1=" + y1 + ",y2=" + y2 + ",move=" + move + ",fntA.moveA=" + fntA.moveA); 
      if(y0>=fntA.h){  
        //y0=move-2*fntA.h;  
        y0 = Math.min(y1,y2) - fntA.h;
        fntA.alltimes++;
        fntA.image0.src = fntA.mapArr[wayRoll((Number(fntA.alltimes)+3))]; 
        console.log("y0 new image:" + fntA.image0.src + "fntA.alltimes:"+fntA.alltimes);
      }  
      if(y1>=fntA.h){  
        y1 = Math.min(y0,y2) - fntA.h;
        fntA.alltimes++;
        fntA.image1.src = fntA.mapArr[wayRoll((Number(fntA.alltimes)+3))];
        console.log("y1 new image:" + fntA.image1.src+ "fntA.alltimes:"+fntA.alltimes);
      }  
      if(y2>=fntA.h){  
        y2 = Math.min(y0,y1) - fntA.h;
        fntA.alltimes++; 
        fntA.image2.src = fntA.mapArr[wayRoll((Number(fntA.alltimes)+3))];
        console.log("y2 new image:" + fntA.image2.src+ "fntA.alltimes:"+fntA.alltimes);
      } 

      //draw now
      ctx0.drawImage(fntA.image0,0,y0,fntA.w,fntA.h);  
      ctx0.drawImage(fntA.image1,0,y1,fntA.w,fntA.h);  
      ctx0.drawImage(fntA.image2,0,y2,fntA.w,fntA.h); 

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
        $('.recordbox').show();
        $('.logo').hide();
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

  fntA.gameLevel = 1;
  fntA.shakerecord = 0;
  var shakeTime = new Date(), newColor=255;

//window.addEventListener('shake', shakeEventDidOccur, false);
//define a custom method to fire when shake occurs.
function shakeEventDidOccur () {
  //put your own code here etc.
  $('.txt').append('<p>Shake me again! Power:' + fntA.shakerecord +'</p>');
  newColor = newColor - 8;

  fntA.shakerecord = fntA.shakerecord + 1;

  if (fntA.shakerecord === 4 ){
    showSubFrame('energybox','powerbox');
  }
}


function loadPower(secs) {
    
    secs = Number(secs);

    window.addEventListener('shake', shakeEventDidOccur, false);
	  //define a custom method to fire when shake occurs.
    for (var i = secs; i >= 0; i--) {
      (function(index) {
        setTimeout(function(){
        doUpdateTime(index);
      }, (secs - index) * 1000);
    })(i);
  }
}

function doUpdateTime(num) {
  //document.getElementById('ShowDiv').innerHTML = '' + num + '秒';
  //alert(num);
  $('.debuginfo').html( num + '秒,power:' + fntA.shakerecord );
  $('.powerbox .countdown').html( num );
  
  if (num == 0) {
  	console.log("shake remove!");
  	$('.debuginfo').html('<a class="navlink linkrun" href="#/run">Run with power:'+ fntA.shakerecord +'</a>');
    window.removeEventListener('shake', shakeEventDidOccur, false);
    showSubFrame('energybox','readybox');
  }
}


$(document).ready(function(){


});

