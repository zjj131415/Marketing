$(function(){
	// 页面一点击
	$(".page1").on("click",".btn2",function(){
		$(".page2").show();
	});

	// 页面二点击
	$(".page2").on("click",".close",function(){
		$(".page2").hide();
	});
});