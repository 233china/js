
// 改进后的jQuery扩展
(function($) {
    $.extend({
        mouseMoveShow: function(selector) {
            const $menu = $(selector);
            let windowWidth = 0,
                windowHeight = 0;

            const adjustPosition = (pageX, pageY) => {
                const menuWidth = $menu.outerWidth();
                const menuHeight = $menu.outerHeight();
                windowWidth = $(window).width();
                windowHeight = $(window).height();

                if (pageX + menuWidth >= windowWidth) pageX = windowWidth - menuWidth - 5;
                if (pageY + menuHeight >= windowHeight) pageY = windowHeight - menuHeight - 5;
                
                return { x: pageX, y: pageY };
            };

            $(document).on('mousedown', function(event) {
                // 右键显示
                if (event.button === 2) {
                    event.preventDefault();
                    const pos = adjustPosition(event.pageX, event.pageY);
                    $menu.css({ left: pos.x, top: pos.y }).show();
                }
                // 左键隐藏
                else if (!$menu.is(event.target) && $menu.has(event.target).length === 0) {
                    $menu.hide();
                }
            });
        },
        disabledContextMenu: function() {
            $(document).on('contextmenu', function(e) {
                e.preventDefault();
            });
        }
    });
})(jQuery);

// 增强的初始化函数
$(function() {
    const isMobile = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
            || window.innerWidth <= 768 
            || 'ontouchstart' in window;
    };

    if (!isMobile()) {
        $.mouseMoveShow(".usercm");
        $.disabledContextMenu();
        
        // 菜单项点击关闭
        $('.usercm a').on('click', function() {
            $(this).closest('.usercm').hide();
        });
        
        // 窗口缩放隐藏
        $(window).on('resize', () => $('#customContextMenu').hide());
    } else {
        $('#customContextMenu').remove();
    }
});

// 保留原有返回顶部函数
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

