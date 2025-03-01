    // 修复后的jQuery扩展
    (function($) {
        $.extend({
            mouseMoveShow: function(selector) {
                var $menu = $(selector);
                var menuWidth = $menu.outerWidth();
                var menuHeight = $menu.outerHeight();

                // 解绑旧事件避免重复绑定
                $(window).off('mousemove');
                $("html").off('contextmenu click');

                $(window).mousemove(function(event) {
                    var winWidth = $(window).width();
                    var winHeight = $(window).height();
                    var pageX = event.pageX;
                    var pageY = event.pageY;

                    // 动态调整坐标
                    if (event.clientX + menuWidth >= winWidth) {
                        pageX = pageX - menuWidth - 5;
                    }
                    if (event.clientY + menuHeight >= winHeight) {
                        pageY = pageY - menuHeight - 5;
                    }

                    // 更新菜单位置
                    $menu.css({
                        left: pageX,
                        top: pageY
                    });
                });

                // 右键显示
                $("html").on('contextmenu', function(e) {
                    if (e.which === 3) {
                        $menu.show();
                        return false; // 阻止默认菜单
                    }
                });

                // 点击隐藏（修复版）
                $("html").on('click', function(e) {
                    if (!$menu.is(e.target) && $menu.has(e.target).length === 0) {
                        $menu.hide();
                    }
                });
            },
            disabledContextMenu: function() {
                window.oncontextmenu = function() {
                    return false;
                };
            }
        });
    })(jQuery);

    // 初始化
    $(function() {
        var isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i.test(navigator.userAgent);
        if (!isMobile) {
            $.mouseMoveShow(".usercm");
            $.disabledContextMenu();
        }
    });

    // 返回顶部
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
