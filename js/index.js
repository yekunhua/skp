window.onload = function() {
//初始化swiper
swiperInit();
//初始化headroom
headroomInit();

}

function headroomInit () {
	var myHeader = document.getElementById("navbar_container");
	var headroom = new Headroom(myHeader, {
  "offset": document.querySelector("#banner_container").offsetHeight,
});
	headroom.init();
//	alert(document.querySelector("#banner_container").offsetHeight);
}
function swiperInit () {
	var swiper = new Swiper('.swiper-container', {
	    //同时显示view个数
	    slidesPerView: 2,
	    //居中显示
	    centeredSlides: true,
	    //点击跳转到对应slide
	    slideToClickedSlide:true,
	    //间距
	    spaceBetween: 20,
	    //循环
	    loop: true,
	    //补位，1表示补两个
	    loopAdditionalSlides : 1
  })
}
function changeButtonIcon (icon) {
    var iconClassName = icon.className;
    if(iconClassName.indexOf(' mobile_menu_open') > -1){
        //连空格一起替换
        icon.className = icon.className.replace(' mobile_menu_open', '');
    }else{
        icon.className += ' mobile_menu_open';
    }
}