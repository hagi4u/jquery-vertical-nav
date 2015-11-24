$.fn.verticalNav = function() {
    var $this = $(this);
    var scroll_flag = false;
    var x_pos_tmp = 0;
    var x_pos = 0;  
    var nav_width = 0;
    var extra_width = 5;    // 브라우저별 width 에 대한 렌더링이 달라서 여유값(px)
    //CSS3 속성 값
    var perproty_transition = 'all 300ms';
    var perproty_transition_fixed = 'all .3s ease-in-out';
    
    //Calc navigation width(reference to children elements)
    for(var i=0; i<parseInt($('>li', $this).size()); i++){
        nav_width += parseInt($('>li', $this).eq(i).width());
    }
    $($this).css({
        'width':nav_width+extra_width,
        'height':$('>li',$this).innerHeight(),
        'visibility':'visible',
        'transition':perproty_transition,
        'transform':'translate3d(0, 0, 0)'
    });
    $($this)
    .parent().css('overflow','hidden')
    .swipe({
        tap:touchTap,
        swipeStatus:verticalScrollingNav,
        allowPageScroll:"vertical",
        excludedElements:''
    }); 
    function touchTap(event, target){
        var $nav_elem = $(target);
        $('a', $this).removeClass('active');
        $nav_elem.addClass('active');
        alert('tapped : '+$nav_elem.html());
    }
    function verticalScrollingNav(event, phase, direction, distance) {
        var x_pos_matrix = matrixToArray($($this).css("transform"));
        if(!scroll_flag){
            scroll_flag = true;
        }
        if(phase == 'start'){
            x_pos_tmp = x_pos_matrix[4];
        } else if(phase == 'move'){
            if(direction == 'left'){
                x_pos = (eval(x_pos_tmp) - parseFloat(distance)*1.5);
            } else if(direction == 'right'){
                x_pos = (eval(x_pos_tmp) + parseFloat(distance)*1.5);
            }
            $($this).css('transform','translate3d('+x_pos+'px, 0, 0)');
        } else if (phase == 'end'){
            var max_screen = nav_width - $(this).width() - extra_width/2;
            if(x_pos > 0){
                $($this).css({
                    'transition':perproty_transition_fixed,
                    'transform':'translate3d(0 ,0 ,0)'
                });
            } else if(x_pos < -max_screen){
                $($this).css({
                    'transition':perproty_transition_fixed,
                    'transform':'translate3d(-'+max_screen+'px, 0, 0)'
                });
            }
            $($this).css('transition',perproty_transition);
        }
    }
    function matrixToArray(matrix) {
        return matrix.substr(7, matrix.length - 8).split(', ');
    }
};