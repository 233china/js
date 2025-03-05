// back-to-top.js
(function() {
    /* 动态注入 CSS */
    var style = document.createElement('style');
    style.textContent = `
        #backtoTop {
            position: fixed;
            right: 30px;
            bottom: 30px;
            width: 45px;
            height: 45px;
            cursor: pointer;
            opacity: 0;
            transition: opacity .3s;
            z-index: 999;
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
            pointer-events: none;
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
        #backtoTop:hover .top-icon {
            animation: spin 0.6s ease;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    /* JavaScript 逻辑 */
    var bigfa_scroll = {
        drawCircle: function(id, percentage, color) {
            var width = jQuery(id).width();
            var height = jQuery(id).height();
            var radius = parseInt(width / 2.20);
            var position = width;
            var positionBy2 = position / 2;
            var bg = jQuery(id)[0];
            
            // 修复 Canvas 警告
            var ctx;
            try {
                ctx = bg.getContext("2d", { willReadFrequently: true });
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
            draw(Math.min(percentage, 100) / 100, ctx); // 限制最大值
        },
        backToTop: function($this) {
            $this.on('click', function(e) {
                e.preventDefault();
                jQuery("html, body").animate({ scrollTop: 0 }, 800);
            });
        },
        scrollHook: function($this, color) {
            color = color || "#FF5E52";
            $this.on('scroll', function() {
                var docHeight = jQuery(document).height() - jQuery(window).height();
                var percentage = Math.min(parseInt((jQuery(window).scrollTop() / docHeight) * 100), 100);
                var $backToTop = jQuery("#backtoTop");
                
                // 显示/隐藏逻辑
                $backToTop.toggleClass("button--show", jQuery(window).scrollTop() > 100);
                
                // 100% 显示图标
                var $per = jQuery(".per");
                if (percentage >= 100) {
                    $per.addClass("hide-percent").html('<i class="top-icon">↑</i>');
                } else {
                    $per.removeClass("hide-percent").attr("data-percent", percentage);
                }
                
                this.drawCircle("#backtoTopCanvas", percentage, color);
            }.bind(this));
        }
    };

    /* 初始化 */
    jQuery(document).ready(function() {
        // 插入按钮结构
        jQuery("body").append(
            '<div id="backtoTop" data-action="gototop">' +
            '  <canvas id="backtoTopCanvas" width="45" height="45"></canvas>' +
            '  <div class="per" data-percent="0"></div>' +
            '</div>'
        );
        
        bigfa_scroll.backToTop(jQuery("#backtoTop"));
        bigfa_scroll.scrollHook(jQuery(window), "#FF5E52");
    });
})();
