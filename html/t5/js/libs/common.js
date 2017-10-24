(function(document, window, $) {
    // 工具
    $.extend($, {
        debug: function(e) {
            $(".debug").html(e)
        },
        /**
         * 模拟click
         * @param msg       信息
         * @param title     标题[可选]
         * @param callback1 确认回调函数
         * @param callback2 取消回调函数
         */
        tap: function(obj, _callback) {
            var _this = $(obj);
            var _x11 = 0,
                _x12 = 0,
                _y11 = 0,
                _y12 = 0;
            $(document).on("touchstart",obj, function(e) {
                _this = $(this);
                _x11 = 0, _x12 = 0, _y11 = 0, _y12 = 0;
                // var _touch1 = e.targetTouches[0];
                var _touch1 = e.originalEvent.targetTouches[0];
                _x11 = _touch1.pageX;
                _y11 = _touch1.pageY;
            });
            $(document).on("touchend",obj, function(e) {
                _this = $(this);
                // var _touch2 = e.changedTouches[0];
                var _touch2 = e.originalEvent.changedTouches[0];
                _x12 = _touch2.pageX;
                _y12 = _touch2.pageY;
                var result = null
                if (Math.abs(_x11 - _x12) < 4 && Math.abs(_y11 - _y12) < 4) {
                    result = 1;
                } else if(_y11 - _y12>10) {
                    console.log("上")
                    result = 2;
                } else if(_y11 - _y12<-10) {
                    console.log("下")
                    result = -2;
                }else{
                    result = 0;
                }
                _callback(result, _this);
            });
        },
        // 阻止连续点击
        preClick:function(obj){
            var _this=obj;
            if (_this.parent().hasClass("no")) {
                return false;
            }
            var nowTime = new Date().getTime();
            var clickTime = _this.attr("ctime");
            if (clickTime != undefined && (nowTime - clickTime < 3000)) {
                // $.toast('操作过于频繁，稍后再试');
                return false;
            } else {
                _this.attr("ctime", nowTime);
                return true;
            }
            return true;
        },

        // 验证是否全部输入
        checkInput:function(obj){
            var input=obj.find("input");
            var btn=obj.find(".blue-btn");
            var accAll=true;
            for(var i=0;i<input.length;i++){
                if (!input.eq(i).hasClass("can-space")) {
                    if(input.eq(i).val()==""||input.eq(i).val()==" "){
                        accAll=false;
                    }
                }
            }
            if (accAll) {
                btn.removeClass("no")
            }else{
                btn.addClass("no")
            }
        },
        // 60s 倒计时
        // obj jq对象 $("demo")
        // num 倒计时秒速
        // num-before 时间前文字
        // num-after 时间后文字
        // over 结束后文字
        cdn:function (obj,num,before,after,over,fn){
            obj.addClass("on");
            var time=parseInt(num==undefined?60:num);
            runTime=null;
            var before=(before==undefined?"（":before);
            var after=(after==undefined?"s）":after);
            var over=(over==undefined?"获取验证码":over);
            function timess(){
                if (time>0) {
                    obj.html(before+time+after)
                    runTime=setTimeout(timess,1000)
                    if (fn) {
                        fn(time,runTime);
                    }
                    time--;
                }else{
                    if (fn) {
                        fn(time,runTime);
                    }
                    obj.html(before+time+after)
                    clearTimeout(runTime)
                    obj.removeClass("on")
                    obj.html(over)
                }
            };
            timess()
        },
        htmlSize: function() {
            var value = document.documentElement.clientWidth
            var ua = navigator.userAgent
            if (ua.match(/MI 5/) && ua.match(/QQBrowser/)) {
                //value = (3 * value) / window.devicePixelRatio
                value = (3 * value) / 2.6 // 小米虽然 dpr 是3 但表现的依然是 2.6
            }
            var deviceWidth = Math.min(640, value)
            // document.documentElement.style.fontSize = `${deviceWidth / 7.5}px`
            document.documentElement.style.fontSize = 100*(deviceWidth/640)+"px";
        }
    });
    // 方法   
    $.extend($.fn, {
        // 音乐播放
        audioAutoPlay: function(id) {
            var audio = document.getElementById(id),
                play = function() {
                    audio.play();
                    document.removeEventListener("touchstart", play, false);
                };
            audio.play();
            document.addEventListener("WeixinJSBridgeReady", function() {
                play();
            }, false);
            document.addEventListener('YixinJSBridgeReady', function() {
                play();
            }, false);
            document.addEventListener("touchstart", play, false);
        },
        // 音乐暂停
        audioAutoPause: function(id) {
            var audio = document.getElementById(id),
                pause = function() {
                    audio.pause();
                    document.removeEventListener("touchstart", pause, false);
                };
            audio.pause();
            document.addEventListener("WeixinJSBridgeReady", function() {
                pause();
            }, false);
            document.addEventListener('YixinJSBridgeReady', function() {
                pause();
            }, false);
            document.addEventListener("touchstart", pause, false);
        }
    });
    $(function(){
        $.htmlSize();
        $(window).resize(function(){
            $.htmlSize();
        })
        $.tap("#audio_btn",function(e,obj){
            if (!e) return;
            if ($("#media")[0].paused) {
                $("#media")[0].play();
                obj.addClass("rotate");
            } else {
                $("#media")[0].pause();
                obj.removeClass("rotate");
            };
        })
        // 音乐end
        // 音乐调用 有音乐解开注释
        if ($("#audio_btn").length > 0) {
            $("#media").audioAutoPlay("media");
        }
        // 音乐调用end
        // -==================================================================
    })
})(document, window, window.jQuery || window.Zepto);

