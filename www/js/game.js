
var fntA = new Object();
var AppRouter = Backbone.Router.extend({  
    routes : {  
        '' : 'mainfun', 
        'index' : 'mainfun', 
        'intro' : 'mainfun',
        'level' : 'levelfun',
        'shake' : 'shakefun',
        'shake/:level' : 'shakefun',
        'run':'runfun',
        '*error' : 'renderError'  
    },
    mainfun : function() {
    	console.log('home'); 
    	showSubFrame('homepage','introbox');
    }, 
    levelfun : function() {
    	console.log('home'); 
    	showSubFrame('homepage','levelbox');
    }, 
    shakefun : function (level){
    	if(!level){ fntA.level = 1 };
    	fntA.level = level;
    	showFrame('energybox');
    }
    runfun : function (level){
    	if(!level){ fntA.level = 1 };
    	fntA.level = level;
    	showFrame('runbox');
    	fntRun();
    }
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
    fntA.w = 320;  
    fntA.h = 491; 
    var ctx0;  
    var y0,y1,y2;  
    fntA.gameLevel = 1;
    fntA.allmove = 0;
    fntA.alltimes = 0;

    funMapload();

    function runInit() {
      ctx0 =  document.getElementById('canvas').getContext('2d');
      fntA.mapArr = new Array();
      y0 = 0;
      y1 = -1*fntA.h;
      y2 = -2*fntA.h;
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
    }

    function start() {
      runInit();
      fntA.moveA = 5;
      fntA.allmove = 0;
      fntA.alltimes = 0;
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
          y0=move-2*fntA.h;  
          fntA.alltimes++;
          fntA.image0.src = fntA.mapArr[(Number(fntA.alltimes)+3)]; 
          console.log("y0 new image:" + fntA.image0.src);
      }  
      if(y1>=fntA.h){  
          y1=move-2*fntA.h;  
          fntA.alltimes++;
          fntA.image1.src = fntA.mapArr[(Number(fntA.alltimes)+3)];
          console.log("y1 new image:" + fntA.image1.src);
      }  
      if(y2>=fntA.h){  
          y2=move-2*fntA.h; 
          fntA.alltimes++; 
          fntA.image2.src = fntA.mapArr[(Number(fntA.alltimes)+3)];
          console.log("y2 new image:" + fntA.image2.src);
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
	var pagebody = $("#pagebody");
	var themenu  = $("#navmenu");
	var topbar   = $("#toolbarnav");
	var content  = $("#content");
	var viewport = {
    	width  : $(window).width(),
    	height : $(window).height()
	};
	var gameLevel = 1;
	var playerShakeRecord = 0;
  	var shakeTime = new Date(), newColor=255;

	//window.addEventListener('shake', shakeEventDidOccur, false);
	//define a custom method to fire when shake occurs.
	function shakeEventDidOccur () {
		//put your own code here etc.
	    $('.txt').append('<p>Shake me again!</p>');
	    newColor = newColor - 8;
	    if(playerShakeRecord === 0){
	    	shakeTime = new Date();
	    }
	    playerShakeRecord = playerShakeRecord + 1;
	    if( playerShakeRecord > 8){
	    	var endTime = new Date();
	    	var timeDifference = (endTime.getTime() - shakeTime.getTime());

	    	alert( timeDifference);
	    	//$('#content').css('background','gray');
	    	//$('.txt').html('<img src="img/winner.png" />');
	    	// $('#content h2').html('You Win!');
	    	//$('#content h2').html('Power:' + playerShakeRecord);
	    	//$('#content').html('Let\'s Run!');
	    }else{
	    	$('#content').css('background','rgb(255,'+newColor+','+newColor+')');
	    	$('#content h2').html('Power:' + playerShakeRecord);
	    }
	}

	$(".reset").live("click", function(e){
		newColor=255;
		$('#content').css('background','rgb(255,255,255)');
		$('.txt').html('');
		$('#content h2').html('Let\'s go!');
		closeme();
	})

	function loadPower(secs) {
		$('.start').remove();
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
	    $('#ShowDiv').html( num + '秒');
	    if (num == 0) {
	    	console.log("shake remove!");
	    	$('#content h2').html('Run run run!');
	        window.removeEventListener('shake', shakeEventDidOccur, false);
	    }
	}
	
	$(".run").on("click", function(e){
		alert("Ok ok,let's run~~~");
	})

	function openme() { 
		$(function () {
			topbar.css({'left':'200px' });
			pagebody.css({'left':'200px'});
		});
	}
	function closeme() {
		var closeme = $(function() {
	    	topbar.css({'left':'0px'});
	    	pagebody.css({'left':'0px' });
		});
	}

	$(".start").live("click", function(e){
		loadPower(gameLevel*10);
	});
	// checking whether to open or close nav menu
	$("#menu-btn").live("click", function(e){
		e.preventDefault();
		var leftval = pagebody.css('left');
		if(leftval == "0px") {
			openme();
		}
		else { 
			closeme(); 
		}
	});
	
	// loading page content for navigation
	$("a.navlink").live("click", function(e){
		e.preventDefault();
		var linkurl     = $(this).attr("href");
		var linkhtmlurl = linkurl.substring(1, linkurl.length);
		var imgloader   = '<center style="margin-top: 30px;"><img src="img/preloader.gif" alt="loading..." /></center>';
		closeme();
		$(function() {
			topbar.css("top", "0px");
			window.scrollTo(0, 1);
		});
		content.html(imgloader);
		setTimeout(function() { content.load(linkhtmlurl, function() { /* no callback */ }) }, 1200);
	});
});

