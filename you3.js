// 改进后的jQuery扩展
(function($) {
    $.extend({
        mouseMoveShow: function(selector) {
            const $menu = $(selector);
            let windowWidth = 0,
                windowHeight = 0;

            const adjustPosition = (clientX, clientY) => { // 改用 clientX/clientY
                const menuWidth = $menu.outerWidth();
                const menuHeight = $menu.outerHeight();
                windowWidth = $(window).width();
                windowHeight = $(window).height();

                // 确保菜单在视口内
                let x = clientX;
                let y = clientY;
                if (x + menuWidth >= windowWidth) x = windowWidth - menuWidth - 5;
                if (y + menuHeight >= windowHeight) y = windowHeight - menuHeight - 5;
                
                return { x, y };
            };

            $(document).on('mousedown', function(event) {
                if (event.button === 2) { // 右键
                    event.preventDefault();
                    const pos = adjustPosition(event.clientX, event.clientY); // 传入 client 坐标
                    $menu.css({ 
                        left: pos.x + 'px', 
                        top: pos.y + 'px' 
                    }).show();
                } else if (!$menu.is(event.target) && $menu.has(event.target).length === 0) {
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

