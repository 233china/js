(function($) {
  let isInitialized = false;
  
  $.extend({
    smartContextMenu: function(selector) {
      const $menu = $(selector).hide().attr('data-ctx', 'custom');
      let menuVisible = false;

      // 移除 mousemove 监听，改为右键触发时计算位置
      $(document).on('contextmenu.ctxMenu', function(e) {
        if (e.button === 2 && !menuVisible) {
          e.preventDefault();
          
          // 单次定位计算
          const { innerWidth, innerHeight } = window;
          const menuRect = $menu[0].getBoundingClientRect();
          
          let targetX = e.pageX;
          let targetY = e.pageY;

          // 边界检测
          if (e.clientX + menuRect.width > innerWidth) {
            targetX = innerWidth - menuRect.width - 5;
          }
          if (e.clientY + menuRect.height > innerHeight) {
            targetY = innerHeight - menuRect.height - 5;
          }

          $menu.css({ 
            left: targetX + 'px',
            top: targetY + 'px'
          }).show();
          
          menuVisible = true;
          return false;
        }
      });

      // 点击关闭菜单（排除菜单区域）
      $(document).on('click.ctxMenu', function(e) {
        if (!$(e.target).closest(selector).length) {
          $menu.hide();
          menuVisible = false;
        }
      });

      // 菜单项点击处理
      $(selector).on('click', 'li', function(e) {
        e.stopPropagation(); // 阻止事件冒泡
        console.log('菜单项被点击:', this.textContent);
        $menu.hide();
        menuVisible = false;
      });
    }
  });
})(jQuery);
