
var fntA = new Object();
var AppRouter = Backbone.Router.extend({  
  routes : {  
    '' : 'levelfun', 
    'index' : 'levelfun', 
    'intro' : 'levelfun',
    'replay' : 'repowerfun',
    'repower' : 'repowerfun',
    'level' : 'levelfun',
    'shake' : 'shakefun',
    'shake/:level' : 'shakefun',
    'run':'runfun',
    'coupon':'couponfun',
    'nocoupon':'nocouponfun',
    'more':'morefun',
    '*error' : 'renderError'  
  },
  mainfun : function() {

  }, 
  couponfun : function(){
    $('.mask').hide();
    $('.maskbg').show();
    $('.couponbox').show();
    $('.nocouponbox').hide();

  },
  nocouponfun : function() {
    $('.mask').hide();
    $('.maskbg').show();
    $('.couponbox').hide();
    $('.nocouponbox').show();
  },
  morefun : function(){
    $('.mask').hide();
    $('.maskbg').hide();
  },
  levelfun : function() {
  	//alert("111");
  	console.log('levelfun');

  	showSubFrame('homepage','levelbox');
    $('.energybox').removeClass('energybox_on');
    $('.logo').show();
    $('.mask').hide();
    $('.maskbg').hide();
    $('.redbg').css('opacity',0);
  }, 
  repowerfun : function() {
    router.navigate('index');
    window.location.reload();
  }, 
  shakefun : function (level){
  	console.log('lelve:'+ level);
    fntA.gameLevel = level;
    console.log('fntA.gameLevel:'+ fntA.gameLevel);
    $('.introbox .txt1').removeClass('txt1_l1 txt1_l2 txt1_l3').addClass('txt1_l'+fntA.gameLevel);
    $('.energybox').addClass('energybox_on');
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

function postGameRecordSingle(record){ 
  var postData = 'game_type=1&score='+record ;
  //  console.log(postData);
/*
请先调用 game/save, 注意传入的game_type为1（单机游戏）和score，没有game_result。其它参数和双屏游戏相同。
然后在刮奖时调用  game/reward获得优惠券号码。

返回

失败：
 {"result":"failed","message":"no game data found"}
成功：
 {"result":"success","message":"","game_id":54,"user_id":"124578","user_name":"cgzhang2003","coupon_id":123,"coupon_code":xxx,"coupon_discount":null,"coupon_description":null}
​
如果没有获奖则coupon_code为空。
*/

  var tempIp = 'http://www.quyeba.com/event/explorerchallenge/'
  $.ajax({type:'POST',url: tempIp +'game/save',data:postData,
    success:function(json){
        console.log(json);
      //var jsdata = eval('('+json+')');  
      var jsdata = json;
        console.log('status='+ jsdata.status);
      if(jsdata.result==='success'){
        if (jsdata.coupon_code != null){
          $('.getcoupon').attr('url', '#/coupon');
          $('.couponbox .cp').html(jsdata.coupon_code);
        }else{
          $('.getcoupon').attr('url', '#/nocouponbox');
        } 
      }else{
        $('.getcoupon').attr('url', '#/nocouponbox');
      }

      //console.log('mid='+ jsdata.data.mid );
    },
    error: function(xhr, type){
      $('.getcoupon').attr('url', '#/nocouponbox');
    }
  });
}

function funMapload(){
	fntA.imgArr = [
    'img/map/map_a_01.jpg',//0
    'img/map/map_a_02.jpg',//1
    'img/map/map_a_03.jpg',//2
    'img/map/map_b_01.jpg',//3
    'img/map/map_b_02.jpg',//4
    'img/map/map_b_03.jpg',//5
    'img/map/map_c_01.jpg',//6
    'img/map/map_c_02.jpg',//7
    'img/map/map_c_03.jpg',//8
    'img/map/map_a_b.jpg' ,//9
    'img/map/map_b_c.jpg' ,//10
    'img/map/map_c_a.jpg' ,//11
    'img/player-mini.png'];//12
  fntA.pathArr = [
    'img/map/map_a_01.gif',
    'img/map/map_a_02.gif',
    'img/map/map_a_03.gif',
    'img/map/map_b_01.gif',
    'img/map/map_b_02.gif',
    'img/map/map_b_03.gif',
    'img/map/map_c_01.gif',
    'img/map/map_c_02.gif',
    'img/map/map_c_03.gif',
    'img/map/map_a_b.gif' ,
    'img/map/map_b_c.gif' ,
    'img/map/map_c_a.gif'];
}

function fntRun(){
  fntA.requestId = 0;
  fntA.startime = 0;
  fntA.image0 = new Image();  
  fntA.image1 = new Image();  
  fntA.image2 = new Image();
  fntA.path0 = new Image();  
  fntA.path1 = new Image();  
  fntA.path2 = new Image();
  fntA.w = 320;  
  fntA.h = 491; 
  var ctx0;  
  var y0,y1,y2;  
  // if( !fntA.gameLevel ){ fntA.gameLevel = 1; };
  fntA.allmove = 0;
  fntA.alltimes = 0;
  fntA.mapitem = 40;
  fntA.mapPathArr = [];

  funMapload();

  function runInit() {
    ctx0 =  document.getElementById('canvas').getContext('2d');
    cpx0 =  document.getElementById('path1').getContext('2d');
    fntA.mapArr = new Array();
    y0 = 0;
    y1 = -1*fntA.h;
    y2 = -2*fntA.h;
    //generat map
    //console.log(fntA.gameLevel);
    if(fntA.gameLevel==1){
      for (var i = fntA.mapitem - 1; i >= 0; i--) {
        fntA.mapArr.push(fntA.imgArr[fRandomBy(0,2)]);
        fntA.mapPathArr.push(fntA.pathArr[fRandomBy(0,2)]);
      }
    }
    if (fntA.gameLevel==2){
      for (var i = fntA.mapitem - 1; i >= 0; i--) {
        if (i === 0){
          fntA.mapArr.push(fntA.imgArr[10]);
          fntA.mapPathArr.push(fntA.pathArr[10]);
        }else if (i>0){
          fntA.mapArr.push(fntA.imgArr[fRandomBy(0,2)]);
          fntA.mapPathArr.push(fntA.pathArr[fRandomBy(0,2)]);
        }
      }
    }
    if (fntA.gameLevel==3){
      for (var i = fntA.mapitem - 1; i >= 0; i--) {
        if (i === 20){
          fntA.mapArr.push(fntA.imgArr[9]);
          fntA.mapPathArr.push(fntA.pathArr[9]);
        }else if (i === 10){
          fntA.mapArr.push(fntA.imgArr[10]);
          fntA.mapPathArr.push(fntA.pathArr[10]);
        }else if (i === 0){
          fntA.mapArr.push(fntA.imgArr[11]);
          fntA.mapPathArr.push(fntA.pathArr[11]);
        }else if (i>20){
          var txt = fntA.imgArr[fRandomBy(0,2)]
            fntA.mapArr.push(txt);
            txt = txt.replace(/jpg/g,"gif");
            fntA.mapPathArr.push(txt);
        }else if (i<20 && i>10){
          var txt = fntA.imgArr[fRandomBy(3,5)]
            fntA.mapArr.push(txt);
            txt = txt.replace(/jpg/g,"gif");
            fntA.mapPathArr.push(txt);
        }else if (i<10){
          var txt = fntA.imgArr[fRandomBy(6,8)]
            fntA.mapArr.push(txt);
            txt = txt.replace(/jpg/g,"gif");
            fntA.mapPathArr.push(txt);
        }
      }
    }
      console.log(fntA.mapArr);
      console.log(fntA.mapPathArr);
      console.log(fntA.mapArr.length + ',' + fntA.mapPathArr.length);

      //set map image
      fntA.image0.src = fntA.mapArr[0];  
      fntA.image1.src = fntA.mapArr[1];
      fntA.image2.src = fntA.mapArr[2];
      fntA.path0.src = fntA.mapPathArr[0];
      fntA.path1.src = fntA.mapPathArr[1]; 
      fntA.path2.src = fntA.mapPathArr[2];
    }

    function start() {
      runInit();
      fntA.moveA = Math.max((fntA.gameLevel*2.9 - 0.6), 3);
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
      console.log('in='+e);
      if((e+5) > fntA.mapitem ){
        e = (e+5) % fntA.mapitem;
      }
      console.log('out='+e);
      return e;
    }
    function render(time) {

      //clear

      ctx0.clearRect(0,0,fntA.w,fntA.h);  
      cpx0.clearRect(0,0,fntA.w,fntA.h); 
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
        console.log("y0 new image:" + fntA.image0.src + ",imageitem:"+ wayRoll((Number(fntA.alltimes)+3)) +",fntA.alltimes:"+fntA.alltimes);
        fntA.path0.src = fntA.mapPathArr[wayRoll((Number(fntA.alltimes)+3))];
        console.log(fntA.path0.src);
      }  
      if(y1>=fntA.h){  
        y1 = Math.min(y0,y2) - fntA.h;
        fntA.alltimes++;
        fntA.image1.src = fntA.mapArr[wayRoll((Number(fntA.alltimes)+3))];
        console.log("y1 new image:" + fntA.image1.src+ ",imageitem:"+ wayRoll((Number(fntA.alltimes)+3)) +",fntA.alltimes:"+fntA.alltimes);
        fntA.path1.src = fntA.mapPathArr[wayRoll((Number(fntA.alltimes)+3))];
        console.log(fntA.path1.src);
      }  
      if(y2>=fntA.h){  
        y2 = Math.min(y0,y1) - fntA.h;
        fntA.alltimes++; 
        fntA.image2.src = fntA.mapArr[wayRoll((Number(fntA.alltimes)+3))];
        console.log("y2 new image:" + fntA.image2.src+ ",imageitem:"+ wayRoll((Number(fntA.alltimes)+3)) +",fntA.alltimes:"+fntA.alltimes);
        fntA.path2.src = fntA.mapPathArr[wayRoll((Number(fntA.alltimes)+3))];
        console.log(fntA.path2.src);
      } 

      //draw now
      ctx0.drawImage(fntA.image0,0,y0,fntA.w,fntA.h);  
      ctx0.drawImage(fntA.image1,0,y1,fntA.w,fntA.h);  
      ctx0.drawImage(fntA.image2,0,y2,fntA.w,fntA.h);
      cpx0.drawImage(fntA.path0,0,y0,fntA.w,fntA.h);  
      cpx0.drawImage(fntA.path1,0,y1,fntA.w,fntA.h);  
      cpx0.drawImage(fntA.path2,0,y2,fntA.w,fntA.h);

      //set requestId
      fntA.requestId = window.requestAFrame(render);

      //set stop process
      if(fntA.allmove > fntA.shakerecord * fRandomBy(70,79)){
        fntA.moveA = fntA.moveA * 0.98;
      }
      //console.log("old: y0=" + y0 + ",y1=" + y1 + ",y2=" + y2 + ",move=" + move + ",fntA.alltimes=" + fntA.alltimes);
      
      if(fntA.moveA<=0.9){
        console.log("stop running at " + time + ", and allmove = " + fntA.allmove + ",fntA.alltimes= " +fntA.alltimes);
        stop();
        $('.recordbox').show();
        $('.maskbg').show();
        $('.logo').hide();
        $('.recordbox .mi').html(fntA.allmove);
        var newPx = new Number(Number(fntA.allmove)/(Number(fntA.gameLevel)*5123));
        $('.recordbox .px').html(newPx.toFixed(2)*100 + '%');
        postGameRecordSingle(fntA.shakerecord);
      }
      fntA.allmove +=move; 

      //player go as path
      var newP1X = getPlayerX('path1') - 20 ;
      //  console.log('newP1X:'+ newP1X + ',newP2X:' + newP2X);
      $('.player').css('left',newP1X+'px');

      function getPlayerX(canvasName) {
        var x = 150
        ,   imageData = cpx0.getImageData(0, 320, 300,1);
        var pix = imageData.data;
        //console.log(pix);
        for (var i = 0, n = pix.length; i < n; i += 4) {  
          if (pix[i] >250 && pix[i+1] >250 && pix[i+2] >250 ){
            x = i/4 ;
            break;
          }
        }
        return x;
      }
      
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

  // fntA.gameLevel = 1;
  fntA.shakerecord = 0;
  var shakeTime = new Date(), newColor=70;

//window.addEventListener('shake', shakeEventDidOccur, false);
//define a custom method to fire when shake occurs.



function loadPower(secs) {
    
    secs = Number(secs);

    window.addEventListener('shake', shakeEventDidOccur, false);
	  //define a custom method to fire when shake occurs.

}

function doUpdateTime(num) {
  //document.getElementById('ShowDiv').innerHTML = '' + num + '秒';
  //alert(num);
  var opacity = ((fntA.gameLevel*10 - num + 0.1) / fntA.gameLevel*10)/100  ;
  console.log('fntA.gameLevel:'+ fntA.gameLevel + ',opacity:' + opacity);
  $('.redbg').css('opacity',opacity);
  $('.debuginfo').html( num + '秒,power:' + fntA.shakerecord );
  $('.powerbox .countdown').html( num );
  
  if (num == 0) {
    console.log("shake remove!");
    $('.debuginfo').html('<a class="navlink linkrun" href="#/run">Run with power:'+ fntA.shakerecord +'</a>');
    window.removeEventListener('shake', shakeEventDidOccur, false);
    showSubFrame('energybox','readybox');
  }
}
function shakeEventDidOccur () {
  //put your own code here etc.

  fntA.shakerecord = fntA.shakerecord + 1;

  if (fntA.shakerecord === 1 ){
    showSubFrame('energybox','powerbox');
  }
  

  if (fntA.shakerecord === 2 ){
    var secs = fntA.gameLevel*10;
    for (var i = secs; i >= 0; i--) {
      (function(index) {
        setTimeout(function(){
        doUpdateTime(index);
      }, (secs - index) * 1000);
    })(i);
  }
}

}




$(document).ready(function(){


});

