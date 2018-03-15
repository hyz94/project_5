jQuery(function($){
    var $main = $('#v_main .man_wear .man_wear_bottom');
    var $mainUl = $('#v_main .man_wear .man_wear_bottom .product_list');
    var $mainWidth = $main.outerWidth(true);
    var $width = $mainUl.children().eq(0).outerWidth(true);
    var $len = $mainUl.children().length;
    $mainUl.css({'width':$width*$len});
    var startX,endX;
    var startEle = 0;
    var startLeft = $mainUl.position().left;

    $main.on('touchstart',function(e){
        startX = e.originalEvent.touches[0].clientX;
        startEle = $mainUl.position().left;
    });
    $main.on('touchmove',function(e){
        endX = e.originalEvent.touches[0].clientX;
        var disX = endX-startX;
        var left = startEle + disX;
        $mainUl.css({'left':left})
    });
    $main.on('touchend',function(e){
        var left = $mainUl.position().left;
// 判断正在滚动的图片距离左右图片的远近，以及是否为最后一张或者第一张
        var currNum = Math.round(-left/$width);
        var endLeft = 0;
        if(currNum<=0){
            endLeft = startLeft;
        }else{
            endLeft = -currNum * $width + startLeft;
        }
        if(currNum>=$len-2){
            endLeft = -$width*$len + $mainWidth;
        }
        $mainUl.css({'left':endLeft});
    })
})