
var fntA = new Object();
var AppRouter = Backbone.Router.extend({  
  routes : {  
    '' : 'mainfunc', 
    'index' : 'mainfunc', 
    'reg' : 'regfunc',
    'run':'runfunc',
    'run/:action':'runfunc',
    '*error' : 'renderError'  
  },
  mainfunc : function() {
   //  console.log('mainfunc'); 
   showSubFrame('homepage','loginbox');
   $('.errormsg').hide();
  }, 
  regfunc : function() {
  	//alert("111");
  	//console.log('levelfunc'); 
  	showSubFrame('homepage','registerbox');
  }, 
  shakefunc : function (level){
  	if(!level){ fntA.level = 1 };
  	fntA.level = level;
  	showFrame('energybox');
  },
  runfunc : function (action){
    if(action === 'replay'){
      fntA.gameOn =  false;
      fntA.gameFinish =  false;
      fntA.shakerecord = 0;
      fntA.shakeEng = 0;
      $('.playrecord').html('0米');
      router.navigate('run');
    }
  	showSubFrame('runbox','qrcodebox');
  	fntRun();
  },
  renderError : function(error) {  
    //  console.log('URL错误, 错误信息: ' + error); 
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
function showMask(framename) {
  if(!framename){ $('.maskbox').hide();}
    $('.maskbox').hide();
  //if(framename !=='homepage' ){ };
  $('.' + framename ).show();
}
function showSubMask(framename,subframename) {
  if(!subframename) {
    $('.' + framename + ' .submask').hide();
    $('.maskbox').hide();
  }else{
    showMask(framename);
    $('.' + framename + ' .submask').hide();
    $('.' + framename + ' .' + subframename).show();
  }
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

function postGameRecord(id,name,record,result){ 
  var postData = 'game_type=0&score='+record + '&user_id=' + id + '&user_name=' + name + '&result=' +result ;
  //  console.log(postData);
  var tempIp = 'http://www.quyeba.com/event/explorerchallenge/'
  $.ajax({type:'POST',url: tempIp +'game/save',data:postData,
    success:function(json){
      //  console.log(json);
      //var jsdata = eval('('+json+')');  
      var jsdata = json;
      //  console.log('status='+ jsdata.status);
      if(result==='win'){
        if (jsdata.point === "success"){
          showSubMask('gamemask','winwithpoint');
        }else{
          showSubMask('gamemask','winwithoutpoint');
        } 
      }else{
        showSubMask('gamemask','lost');
      }

      //console.log('mid='+ jsdata.data.mid );
    },
    error: function(xhr, type){
      showSubMask('gamemask','lost');
    }
  });
}
function postLogin(){
  //  console.log('post login');
  var userName  = $('#uname').val()
  ,   userPwd = $('#upwd').val()
  ,   postData;
  if (!userName || !userPwd){
    alert("请完整填写信息！")
    return false;
  }
  var reMail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  //  console.log(userName.match(reMail));
  if(userName.match(reMail)){
    postData = 'email=' + userName + '&password=' + userPwd ;
  }else{
    postData = 'name=' + userName + '&password=' + userPwd ;
  }
  //  console.log(postData);
  var tempIp = 'http://www.quyeba.com/event/explorerchallenge/'
  $.ajax({type:'POST',url: tempIp +'user/login',data:postData,
    success:function(json){
      //  console.log(json);
      //var jsdata = eval('('+json+')');  
      var jsdata = json;
      if(jsdata.result ==='failed'){
        $('.loginbox .errormsg').show();
        return false;
      }
      //  console.log(jsdata);
      fntA.playerName = jsdata.user_name;
      fntA.playerId = jsdata.user_id;
      fntA.playerAvatar = 'http://tnf-avatar.b0.upaiyun.com/'+jsdata.user_avatar;
      router.navigate('run');
      showSubFrame('runbox','qrcodebox');

      $('.playerinfoa .playername').html(fntA.playerName);
      if(jsdata.user_avatar!==''){
        $('.playerinfoa img').attr('src',fntA.playerAvatar);
      }
      $('.loginbox .errormsg').hide();
      
      //console.log('mid='+ jsdata.data.mid );
    },
    error: function(xhr, type){
      //  console.log('Ajax error!')
      $('.loginbox .errormsg').show();
    }
  });
  fntRun();
}
function postRegister(){
  var userName  = $('#regumail').val()
  ,   userMail  = $('#reguname').val()
  ,   userPwd = $('#regupwd').val()
  ,   userPwd2 = $('#regupwd2').val()
  ,   postData;
  if (!userName || !userPwd || !userMail || !userPwd2){
    $('.registerbox .errormsg').html('请完整填写信息！').show();
    return false;
  }
  if(userPwd!==userPwd2){
    $('.registerbox .errormsg').html('请确认两次输入密码相同！').show();
    return false;
  }
  $('.loginbox .errormsg').hide();
  var reMail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  //  console.log('post register, regumail=' + userMail + ', valmail=' + userMail.match(reMail));
  // if(userMail.match(reMail)){
  //   alert("请正确填写邮箱信息！")
  //   return false;
  // }
  postData = 'name=' + userName + '&email=' + userMail + '&password=' + userPwd ;
  //  console.log(postData);
  var tempIp = 'http://www.quyeba.com/event/explorerchallenge/'
  $.ajax({type:'POST',url: tempIp +'user/register',data:postData,
    success:function(json){
      //  console.log(json);
      //var jsdata = eval('('+json+')');
      var jsdata = json;
      if(jsdata.result ==='failed'){
        $('.registerbox .errormsg').html('很抱歉，请检查您填写的信息。').show();
        return false;
      }
      //console.log('status='+ jsdata.result);
      fntA.playerName = jsdata.user_name;
      fntA.playerId = jsdata.user_id;
      fntA.playerAvatar = jsdata.user_avatar;
      router.navigate('run');
      showSubFrame('runbox','qrcodebox');
      //console.log('mid='+ jsdata.data.mid );
    },
    error: function(xhr, type){
      //  console.log('Ajax error!')
    }
  });
  fntRun();
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
  fntA.pcplayerName = [
    '何川',
    '李北基',
    '李赞',
    '刘洋',
    '孙斌',
    '孙少轩',
    '覃巍巍',
    '王小源',
    '王智珣',
    '王子健' ,
    '魏广广' ,
    '运艳桥' ,
    '周鹏' ,
    '邢如伶'  ];
}

//main run
function fntRun(){
  fntA.requestId = 0;
  fntA.startime = 0;
  fntA.image0 = new Image();  
  fntA.image1 = new Image();  
  fntA.image2 = new Image();
  fntA.image3 = new Image();  
  fntA.image4 = new Image();  
  fntA.image5 = new Image();
  fntA.path0 = new Image();  
  fntA.path1 = new Image();  
  fntA.path2 = new Image();
  fntA.path3 = new Image();  
  fntA.path4 = new Image();  
  fntA.path5 = new Image();
  fntA.imageMini = new Image();
  fntA.w = 320;  
  fntA.h = 491; 
  var ctx0,ctx1;  
  var y0,y1,y2,y3,y4,y5;  
  fntA.gameLevel = 1;
  fntA.allmoveA = 0;
  fntA.allmoveB = 0;
  fntA.alltimes = 0;
  fntA.mapitem = 16;

  funMapload();
  function countdownNewTime(secs) {
    //countdown
    secs = Number(secs);
    for (var i = secs; i >= 0; i--) {
      (function(index) {
        setTimeout(function(){
        doUpdateTime(index);
      }, (secs - index) * 1000);
    })(i);
    }
  }
  function doUpdateTime(num) {
    $('.gamemask .countdown').html('<span class="'+ num + '">' + num + '</span>');
    if(num === 0) {
      if(!fntA.startime){
        showSubMask('gamemask');
        start();
      }
    }
  }
  function countdownGameTime(secs) {
    //countdown
    secs = Number(secs);
    for (var i = secs; i >= 0; i--) {
      (function(index) {
        setTimeout(function(){
        doUpdateGameTime(index);
      }, (secs - index) * 1000);
    })(i);
    }
  }
  function doUpdateGameTime(num) {
    $('.gametime .countdown').html('<span class="'+ num + '">' + num + '</span>');
    if(num === 0) {
      if(!fntA.gameFinish){
        fntA.gameFinish = true;
      }
    }
  }
  function runInit() {
    ctx0 =  document.getElementById('canvas').getContext('2d');
    ctx1 =  document.getElementById('canvas2').getContext('2d');
    cpx0 =  document.getElementById('path1').getContext('2d');
    cpx1 =  document.getElementById('path2').getContext('2d');
    ctxMini =  document.getElementById('minimap').getContext('2d');
    fntA.mapArr = new Array();
    fntA.mapPathArr = new Array();
    y0 = 0;
    y1 = -1*fntA.h;
    y2 = -2*fntA.h;
    y3 = 0;
    y4 = -1*fntA.h;
    y5 = -2*fntA.h;
    if(!fntA.playerName){
    }else{
      $('.playerinfoa .playername').html(fntA.playerName);
    }
    

    //the hard game level
    var defLevel = fRandomBy(1,100);
    if(defLevel>49){
      fntA.gameLevel = 2;
    }
    //the hard game level

      //generat map
      if(fntA.gameLevel != 3){
        for (var i = fntA.mapitem - 1; i >= 0; i--) {
          if (i === 9){
            fntA.mapArr.push(fntA.imgArr[9]);
            fntA.mapPathArr.push(fntA.pathArr[9]);
          }else if (i === 4){
            fntA.mapArr.push(fntA.imgArr[10]);
            fntA.mapPathArr.push(fntA.pathArr[10]);
          }else if (i === 0){
            fntA.mapArr.push(fntA.imgArr[11]);
            fntA.mapPathArr.push(fntA.pathArr[9]);
          }else if (i>9){
            var txt = fntA.imgArr[fRandomBy(0,2)]
            fntA.mapArr.push(txt);
            txt = txt.replace(/jpg/g,"gif");
            fntA.mapPathArr.push(txt);
          }else if (i<9 && i>4){
            var txt = fntA.imgArr[fRandomBy(3,5)]
            fntA.mapArr.push(txt);
            txt = txt.replace(/jpg/g,"gif");
            fntA.mapPathArr.push(txt);
          }else if (i<4){
            var txt = fntA.imgArr[fRandomBy(6,8)]
            fntA.mapArr.push(txt);
            txt = txt.replace(/jpg/g,"gif");
            fntA.mapPathArr.push(txt);
          }
        };
        //  console.log(fntA.mapArr);
      }
      //set map image
      fntA.image0.src = fntA.mapArr[0];  
      fntA.image1.src = fntA.mapArr[1];
      fntA.image2.src = fntA.mapArr[2];
      fntA.image3.src = fntA.mapArr[0];  
      fntA.image4.src = fntA.mapArr[1];
      fntA.image5.src = fntA.mapArr[2];
      fntA.path0.src = fntA.mapPathArr[0];
      fntA.path1.src = fntA.mapPathArr[1]; 
      fntA.path2.src = fntA.mapPathArr[2];
      fntA.path3.src = fntA.mapPathArr[0];  
      fntA.path4.src = fntA.mapPathArr[1];  
      fntA.path5.src = fntA.mapPathArr[2];
      fntA.imageMini.src = fntA.imgArr[12];
    var i = fntA.pcplayerName.length;
    var t = fRandomBy(0,i);
    if(!fntA.pcplayerName[t]){
      $('.playerinfob .playername').html('TNF运动员  李北基');
      $('.playerinfob img').attr('src','img/player/李北基.jpg');
    }else{
      $('.playerinfob .playername').html('TNF运动员  '+fntA.pcplayerName[t]);
      $('.playerinfob img').attr('src','img/player/' + fntA.pcplayerName[t] + '.jpg');
    }
      



    setTimeout(function () {
      ctx0.drawImage(fntA.image0,0,y0,fntA.w,fntA.h);  
      ctx0.drawImage(fntA.image1,0,y1,fntA.w,fntA.h);  
      ctx0.drawImage(fntA.image2,0,y2,fntA.w,fntA.h);
      ctx1.drawImage(fntA.image3,0,y3,fntA.w,fntA.h);  
      ctx1.drawImage(fntA.image4,0,y4,fntA.w,fntA.h);  
      ctx1.drawImage(fntA.image5,0,y5,fntA.w,fntA.h); 
      ctxMini.drawImage( fntA.imageMini,9,430,29,28);
      ctxMini.drawImage( fntA.imageMini,59,430,29,28);
      cpx0.drawImage(fntA.path0,0,y0,fntA.w,fntA.h);  
      cpx0.drawImage(fntA.path1,0,y1,fntA.w,fntA.h);  
      cpx0.drawImage(fntA.path2,0,y2,fntA.w,fntA.h);
      cpx1.drawImage(fntA.path3,0,y3,fntA.w,fntA.h);  
      cpx1.drawImage(fntA.path4,0,y4,fntA.w,fntA.h);  
      cpx1.drawImage(fntA.path5,0,y5,fntA.w,fntA.h); 
      //  console.log('draw default map image');
    }, 40);


  }
  //}
  runInit();
    function start() {
      
      fntA.moveA = 1;
      fntA.moveB = 2;
      fntA.allmoveA = 0;
      fntA.allmoveB = 0;
      fntA.alltimes = 0;
      fntA.alltimesB = 0;
      fntA.shakeEng = 0;
      countdownGameTime(20);

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
      //clear
      //ctx0.clearRect(0,0,fntA.w,fntA.h);
      //ctx1.clearRect(0,0,fntA.w,fntA.h); 
      ctxMini.clearRect(0,0,fntA.w,fntA.h);     
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
      ctx1.clearRect(0,0,fntA.w,fntA.h); 
      ctxMini.clearRect(0,0,fntA.w,fntA.h);
      cpx0.clearRect(0,0,fntA.w,fntA.h);
      cpx1.clearRect(0,0,fntA.w,fntA.h);
      //draw now
      var move = Math.floor(fntA.moveA);
      var moveB = Math.floor(fntA.moveB);
      //ctx a
      y0 +=move;  
      y1 +=move;  
      y2 +=move; 
      //console.log("new: y0=" + y0 + ",y1=" + y1 + ",y2=" + y2 + ",move=" + move + ",fntA.moveA=" + fntA.moveA); 
      if(y0>=fntA.h){  
        //y0=move-2*fntA.h;  
        y0 = Math.min(y1,y2) - fntA.h;
        fntA.alltimes++;
        fntA.image0.src = fntA.mapArr[wayRoll((Number(fntA.alltimes)+3))]; 
        //  console.log("y0 new image:" + fntA.image0.src + "fntA.alltimes:"+fntA.alltimes);
      }  
      if(y1>=fntA.h){  
        y1 = Math.min(y0,y2) - fntA.h;
        fntA.alltimes++;
        fntA.image1.src = fntA.mapArr[wayRoll((Number(fntA.alltimes)+3))];
        //  console.log("y1 new image:" + fntA.image1.src+ "fntA.alltimes:"+fntA.alltimes);
      }  
      if(y2>=fntA.h){  
        y2 = Math.min(y0,y1) - fntA.h;
        fntA.alltimes++; 
        fntA.image2.src = fntA.mapArr[wayRoll((Number(fntA.alltimes)+3))];
        //  console.log("y2 new image:" + fntA.image2.src+ "fntA.alltimes:"+fntA.alltimes);
      }  
      //draw now
      ctx0.drawImage(fntA.image0,0,y0,fntA.w,fntA.h);  
      ctx0.drawImage(fntA.image1,0,y1,fntA.w,fntA.h);  
      ctx0.drawImage(fntA.image2,0,y2,fntA.w,fntA.h);
      cpx0.drawImage(fntA.path0,0,y0,fntA.w,fntA.h);  
      cpx0.drawImage(fntA.path1,0,y1,fntA.w,fntA.h);  
      cpx0.drawImage(fntA.path2,0,y2,fntA.w,fntA.h);

      //ctx b
      y3 = y3 + moveB;  
      y4 = y4 + moveB;  
      y5 = y5 + moveB; 
      
      //console.log("new: y3=" + y3 + ",y4=" + y4 + ",y5=" + y5 + ",moveB=" + moveB + ",fntA.moveB=" + fntA.moveB); 
      if(y3>=fntA.h){  
        y3 = Math.min(y4,y5) - fntA.h; 
        fntA.alltimesB++;
        fntA.image3.src = fntA.mapArr[wayRoll((Number(fntA.alltimesB)+3))]; 
        //  console.log("y3 new image:" + fntA.image3.src+ "fntA.alltimesB:"+fntA.alltimesB + ",image id:" + (Number(fntA.alltimesB)+3));
      }  
      if(y4>=fntA.h){  
        y4 = Math.min(y3,y5) - fntA.h; 
        fntA.alltimesB++;
        fntA.image4.src = fntA.mapArr[wayRoll((Number(fntA.alltimesB)+3))];
        //  console.log("y4 new image:" + fntA.image4.src+ "fntA.alltimesB:"+fntA.alltimesB+ ",image id:" + (Number(fntA.alltimesB)+3));
      }  
      if(y5>=fntA.h){  
        y5 = Math.min(y3,y4) - fntA.h;
        fntA.alltimesB++; 
        fntA.image5.src = fntA.mapArr[wayRoll((Number(fntA.alltimesB)+3))];
        //  console.log("y5 new image:" + fntA.image5.src+ "fntA.alltimesB:"+fntA.alltimesB+ ",image id:" + (Number(fntA.alltimesB)+3));
      }  
      ctx1.drawImage(fntA.image3,0,y3,fntA.w,fntA.h);  
      ctx1.drawImage(fntA.image4,0,y4,fntA.w,fntA.h);  
      ctx1.drawImage(fntA.image5,0,y5,fntA.w,fntA.h);
      cpx1.drawImage(fntA.path3,0,y3,fntA.w,fntA.h);  
      cpx1.drawImage(fntA.path4,0,y4,fntA.w,fntA.h);  
      cpx1.drawImage(fntA.path5,0,y5,fntA.w,fntA.h); 

      //set requestId
      fntA.requestId = window.requestAFrame(render);
      //set stop process
      if(fntA.shakeEng < 3){
        fntA.moveA = fntA.moveA * 0.977;
        if (fntA.moveA<0.8) {fntA.moveA=0.8};
      }else{
        if (fntA.moveA<6) {fntA.moveA = fntA.moveA * 1.12;}
        
      }
      //console.log("old: y0=" + y0 + ",y1=" + y1 + ",y2=" + y2 + ",move=" + move + ",fntA.alltimes=" + fntA.alltimes);
      //if(fntA.moveA<=4){
      fntA.allmoveA +=move; 
      fntA.allmoveB +=moveB; 
      fntA.shakeEng = fntA.shakeEng -1;
      if (fntA.shakeEng<1) { fntA.shakeEng = 1};
      if (fntA.allmoveA===fntA.allmoveB){fntA.allmoveA=fntA.allmoveA+1;}
      $(".playerinfoa .playrecord").html(fntA.allmoveA + '米');
      $(".playerinfob .playrecord").html(fntA.allmoveB + '米');

      //game resort
      if( fntA.gameFinish ){
        //  console.log("stop running at " + time + ", and allmoveA = " + fntA.allmoveA + ",fntA.alltimes= " +fntA.alltimes);
        stop();
        showSubMask('gamemask','loading');
        if(fntA.allmoveA>=fntA.allmoveB){ 
          fntA.gameResult = 'win';
        }else{
          fntA.gameResult = 'lost';
        }
        //id,name,record,result
        postGameRecord(fntA.playerId,fntA.playerName,fntA.allmoveA,fntA.gameResult);
        fntA.gameFinish = true;
      }
      //Game AI
      if(fntA.gameLevel ===1 ){
        if( (fntA.allmoveA - fntA.allmoveB) >100 ){
          fntA.moveB = fntA.moveB * 1.10;
        }
        if( (fntA.allmoveB - fntA.allmoveA) >650 ){
          fntA.moveB = fntA.moveB * 0.9992;
        }
        fntA.moveB = Math.min( 5, Math.max(1,fntA.moveB));
      }else if(fntA.gameLevel ===2){
        if( (fntA.allmoveA - fntA.allmoveB) >20 ){
          fntA.moveB = fntA.moveB * 1.05;
        }
        if( (fntA.allmoveA - fntA.allmoveB) >250 ){
          fntA.moveB = fntA.moveB * 1.19;
        }
        if( (fntA.allmoveB - fntA.allmoveA) >600 ){
          fntA.moveB = fntA.moveB * 0.9992;
        }
        fntA.moveB = Math.min( 7, Math.max(4,fntA.moveB));
      }
      // var tmpPlayerTopa , tmpPlayerTopb;
      // tmpPlayerTopa = 320 - fntA.moveA*8;
      // tmpPlayerTopb = 320 - fntA.moveB*10;
      // $('.playera').css('top',tmpPlayerTopa+'px');
      // $('.playerb').css('top',tmpPlayerTopb+'px');
      //the hard game level
      //mini map
      var tmpMinia = 430 - (fntA.allmoveA * fntA.h/8600)
      ,   tmpMinib = 430 - (fntA.allmoveB * fntA.h/8600);
      //console.log('tmpMinib:' +tmpMinia+',tmpMinib:' + tmpMinia);
      ctxMini.drawImage( fntA.imageMini,9,tmpMinia,29,28);
      ctxMini.drawImage( fntA.imageMini,59,tmpMinib,29,28);

      //player go as path
      var newP1X = getPlayerX('path1') - 20
      ,   newP2X = getPlayerX('path2') + 396  ;
      //  console.log('newP1X:'+ newP1X + ',newP2X:' + newP2X);
      $('.playera').css('left',newP1X+'px');
      $('.playerb').css('left',newP2X+'px');

      function getPlayerX(canvasName) {
        var x = 150
        ,   imageData = cpx0.getImageData(0, 320, 300,1);
        if( canvasName == "path2"){
          imageData = cpx1.getImageData(0, 320, 300,1);
        }
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
  // NodeJS Server
  var nodejs_server = "222.73.241.58:8081";
  // connect
  var socket = io.connect("http://" + nodejs_server);

  socket.on("get_response", function (b) {
    var combine = b.key + "_" + b.act;
    //console.log(combine);
    switch (combine) {
      // when open m.page，call enter event，then show the game
      case fntA.key + "_enter":
        setTimeout(function () {
          if(fntA.allmoveB==0){
            showSubFrame('runbox','rundivbox');
            showSubMask('gamemask','howplay');
          }
        }, 500);
        break;
      // shake event
      case fntA.key + "_changebg":
        //console.log('fntA.gameOn:' + fntA.gameOn +'fntA.shakerecord:' + fntA.shakerecord +'fntA.gameFinish:' + fntA.gameFinish );
        if(!fntA.gameOn && fntA.shakerecord<15){
          showSubMask('gamemask','connection');
          fntA.gameOn = true;
        }else if(fntA.gameOn && fntA.shakerecord===15 && !fntA.gameFinish){
          showSubMask('gamemask','countdown');
          //console.log('call 1 countdown');
          countdownNewTime(3);
        }
        shakeEventDidOccur();
        if(fntA.shakeEng<3 && fntA.moveA <1){
          fntA.moveA = 2;
        }
        if(fntA.shakeEng<50){
          fntA.shakeEng = fntA.shakeEng + 4 ;
        }

        break;
    }
  });

}
function shakeEventDidOccur() {
  //put your own code here etc.
  fntA.shakerecord = fntA.shakerecord + 1;
}


$(document).ready(function(){
	fntA.key = NewGuid();
	var pageUrl = window.location.href;
	pageUrl=pageUrl.replace(/index.html#\/run/g,"m.html");
  pageUrl=pageUrl.replace(/index.html#run/g,"m.html");
  pageUrl=pageUrl.replace(/index.html#\/reg/g,"m.html");
  pageUrl=pageUrl.replace(/index.html#reg/g,"m.html");
  pageUrl=pageUrl.replace(/index.html/g,"m.html");

	fntA.gameLevel = 1;
	fntA.shakerecord = 0;
  fntA.playerId = '278400';
  fntA.playerName = 'vxx11';
  fntA.gameOn = false ;
  fntA.gameOn = false ;

  var loadedImages = 0;

	//run
	
  var newUrl = pageUrl +"?key=" +fntA.key;
	$("#qrcode").append("<img src='http://chart.apis.google.com/chart?chs=320x320&cht=qr&chld=H|2&chl="+ newUrl + "&choe=UTF-8' />");
  //  console.log( newUrl);
  //postRegiste
  $(".btn_register").on("click", function(){
    postRegister();
  });
  //login
  $(".btn_login").on("click", function(){
    postLogin();
  });
  


});


