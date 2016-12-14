window.onload = function () {
    //初始化swiper
    swiperInit();
    //初始化headroom
    headroomInit();
    //搜索框非空颜色改变
    inputNotFocusChangeBGColor();
    //固定“主编推荐”
    fixedEditorRecommendation();
}

function headroomInit() {
    var navbar = document.getElementById("navbar_container");
    var headroom = new Headroom(navbar, {
        //过了轮播幻灯片才开始隐藏导航
        offset: document.getElementById("banner_container").offsetHeight,
    });
    headroom.init();
}

function swiperInit() {
    var swiper1SPV, swiper2SPV;
    if (window.innerWidth < 768) {
        swiper1SPV = 1.6;
        swiper2SPV = 2;
    } else {
        swiper1SPV = 2;
        swiper2SPV = 3;
    }
    var swiper1 = new Swiper('#banner_container .swiper-container', {
        //同时显示view个数
        //		slidesPerView: 2,
        slidesPerView: swiper1SPV,
        //居中显示
        centeredSlides: true,
        //点击跳转到对应slide
        slideToClickedSlide: true,
        //间距
        spaceBetween: 20,
        //循环
        loop: true,
        //自动滚
        //	    autoplay : 5000,
        //用户操作完，还能自动滚
        //		autoplayDisableOnInteraction : false,
        //补位，1表示补两个
        loopAdditionalSlides: 1,
        //切换回调
        onSlideChangeStart: function () {
            removeVideoInSlide();
        }
    });
    var swiper2 = new Swiper('.newest_choice .swiper-container', {
        //同时显示view个数
        //		slidesPerView: 3,
        slidesPerView: swiper2SPV,
        //		slidesPerView: function(){
        //			if(window.innerWidth < 768) {
        //				return 2;
        //			}else{
        //				return 3;
        //			}
        //		},
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        //间距
        spaceBetween: 27,
        //循环
        loop: true,

    });
    //	swiper2.params.slidesPerView=2;
    //	if(window.innerWidth < 768) {
    //			setTimeout(function(){
    //				swiper1.params.slidesPerView=1.6;
    //				swiper2.params.slidesPerView=2;
    //			}, 1000);
    //	}
    //	if(window.innerWidth < 768) {
    //			swiper1.params.slidesPerView = 1.6;
    //			swiper2.params.slidesPerView = 2;
    //	} else {
    //			swiper1.params.slidesPerView = 2;
    //			swiper2.params.slidesPerView = 3;
    //	}
    window.onresize = function () {
        if (window.innerWidth < 768) {
            swiper1.params.slidesPerView = 1.6;
            swiper2.params.slidesPerView = 2;
        } else {
            swiper1.params.slidesPerView = 2;
            swiper2.params.slidesPerView = 3;
        }
    }
}

function inputNotFocusChangeBGColor() {
    $("#navbar_search_input").blur(function () {
        //清空两边空格
        $str = $.trim($(this).val());
        $(this).val($str);
        if ($str == "") {
            $(this).attr("style", "");
        } else {
            $(this).css("background-color", "#E7E7E7");
        }
    });
}

function mobileNavBarDisplay() {
    //  var iconClassName = icon.className;
    //  if(iconClassName.indexOf(' mobile_menu_open') > -1){
    //      //连空格一起替换
    //      icon.className = icon.className.replace(' mobile_menu_open', '');
    //  }else{
    //      icon.className += ' mobile_menu_open';
    //  }
    //alert("2");
    var $icon = $("#mobile_button");
    $icon.toggleClass("mobile_button_open");
    var $menu = $("#mobile_navbar");
    $menu.toggleClass("mobile_navbar_open");
}

function addVideoInSlide(videoButton) {
    //	var fatherEle = button.parentNode;
    //	fatherEle.parentElement.style.overflow="hidden";
    //	var video1 = document.createElement("video");
    //	video1.style.position="absolute";
    //	video1.style.top="0";
    //	video1.style.width="auto";
    //	video1.style.height="100%";
    //	video1.setAttribute('id', 'slide_video');
    //	video1.setAttribute('controls', '');
    //	video1.setAttribute('autoplay', '');
    //	var source1 = document.createElement("source");
    //	source1.setAttribute('type', 'video/mp4');
    //	source1.setAttribute('src', 'http://www.skp-beijing.com/wp-content/uploads/2015/11/15s.mp4');
    //	video1.appendChild(source1);
    //	fatherEle.appendChild(video1);
    //	//偏移
    //	video1.style.left="50%";
    //	video1.style.transform="translateX(-50%)";

    var $videoButtonEle = $(videoButton);
    var $fatherEle = $videoButtonEle.parent();
    $fatherEle.parents(".swiper-slide").css("overflow", "hidden");
    var $videoEle = $("<video></video>");
    $videoEle.css({
        "position": "absolute",
        "top": "0",
        "left": "50%",
        "transform": "translateX(-50%)",
        "width": "auto",
        "height": "100%",
    });
    $videoEle.attr({
        "id": "slide_video",
        "controls": "",
        "autoplay": ""
    });
    $fatherEle.append($videoEle);
    var $sourceEle = $("<source></source>");
    $sourceEle.attr({
        "type": "video/mp4",
        "src": "http://www.skp-beijing.com/wp-content/uploads/2015/11/15s.mp4"
    });
    $videoEle.append($sourceEle);
}

function removeVideoInSlide() {
    //	var ele=document.getElementById("slide_video");
    //	if(ele){
    //		var fatherEle=ele.parentNode;
    //	fatherEle.removeChild(ele);
    //	}

    var $ele = $("#slide_video");
    if ($ele) {
        $ele.remove();
    }
}

function fixedEditorRecommendation() {
    var startHeight = $(".editor_recommendation").offset().top - 150;
    var overHeight = $(".trend_discovery").offset().top - $(window).height();

    //刷新情况
    fixedEditorRecommendationAction(startHeight, overHeight);

    //滚动情况
    $(window).scroll(function () {
        fixedEditorRecommendationAction(startHeight, overHeight);
    });

    //改变宽度情况
    $(window).resize(function () {
        startHeight = $(".editor_recommendation").offset().top - 150;
        overHeight = $(".trend_discovery").offset().top - $(window).height();
        fixedEditorRecommendationAction(startHeight, overHeight);
    });
}

function fixedEditorRecommendationAction(startHeight, overHeight) {
    var currentHeight = $(window).scrollTop();

    if (currentHeight >= startHeight) {
        if (currentHeight < overHeight) {
            $(".editor_recommendation").removeClass("editor_recommendation_absolute");
            $(".editor_recommendation").addClass("editor_recommendation_fixed");
        } else {
            $(".editor_recommendation").removeClass("editor_recommendation_fixed");
            $(".editor_recommendation").addClass("editor_recommendation_absolute");
        }

    } else {
        $(".editor_recommendation").removeClass("editor_recommendation_fixed");
        $(".editor_recommendation").removeClass("editor_recommendation_absolute");

    }
}