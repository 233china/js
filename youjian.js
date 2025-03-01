(function($) {
  let isInitialized = false;
  
  $.extend({
    smartContextMenu: function(selector) {
      const $menu = $(selector).hide().attr('data-ctx', 'custom');
      
      $(document).on('mousemove.ctxMenu', function(e) {
        const { innerWidth, innerHeight } = window;
        const menuRect = $menu[0].getBoundingClientRect();
        
        let targetX = e.pageX;
        let targetY = e.pageY;
        
        if (e.clientX + menuRect.width > innerWidth) {
          targetX = innerWidth - menuRect.width - 5;
        }
        
        if (e.clientY + menuRect.height > innerHeight) {
          targetY = innerHeight - menuRect.height - 5;
        }
        
        $menu.css({ left: targetX, top: targetY });
      });

      if (!isInitialized) {
        $(document)
          .off('contextmenu.ctxMenu click.ctxMenu')
          .on('contextmenu.ctxMenu', function(e) {
            if (e.button === 2) {
              $menu.show();
              return false; // 仅局部阻止默认行为
            }
          })
          .on('click.ctxMenu', function(e) {
            if (!$(e.target).closest(selector).length) {
              $menu.hide();
            }
          });
        
        isInitialized = true;
      }
    }
  });
})(jQuery);

// 初始化
$(function() {
  if (!('ontouchstart' in window)) {
    $.smartContextMenu('.usercm');
  }
});
