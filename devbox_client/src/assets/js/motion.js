var bw = $(window).width();

$(window).resize(function () {
  bw = $(window).width();
  if (bw > 1024) {
    location.reload();
  }
});

$(function () {
  if (bw > 1024) {
    $(".nav_gnb").stop().hide();
    $(".header_nav").mouseover(function (e) {
      $(".nav_gnb").stop().slideDown();
    });
    $(".header_nav").mouseleave(function () {
      $(".nav_gnb").stop().slideUp();
    });
  }

  if (bw < 1023) {
    $(".nav_btn").click(function () {
      $(".nav_wrap").stop().animate({ marginRight: 0 });
    });
    $(".nav_btn_close").click(function () {
      $(".nav_wrap").stop().animate({ marginRight: "-100%" });
    });

    $(".main_gnb ul li h2").click(function () {
      $(this).next(".util").toggleClass("active");

      if ($(".util").hasClass("active") === true) {
        $(this).find("img").css({ transform: "rotate(180deg)" });
      } else {
        $(this).find("img").css({ transform: "rotate(360deg)" });
      }
    });
  }

  //제목 selctbox
  $(document).mouseup(function (event) {
    var target = event.target;
    var select = $(".content_select");

    if (!select.is(target) && select.has(target).length === 0) {
      select.removeClass("active");
    }
  });

  //모집중 프로그램 필터
  /*
var fActive;

function filters(filter){
  if(fActive != filter){
   
    $('.curri_filter').filter('.'+filter).show();
    $('.curri_filter').filter(':not(.'+filter+')').hide();
    fActive = filter;
		$('.filter_btn').removeClass("filter_active");
  }
}

$('.d-offLine').click(function(){ filters('offLine'); $(this).addClass("filter_active"); });
$('.d-onLine').click(function(){ filters('onLine'); $(this).addClass("filter_active"); });

$('.d-all').click(function(){
  $('.curri_filter').show();
  fActive = 'all';
	$(this).addClass("filter_active");
    $('.d-offLine').removeClass("filter_active");
    $('.d-onLine').removeClass("filter_active");
});


//모집중 프로그램 필터

var NfActive;

function Nfilters(filter){
  if(NfActive != filter){
   
    $('.ncurri_filter').filter('.'+filter).show();
    $('.ncurri_filter').filter(':not(.'+filter+')').hide();
    NfActive = filter;
		$('.filter_btn').removeClass("filter_active");
  }
}

$('.do-offLine').click(function(){ Nfilters('do-offLine'); $(this).addClass("filter_active"); });
$('.do-onLine').click(function(){ Nfilters('do-onLine'); $(this).addClass("filter_active"); });

$('.do-all').click(function(){
  $('.ncurri_filter').show();
  NfActive = 'all';
	$(this).addClass("filter_active");
    $('.do-offLine').removeClass("filter_active");
    $('.do-onLine').removeClass("filter_active");
});
*/
});
