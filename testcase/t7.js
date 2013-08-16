    window.requestAFrame = (function () {
        return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                // if all else fails, use setTimeout
                function (callback) {
                    return window.setTimeout(callback, 1000 / 31); // shoot for 60 fps
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


function fntRun(){
    var requestId = 0;
    var startime = 0;
    var ctx0;  
    var image0 = new Image();  
    var image1 = new Image();  
    var image2 = new Image();

    var w = 320;  
    var h = 500; 
    var y0,y1,y2;  
    //var moveA = 50; 
    fntA.moveA = 50;
    fntA.imgArr = [
      '../www/img/map_a_01.jpg',
      '../www/img/map_a_01.jpg',
      
    ] 


    function runInit() {
      ctx0 =  document.getElementById('canvas').getContext('2d');
      image0.src = "../www/img/map_a_01.jpg";  
      image1.src = "../www/img/map_a_02.jpg";
      image2.src = "../www/img/map_a_03.jpg";
      y0 = 0;
      y1 = 2*h;
      y2 = h;

    }

    function start() {
      runInit();
      fntA.moveA = 50;
      //console.log("start");
      // if (window.performance.now) {
      //     startime = window.performance.now();
      // } else {
          startime = Date.now();
      // }
      //alert("start");
      requestId = window.requestAFrame(render);
    }
    function stop() {
      if (requestId)
        window.cancelAFrame(requestId);        
    }

    function render(time) {
      //elm.style.left = ((time - startime) / 4 % 600) + "px";
      //clear
      ctx0.clearRect(0,0,w,h);  
      //draw now
      var move = Math.floor(fntA.moveA);
      y0 +=move;  
      y1 +=move;  
      y2 +=move;  
      if(y0>=2*h)  
      {  
          y0=move-h;  
      }  
      if(y1>=2*h)  
      {  
          y1=move-h;  
      }  
      if(y2>=2*h)  
      {  
          y2=move-h;  
      }  

      ctx0.drawImage(image0,0,y0,w,h);  
      ctx0.drawImage(image1,0,y1,w,h);  
      ctx0.drawImage(image2,0,y2,w,h); 

      requestId = window.requestAFrame(render);
      fntA.moveA = fntA.moveA * 0.992;

      //console.log("move:" + move);
      if(fntA.moveA<=0.2){
        console.log("quit draw");
        stop();
      }
    }
    // handle multiple browsers for requestAnimationFrame()

    runInit();
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