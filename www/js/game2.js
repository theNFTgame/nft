

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
	function doUpdateTime(num) {
	    //document.getElementById('ShowDiv').innerHTML = '' + num + '秒';
	    //alert(num);
	    $('#ShowDiv').html( num + '秒');
	    if (num == 0) {
	    	console.log("shake remove!");
	        //window.removeEventListener('shake', shakeEventDidOccur, false);
	    }
	}
function shakeEventDidOccur () {
    newColor = newColor - 8;
    if(playerShakeRecord === 0){
    	shakeTime = new Date();
    }
    playerShakeRecord = playerShakeRecord + 1;
    if( playerShakeRecord > 5){
    	var endTime = new Date();
    	var timeDifference = (endTime.getTime() - shakeTime.getTime());
    	//alert( timeDifference);
    	$('#content').css('background','gray');
    	//$('.txt').html('<img src="img/winner.png" />');
    	// $('#content h2').html('You Win!');
    	//$('#content h2').html('Power:' + playerShakeRecord);
    	//$('txt').html('Let\'s Run!');
    }else{
    	$('#content').css('background','rgb(255,'+newColor+','+newColor+')');
    	$('#content h2').html('Power:' + playerShakeRecord);
    	$('.txt').append('<p>Shake me again!</p>');
   		alert("shake start!");
    }

}
  	

	function loadPower(secs) {
		$('.start').remove();
		secs = Number(secs);
		window.addEventListener('shake', shakeEventDidOccur(), false);
		console.log("call shake start!");
		//define a custom method to fire when shake occurs.
	    for (var i = secs; i >= 0; i--) {
	        //window.setTimeout('doUpdateTime(' + i + ')', (secs - i) * 1000);
	    }
	}
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
	})
	$(".reset").live("click", function(e){
		newColor=255;
		$('#content').css('background','rgb(255,255,255)');
		$('.txt').html('');
		$('#content h2').html('Let\'s go!');
		closeme();
	})
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


/*
 secs = 60; // Number of secs to delay -CHINA-studio
 wait = secs * 100;
 document.forms.register.Submit.disabled =true;
 for(i=1;i<=(wait/100);i++) {
  window.setTimeout("doUpdate(" + i + ")", i * 100);
 }
 window.setTimeout("Timer()", wait);
 function doUpdate(num) {
  if(num == (wait/100)) {
   document.forms.register.Submit.value = " 同意注册 ";
  } else {
   wut = (wait/100)-num;
   document.forms.register.Submit.value = " 同意前请先阅读 (" + wut + ")";
  }
 }
 function Timer() {
  document.forms.register.Submit.disabled =false;
}
----------------
var secs =5; //倒计时的秒数 
var URL ; 
function Load(url) {
    URL = url;
    for (var i = secs; i >= 0; i--) {
        window.setTimeout('doUpdate(' + i + ')', (secs - i) * 1000);
    }
}
function doUpdate(num) {
    document.getElementById('ShowDiv').innerHTML = '将在' + num + '秒后自动跳转到 脚本之家';
    if (num == 0) {
        window.location = URL;
    }
}
*/