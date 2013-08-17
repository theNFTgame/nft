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
    fntA.imgArr = [
      '../www/img/map_a_01.jpg',
      '../www/img/map_a_02.jpg',
      '../www/img/map_a_03.jpg',
      '../www/img/map_b_01.jpg',
      '../www/img/map_b_02.jpg',
      '../www/img/map_b_03.jpg',
      '../www/img/map_c_01.jpg',
      '../www/img/map_c_02.jpg',
      '../www/img/map_c_03.jpg',
      '../www/img/map_a_b.jpg' ,
      '../www/img/map_b_c.jpg' ,
      '../www/img/map_c_a.jpg' ];
    fntA.allmove = 0;
    fntA.alltimes = 0;

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
          }else if (i === 2){
            fntA.mapArr.push(fntA.imgArr[10]);
          }else if (i>7){
            fntA.mapArr.push(fntA.imgArr[fRandomBy(0,2)]);
          }else if (i<7 && i>2){
            fntA.mapArr.push(fntA.imgArr[fRandomBy(3,5)]);
          }else if (i<2){
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
        fntA.moveA = fntA.moveA * 0.98;
      }
      

      console.log("old: y0=" + y0 + ",y1=" + y1 + ",y2=" + y2 + ",move=" + move + ",fntA.alltimes=" + fntA.alltimes);
      if(fntA.moveA<=4){
        console.log("stop running at " + time + ", and allmove = " + fntA.allmove + ",fntA.alltimes= " +fntA.alltimes);
        stop();
      }
      fntA.allmove +=move; 
      
    }
    // handle multiple browsers for requestAnimationFrame()

    //runInit();
    $('.start').on('click',function(){
      start();
    });
    $('.stop').on('click',function(){
      stop();
    });

}


var fntA = new Object();
$(document).ready(function(){

  fntRun();
});