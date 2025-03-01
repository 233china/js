(function($) {
    $.extend({
        mouseMoveShow: function(selector) {
            var $selector = $(selector);
            var windowWidth, windowHeight, pageX, pageY;

            // 更新鼠标坐标
            $(window).on('mousemove', function(event) {
                windowWidth = $(window).width();
                windowHeight = $(window).height();
                var clientX = event.clientX;
                var clientY = event.clientY;
                pageX = event.pageX;
                pageY = event.pageY;

                // 边界检测调整
                if (clientX + $selector.outerWidth() >= windowWidth) {
                    pageX -= $selector.outerWidth() + 5;
                }
                if (clientY + $selector.outerHeight() >= windowHeight) {
                    pageY -= $selector.outerHeight() + 5;
                }
            });

            // 右键菜单处理
            $('html').on({
                contextmenu: function(event) {
                    if (event.which === 3) {
                        $selector.css({
                            left: pageX + 'px',
                            top: pageY + 'px'
                        }).show();
                        
                        // 拦截检测
                        setTimeout(() => {
                            if (!$selector.is(':visible')) {
                                $selector.remove();
                            }
                        }, 50);
                    }
                },
                click: function() {
                    $selector.hide();
                }
            });

            // 阻止菜单点击冒泡
            $selector.on('click', function(e) {
                e.stopPropagation();
            });
        },
        disabledContextMenu: function() {
            document.addEventListener('contextmenu', e => e.preventDefault());
        }
    });
})(jQuery);

// 初始化逻辑
$(function() {
    // 移动设备检测（包含Touch设备）
    const isMobile = /Android|iPhone|iPad|iPod|SymbianOS|Windows Phone/i.test(navigator.userAgent) 
        || ('ontouchstart' in window);
    
    const $menu = $('#customContextMenu');
    
    if (!isMobile) {
        try {
            $.mouseMoveShow('.usercm');
            $.disabledContextMenu();
        } catch (e) {
            $menu.remove();
        }
    } else {
        $menu.remove();
    }
});
