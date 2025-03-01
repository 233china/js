 (function($) {
        $.extend({
            mouseMoveShow: function(selector) {
                var $menu = $(selector);
                
                // 移除冗余的mousemove监听
                $(document).on({
                    // 右键显示菜单
                    contextmenu: function(e) {
                        if (e.button !== 2) return;
                        e.preventDefault();
                        
                        // 获取点击时的坐标
                        var clickX = e.pageX;
                        var clickY = e.pageY;
                        
                        // 动态计算边界
                        var winWidth = $(window).width();
                        var winHeight = $(window).height();
                        var menuWidth = $menu.outerWidth();
                        var menuHeight = $menu.outerHeight();
                        
                        // 边界修正
                        if (clickX + menuWidth > winWidth) {
                            clickX = winWidth - menuWidth - 5;
                        }
                        if (clickY + menuHeight > winHeight) {
                            clickY = winHeight - menuHeight - 5;
                        }
                        
                        // 设置最终位置
                        $menu.css({
                            left: clickX + 'px',
                            top: clickY + 'px',
                            display: 'block'
                        });
                    },
                    // 点击隐藏菜单
                    click: function(e) {
                        if (!$menu.is(e.target) && $menu.has(e.target).length === 0) {
                            $menu.hide();
                        }
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

    // 初始化
    $(function() {
        var isMobile = /Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
        if (!isMobile) {
            $.mouseMoveShow(".usercm");
            $.disabledContextMenu();
            
            // 菜单项点击关闭
            $('.usercm a').on('click', function() {
                $(this).closest('.usercm').hide();
            });
            
            // 滚动时隐藏
            $(window).on('scroll', function() {
                $('.usercm').hide();
            });
        }
    });

    // 返回顶部
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
