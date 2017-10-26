var imgSrc = "";
// 视图宽度
var pageWidth = $(window).width();
// 视图高度
var pageHeight = $(window).height();
// 裁剪图片高度
var contentHeight = $(".content").height();

// 头部尺寸对象
var headerObj = null;
// 车辆尺寸对象
var carObj = null;
// 底部尺寸对象
var footerObj = null;
// 二维码尺寸对象
var qrcodeObj = null;

// $(".page1").hide();

var imgEdit2;

var data = ["images/canvas_header.png", "images/footer.png"];
document.getElementById('uploadImage').onchange = function (e) {
  // var src, url = window.URL || window.webkitURL || window.mozURL, files = e.target.files;
  // for (var i = 0, len = files.length; i < len; ++i) {
  //   var file = files[i];
  //   if (url) {
  //     src = url.createObjectURL(file);
  //   } else {
  //     src = e.target.result;
  //   }
  // }
  var file = e.target.files[0];
  var Orientation = null;
  EXIF.getData(file, function () {
    EXIF.getAllTags(this);
    Orientation = EXIF.getTag(this, 'Orientation');
  });
  var src = '';
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (e) {
    var image = new Image();
    image.src = e.target.result;
    image.onload = function () {
      var canvas = document.createElement("canvas");
      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(this, 0, 0, this.naturalWidth, this.naturalHeight);
      var base64 = null;
      if (Orientation != "" && Orientation != 1 && Orientation != undefined) {
        var width = this.naturalWidth;
        var height = this.naturalHeight;
        switch (Orientation) {
          case 6://需要顺时针90度旋转
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(90 * Math.PI / 180);
            ctx.drawImage(this, 0, -height);
            break;
          case 8://需要逆时针90度旋转
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(-90 * Math.PI / 180);
            ctx.drawImage(this, -width, 0);
            break;
          case 3://需要180度旋转
            ctx.rotate(180 * Math.PI / 180);
            ctx.drawImage(this, -width, -height);
            break;
        }
      }
      src = canvas.toDataURL("image/png");
      $('.page7 .upload .uploadShow').attr("src",src).css("display","block");
      $("#photo").attr("src",src);
      $("#hecheng").attr("src",src);
      $('.page7 .upload .uploadBg').hide();
      $('.page7 .upload .uploadShow').attr("src",src).css("display","block");
      imgSrc = src;

      var img = new Image();
      img.src = src;
      img.onload = function () {
        imgEdit2 = new veImage({ canvas: document.getElementById('captureCanvas2'), image: this });
        $('#carImg').attr('src', imgEdit2.crop(2*pageWidth, 2*contentHeight, 0, 50));
      };
    };
  };


};

// 获取图片尺寸
function getSize(obj){
    var $obj = $("#"+obj);
    var w = $obj.width();
    var h = $obj.height();
    var x = $obj.offset().left;
    var y = $obj.offset().top;
    return {
        "w": w,
        "h": h,
        "x": x,
        "y": y
    }
}


function hecheng(){
	// 头部
  	headerObj = getSize("header");
  	console.log(headerObj);
  	// 车辆
  	carObj = getSize("carImg");
  	console.log(carObj);
  	// 底部
  	footerObj = getSize("footer");
  	console.log(footerObj);
  	// 二维码
  	qrcodeObj = getSize("qrcode > img");
  	console.log(qrcodeObj);

  	
  	data.unshift($('#carImg').attr('src'));
	data.push($('#qrcode > img').attr('src'));
	console.log(data);
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
  c.style.width = $(window).width();
  c.style.height = $(window).height();
  // 屏幕的设备像素比
  var devicePixelRatio = window.devicePixelRatio || 1;

// 浏览器在渲染canvas之前存储画布信息的像素比
  var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio || 1;

// canvas的实际渲染倍率
  var ratio = devicePixelRatio / backingStoreRatio;

  c.width = c.width * ratio;
  c.height = c.height * ratio;
	// ctx.rect(0,0,c.width,c.height);
	// ctx.fillStyle='#fff';
	// ctx.fill();

	function drawing(n){
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
			            x = carObj.x;
			            y = carObj.y;
			            w = carObj.w;
			            h = carObj.h;
						break;
			        case 1:
			            x = headerObj.x;
			            y = headerObj.y;
			            w = headerObj.w;
			            h = headerObj.h;
			            break;
					case 2:
						x = footerObj.x;
						y = footerObj.y;
						w = footerObj.w;
						h = footerObj.h;
						break;
			        case 3:
			            x = 10;
			            y = pageHeight - 80;
			            w = 70;
			            h = 70;
			            break;
				}

				ctx.drawImage(img,x*ratio,y*ratio,w*ratio,h*ratio);
				drawing(n+1);//递归
			}
		}else{
			//保存生成作品图片
			base64.push(c.toDataURL("image/png", 1));
			fn();
		}
	}
	drawing(0);
}

$(".synthesis").on("click",function(){
	$(".page3").css("visibility","hidden");
  	$('.page9').show();

  	$('#carImg').css("display","block");
  	// $("#captureCanvas2").hide();
  	$('#carImg').attr('src', imgEdit2.crop(2*pageWidth, 2*contentHeight, 0, 50));

 //  	var img = new Image();
	// img.src = $('#carImg').attr('src');
	// img.onload = function () {
		var timer = setTimeout(function(){
  			hecheng();
  			clearTimeout(timer);
		},3000);
	// }
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
    var queue2 = new createjs.LoadQueue(true);
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
      // 'images/rule-bg.png',
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
    queue2.loadManifest([
      'images/canvas_header11.png',
      'images/canvas_header12.png'
    ]);
    queue.on("complete", function (e) {
      $('.page-load').hide();
      queue.on("fileload", function (e) {
        progress ++;
        $('.page-load i').width(parseInt(progress/46*100)+"%");
        $('.page-load em').html(parseInt(progress/46*100)+"%");
        // console.log(parseInt(progress/44*100)+"%")
      }, this);
    }, this);
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
      // $('.page3').show();
      $(".page3").css("visibility","visible");
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