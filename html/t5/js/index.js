$(function(){
	// 页面一点击
	$(".page1").on("click",".btn1",function(){
		$(".page8").show();
	});
	$(".page1").on("click",".btn2",function(){
		$(".page2").show();
	});
  $(".page1").on("click",".btn3",function(){
    $(".page6").show();
  });


	// 页面二点击
	$(".page2").on("click",".close",function(){
		$(".page2").hide();
	});
});