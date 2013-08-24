// 用來產生類似 GUID 的字串

function G() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}

function NewGuid() {
   return (G()+G());
}

$(document).ready(function(){

    var key = NewGuid();
    var pageUrl = window.location.href;
    pageUrl=pageUrl.replace(/pc.html/g,"m.html");


    console.log(key +"," + pageUrl);
    $("#qrcode").append("<img src='http://chart.apis.google.com/chart?chs=300x300&cht=qr&chl="+ pageUrl +"?key=" + key + "&choe=UTF-8' />");

    // NodeJS Server
    var nodejs_server = "222.73.241.58:8081";

    // 進行 connect
    var socket = io.connect("http://" + nodejs_server);

    // 偵聽 nodejs 事件
    socket.on("get_response", function (b) {

        var combine = b.key + "_" + b.act;
        console.log(combine);

        switch (combine) {

            // 當擁有特定 KEY 的使用者打開手機版網頁，觸發 enter 事件，就會將 qrcode 隱藏，並秀出一張圖
            case key + "_enter":
                setTimeout(function () {

                    $("#qrcode").hide();
                    $("#main").show();

                }, 500);
                break;

            // 當擁有特定 KEY 的使用者在手機版網頁中，觸發 changebg 事件，就會將網頁的背景顏色隨機變換
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

});