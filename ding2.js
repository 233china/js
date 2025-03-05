// 修复后的置顶按钮代码
var bigfa_scroll = {
    drawCircle: function(id, percentage, color) {
        var width = jQuery(id).width();
        var height = jQuery(id).height();
        var radius = parseInt(width / 2.20);
        var position = width;
        var positionBy2 = position / 2;
        var bg = jQuery(id)[0];
        id = id.split("#");
        
        // 修复Canvas警告
        var ctx;
        try {
            ctx = bg.getContext("2d", { willReadFrequently: true }); // 添加性能优化参数
        } catch (e) {
            ctx = bg.getContext("2d");
        }
        
        var imd = null;
        var circ = Math.PI * 2;
        var quart = Math.PI / 2;
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineCap = "square";
        ctx.closePath();
        ctx.fill();
        ctx.lineWidth = 3;
        imd = ctx.getImageData(0, 0, position, position);
        
        var draw = function(current, ctxPass) {
            ctxPass.putImageData(imd, 0, 0);
            ctxPass.beginPath();
            ctxPass.arc(positionBy2, positionBy2, radius, -(quart), ((circ) * current) - quart, false);
            ctxPass.stroke();
        }
        draw(percentage / 100, ctx);
    },
    backToTop: function($this) {
        $this.click(function() {
            jQuery("body,html").animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    },
    scrollHook: function($this, color) {
        color = color ? color : "#FF5E52";
        $this.scroll(function() {
            var docHeight = (jQuery(document).height() - jQuery(window).height()),
                $windowObj = $this,
                $per = jQuery(".per"),
                percentage = 0;
            
            var defaultScroll = $windowObj.scrollTop();
            percentage = Math.min(parseInt((defaultScroll / docHeight) * 100), 100); // 限制最大值100
            
            var backToTop = jQuery("#backtoTop");
            if (backToTop.length > 0) {
                // 显示/隐藏逻辑
                if ($windowObj.scrollTop() > 100) {
                    backToTop.addClass("button--show");
                } else {
                    backToTop.removeClass("button--show");
                }
                
                // 新增100%时显示图标逻辑
                if (percentage >= 100) {
                    $per.addClass("hide-percent").html('<i class="top-icon">↑</i>');
                } else {
                    $per.removeClass("hide-percent").attr("data-percent", percentage);
                }
                
                bigfa_scroll.drawCircle("#backtoTopCanvas", percentage, color);
            }
        });
    }
}

jQuery(document).ready(function() {
    jQuery("body").append('<div id="backtoTop" data-action="gototop">' +
        '<canvas id="backtoTopCanvas" width="45" height="45"></canvas>' +
        '<div class="per" data-percent="0"></div>' +
        '</div>');
    
    var T = bigfa_scroll;
    T.backToTop(jQuery("#backtoTop"));
    T.scrollHook(jQuery(window), "#FF5E52");
});

/* 添加以下CSS */
#backtoTop {
    position: fixed;
    right: 30px;
    bottom: 30px;
    width: 45px;
    height: 45px;
    cursor: pointer;
    opacity: 0;
    transition: opacity .3s;
}

#backtoTop.button--show {
    opacity: 1;
}

#backtoTopCanvas {
    position: absolute;
    left: 0;
    top: 0;
}

.per {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #fff;
}

.per::after {
    content: attr(data-percent)'%';
}

.per.hide-percent::after {
    content: none;
}

.top-icon {
    display: none;
    font-size: 24px;
    animation: bounce 1s infinite;
}

.per.hide-percent .top-icon {
    display: block;
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
}

/* 鼠标悬停效果 */
#backtoTop:hover .top-icon {
    animation: spin 0.6s ease;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
