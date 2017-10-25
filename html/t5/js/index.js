var imgSrc = "";
var imgW = "";
var imgH = "";
var imgLeft = "";
var imgTop = "";
var data = ["images/bg4.jpg","images/qrcode.png","images/word3.png"];
$("#uploadImage").on("change", function() {
	var _this = $(this);
	var fr = new FileReader();
	fr.readAsDataURL(this.files[0]);

	var img = new Image();

	fr.onload = function() {
		img.src = this.result;
		imgSrc = this.result;
		$("#photo").attr("src",imgSrc);
		console.log(data);
		$("#hecheng").attr("src",imgSrc);
    $('.page7 .upload > img').attr("src",imgSrc);
		img.onload = function() {
			console.log("上传成功");
		}
	}
});

function hecheng(){
	imgW = $("#photo").width();
	imgH = $("#photo").height();
	imgLeft = $("#photo").offset().left;
	imgTop = $("#photo").offset().top;
	// console.log(imgW);
	// console.log(imgH);
	// console.log(imgLeft);
	// console.log(imgTop);
	data.push(imgSrc);
	draw(function(){
		// $("#photo").attr("src",base64[0]);
		$(".posters").attr("src",base64[0]);
		$(".posters").show();
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
						x = 0;
						y = 0;
						w = c.width;
						h = c.height;
						break;
					case 1:
						x = 10;
						y = c.height - 66 - 10;
						w = 66;
						h = 66;
						break;
					case 2:
						x = 0;
						y = 50;
						w = c.width;
						h = 280;
						break;
					case 3:
						x = imgLeft;
						y = imgTop;
						w = imgW;
						h = imgH;
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

$("#synthesis").on("click",function(){
	hecheng();
});

$("#photo").on("dragstart",function(){
	console.log(11);
});

(function () {
  $(function () {
    var progress = 0;
    var queue = new createjs.LoadQueue(true);
    queue.loadManifest([
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
      $('.page-load i').width(parseInt(progress/44*100)+"%");
      $('.page-load em').html(parseInt(progress/44*100)+"%");
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