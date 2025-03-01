// 扩展 jQuery 方法
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
            }).on("contextmenu", function(e) {
                if (e.which === 3) {
                    $(selector).css({ left: pageX, top: pageY }).show();
                    return false;
                }
            });
        },
        disabledContextMenu: function() {
            $(document).on("contextmenu", function() {
                return false;
            });
        }
    });
})(jQuery);

// 返回顶部
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 初始化
$(function() {
    var isMobile = /Android|iPhone|iPad|iPod|SymbianOS|Windows Phone/i.test(navigator.userAgent);
    if (!isMobile) {
        $.mouseMoveShow(".usercm");
        $.disabledContextMenu();

        // 绑定菜单点击事件
        $(".usercm").on("click", "a[data-action]", function(e) {
            e.preventDefault();
            var action = $(this).data("action");
            switch (action) {
                case "home":
                    window.location.href = "https://eebk.com/"; // 替换为你的首页 URL
                    break;
                case "forward":
                    window.history.forward();
                    break;
                case "back":
                    window.history.back();
                    break;
                case "reload":
                    window.location.reload();
                    break;
                case "toTop":
                    scrollToTop();
                    break;
            }
            $(this).closest(".usercm").hide();
        });

        // 阻止菜单点击冒泡
        $(".usercm").on("click", function(e) {
            e.stopPropagation();
        });

        // 点击外部隐藏菜单
        $(document).on("click", function() {
            $(".usercm").hide();
        });
    }
});
