// 改进后的jQuery扩展
(function($) {
    $.extend({
        mouseMoveShow: function(selector) {
            const $menu = $(selector);
            // 确保菜单直接挂在 body 下
            if ($menu.parent()[0] !== document.body) {
                $menu.appendTo('body');
            }
            
            let menuWidth = 0;
            let menuHeight = 0;
            let windowWidth = $(window).width();
            let windowHeight = $(window).height();
            
            // 预计算菜单尺寸（显示时更新）
            const updateMenuSize = () => {
                $menu.css({ visibility: 'hidden', display: 'block' });
                menuWidth = $menu.outerWidth();
                menuHeight = $menu.outerHeight();
                $menu.hide().css('visibility', '');
            };
            updateMenuSize();
            
            // 监听窗口尺寸变化
            const ro = new ResizeObserver(() => {
                windowWidth = $(window).width();
                windowHeight = $(window).height();
                updateMenuSize();
            });
            ro.observe(document.body);

            const adjustPosition = (clientX, clientY) => {
                let x = clientX;
                let y = clientY;
                
                // 动态边界检测
                if (x + menuWidth >= windowWidth) x = windowWidth - menuWidth - 5;
                if (y + menuHeight >= windowHeight) y = windowHeight - menuHeight - 5;
                if (x < 0) x = 5;
                if (y < 0) y = 5;
                
                return { x, y };
            };

            $(document)
                .on('mousedown', function(event) {
                    if (event.button === 2) {
                        event.preventDefault();
                        const pos = adjustPosition(event.clientX, event.clientY);
                        $menu.css({
                            left: pos.x + 'px',
                            top: pos.y + 'px',
                            display: 'block'
                        });
                    } else if (!$menu.is(event.target) && $menu.has(event.target).length === 0) {
                        $menu.hide();
                    }
                })
                .on('scroll', () => $menu.hide()); // 滚动时隐藏

            // 菜单项点击关闭
            $menu.on('click', 'a', function() {
                $menu.hide();
            });
        },
        disabledContextMenu: function() {
            $(document).on('contextmenu', e => e.preventDefault());
        }
    });
})(jQuery);

// 初始化
$(function() {
    const isMobile = /Mobile|Android|iP(hone|od)|IEMobile/.test(navigator.userAgent);
    if (!isMobile) {
        $.mouseMoveShow(".usercm");
        $.disabledContextMenu();
    } else {
        $('.usercm').remove();
    }
});
// 初始化
$(function() {
    const isMobile = /Mobile|Android|iP(hone|od)|IEMobile/.test(navigator.userAgent);
    if (!isMobile) {
        $.mouseMoveShow(".usercm");
        $.disabledContextMenu();
    } else {
        $('.usercm').remove();
    }
});

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

