    (function($) {
        $.extend({
            mouseMoveShow: function(selector) {
                const $menu = $(selector);
                
                // 确保菜单挂在body下
                if($menu.parent()[0] !== document.body) {
                    $menu.appendTo('body');
                }

                $(document).on({
                    contextmenu: function(event) {
                        if (event.button !== 2) return;
                        event.preventDefault();

                        // 使用视口坐标
                        const clientX = event.clientX;
                        const clientY = event.clientY;
                        
                        // 获取菜单尺寸
                        const menuWidth = $menu.outerWidth();
                        const menuHeight = $menu.outerHeight();
                        
                        // 计算边界
                        const windowWidth = $(window).width();
                        const windowHeight = $(window).height();
                        
                        let finalX = clientX;
                        let finalY = clientY;

                        // 右侧溢出修正
                        if (clientX + menuWidth > windowWidth) {
                            finalX = windowWidth - menuWidth - 5;
                        }
                        
                        // 底部溢出修正
                        if (clientY + menuHeight > windowHeight) {
                            finalY = windowHeight - menuHeight - 5;
                        }

                        // 更新位置并显示
                        $menu.css({
                            left: finalX + 'px',
                            top: finalY + 'px',
                            display: 'block'
                        });
                    },
                    click: function(e) {
                        if (!$menu.is(e.target) && $menu.has(e.target).length === 0) {
                            $menu.hide();
                        }
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
        const mobileAgents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        const isMobile = mobileAgents.some(agent => navigator.userAgent.includes(agent));
        
        if (!isMobile) {
            $.mouseMoveShow(".usercm");
            $.disabledContextMenu();
            
            // 菜单项点击关闭
            $('.usercm a').on('click', function() {
                $(this).closest('.usercm').hide();
            });
            
            // 窗口滚动和缩放时隐藏
            $(window).on('scroll resize', () => $('.usercm').hide());
        } else {
            $('.usercm').remove();
        }
    });

    // 返回顶部功能
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
   
