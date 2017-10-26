var imgSrc = "";
var imgW = "";
var imgH = "";
var imgLeft = "";
var imgTop = "";
var data = ["images/canvas_header.png", "images/footer.png"];
document.getElementById('uploadImage').onchange = function (e) {
  var src, url = window.URL || window.webkitURL || window.mozURL, files = e.target.files;
  for (var i = 0, len = files.length; i < len; ++i) {
    var file = files[i];
    if (url) {
      src = url.createObjectURL(file);
    } else {
      src = e.target.result;
    }
  }

  $("#photo").attr("src",src);
  $("#hecheng").attr("src",src);
  $('.page7 .upload .uploadBg').hide();
  $('.page7 .upload .uploadShow').attr("src",src).css("display","block");
  imgSrc = src;
};


function hecheng(){
	// imgW = $("#photo").width();
	// imgH = $("#photo").height();
	// imgLeft = $("#photo").offset().left;
	// imgTop = $("#photo").offset().top;
	// console.log(imgW);
	// console.log(imgH);
	// console.log(imgLeft);
	// console.log(imgTop);
	data.unshift('images/canvas_header.png');
	data.push($('.qrcode > img').attr('src'));
	draw(function(){
		// $("#photo").attr("src",base64[0]);
		$(".page9 > img").attr("src",base64[0]);
		$('.pag3').hide()
	})
}

var base64=[];

function draw(fn){
	var c=document.createElement('canvas'),
		ctx=c.getContext('2d'),
		len=data.length;
	c.width= $(window).width();
	c.height= $(window).height();
	// ctx.rect(0,0,c.width,c.height);
	// ctx.fillStyle='#fff';
	// ctx.fill();

	function drawing(n){
    var word3 = $('.page3 .header'),
      word3W = word3.width(),
      word3H = word3.height();
    var photo = $('.page3 .header'),
      photoW = photo.width(),
      photoH = photo.height();
    var footer = $('.page3 .footer'),
      footerW = footer.width(),
      footerH = footer.height();
    console.log(footer, footerW, footerH)
    var qrcode = $('.qrcode'),
      qrcodeW = 0,
      qrcodeH = 0;
		if(n<len){
			var img=new Image;
			// img.crossOrigin = 'Anonymous'; //解决跨域
			img.src=data[n];
			img.onload=function(){
				var x = 0;
				var y = 0;
				var w = "";
				var h = "";
				switch(n){
					case 0:
            x = (word3W-photoW)/2;
            y = word3H;
            w = photoW;
            h = photoH;
						break;
          case 1:
            x = 0;
            y = 0;
            w = word3W;
            h = word3H;
            break;
					case 2:
						x = 0;
						y = word3H + photoH;
						w = footerW;
						h = footerH;
						console.log(x,y,w,h)
						break;
          case 3:
            x = 10;
            y = photoH + word3H + footerH -100;
            w = 90;
            h = 90;
            break;
				}
				ctx.drawImage(img,x,y,w,h);
				drawing(n+1);//递归
			}
		}else{
			//保存生成作品图片
			base64.push(c.toDataURL("image/png",1));
			fn();
		}
	}
	drawing(0);
}

$(".synthesis").on("click",function(){
  $('.page9').show();
	hecheng();
});


(function () {
  $(function () {
    var qrcode = new QRCode(document.querySelector(".qrcode"), {
      width : 90,
      height : 90
    });
    qrcode.makeCode('heep://www.baidu.com')
    var progress = 0;
    var queue = new createjs.LoadQueue(true);
    queue.loadManifest([
      'images/canvas_header.png',
      'images/footer.png',
      'images/music.mp3',
      'images/adjust.png',
      'images/arrow.png',
      'images/bg.jpg',
      'images/bg2.jpg',
      'images/bg3.jpg',
      'images/btn1.png',
      'images/btn2.png',
      'images/btn3.png',
      'images/btn4.png',
      'images/btn5.png',
      'images/btn6.png',
      'images/btn7.png',
      'images/btn8.png',
      'images/btn9.png',
      'images/btn10.png',
      'images/btn22.png',
      'images/car.png',
      'images/car2.png',
      'images/close.png',
      'images/fabulous.png',
      'images/form.png',
      'images/frame.png',
      'images/light.png',
      'images/logo.png',
      'images/man.png',
      'images/photo.png',
      'images/poster.png',
      'images/qrcode.png',
      'images/rank.png',
      'images/rule-bg.png',
      'images/shadow.png',
      'images/success.png',
      'images/tag1.png',
      'images/tag2.png',
      'images/title1-bg.png',
      'images/title2-bg.png',
      'images/title3-bg.png',
      'images/title4-bg.png',
      'images/upload.png',
      'images/woman.png',
      'images/word.png',
      'images/word2.png',
      'images/word3.png',
      'images/word4.png',
    ]);
    queue.on("fileload", function (e) {
      progress ++;
      $('.page-load i').width(parseInt(progress/46*100)+"%");
      $('.page-load em').html(parseInt(progress/46*100)+"%");
      // console.log(parseInt(progress/44*100)+"%")
    }, this);
    $('.video_exist').on('click', function () {
      var media = document.getElementById('media');
      if (media.paused) {
        media.play();
        $(this).addClass('rotate');
      }else {
        media.pause();
        $(this).removeClass('rotate');
      }
    });
    queue.on("complete", function (e) {
      $('.page-load').hide();
    }, this);
    //联动
    var urlChina = 'js/data.js';
    $.cxSelect.defaults.url = urlChina;
    // 默认
    $('#city_china').cxSelect({
      selects: ['province', 'city', 'area']
    });
    $('.page1 .btn1').on('click', function () {
      $('.page7').show();
      $('.page1').hide();
    });
    $('.page1 .btn2').on('click', function () {
      $('.page2').show();
      $('.page1').hide();
    });
    $('.page1 .btn3').on('click', function () {
      $('.page5').show();
      $('.page1').hide();
    });
    $('.page2 .close').on('click', function () {
      $('.page2').hide();
      $('.page1').show();
    });
    $('.page5 .ƒorm').on('submit', function (e) {
      e.preventDefault();
      $('.page5').hide();
      $('.page8').show();
    });
    $('.page4 .btn2').on('click', function () {
      $('.page4').hide();
      $('.page6').show();
    });
    $('.page7 .btn2').on('click', function () {
      $('.page7').hide();
      $('.page3').show();
      console.log($('.page3').height(),$('.page3 .header').height(), $('.page3 .footer').height())
      $('.page3 .content').height($('.page3').height() - $('.page3 .header').height() - $('.page3 .footer').height())

    });
    $('.page8 .btn9').on('click', function () {
      $('.page8').hide();
      $('.page1').show();
    });
   $('.page6 .close').on('click', function () {
     $('.page6').hide();
     $('.page7').show();
   });
   $('.gender .g').on('click', function () {
     $(this).addClass('active').siblings().removeClass('active')
   })
  })
})()