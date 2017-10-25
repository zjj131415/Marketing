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
      $('.page4').show();
    });
   $('.page6 .close').on('click', function () {
     $('.page6').hide();
     $('.page1').show();
   });
  })
})()