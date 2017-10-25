(function () {
  $(function () {
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