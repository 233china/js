// jQuery扩展
(function($) {
    $.extend({
        mouseMoveShow: function(selector) {
            var windowWidth = 0,
                windowHeight = 0,
                clientX = 0,
                clientY = 0,
                pageX = 0,
                pageY = 0;
            $(window).mousemove(function(event) {
                windowWidth = $(window).width();
                windowHeight = $(window).height();
                clientX = event.clientX;
                clientY = event.clientY;
                pageX = event.pageX;
                pageY = event.pageY;
                if (clientX + $(selector).width() >= windowWidth) {
                    pageX = pageX - $(selector).width() - 5;
                }
                if (clientY + $(selector).height() >= windowHeight) {
                    pageY = pageY - $(selector).height() - 5;
                }
                $("html").on({
                    contextmenu: function(event) {
                        if (event.which == 3) {
                            $(selector).css({
                                left: pageX,
                                top: pageY
                            }).show();
                        }
                    },
                    click: function() {
                        $(selector).hide();
                    }
                });
            });
        },
        disabledContextMenu: function() {
            window.oncontextmenu = function() {
                return false;
            };
        }
    });
})(jQuery);

// 返回顶部功能
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 初始化
$(function() {
    var userAgent = navigator.userAgent;
    var mobileAgents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var isMobile = false;
    for (var i = 0; i < mobileAgents.length; i++) {
        if (userAgent.indexOf(mobileAgents[i]) &gt; 0) {
            isMobile = true;
            break;
        }
    }
    if (!isMobile) {
        $.mouseMoveShow(".usercm");
        $.disabledContextMenu();
    }
});
