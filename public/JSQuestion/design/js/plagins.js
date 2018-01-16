
$(window).on('load',function()
{
  $('body').css({
    'opacity':'1'
  });
  $('.loading,.spinner').fadeOut('slow');
});

$(document).ready(function()
{

//Our section//


  $('.img1').hover(function(){
    $(this).css({
      'transition-duration': '0.7s',
      'transform': 'scale(1.1,1.1)',
      'cursor':'pointer'
    });
    $('#A').fadeIn('slow'); 
  },function()
  {
      $(this).css({
      'transform': 'scale(1,1)',
    });
      $('#A').fadeOut('slow');
  });  


    $('.img2').hover(function(){
    $(this).css({
      'transition-duration': '0.7s',
      'transform': 'scale(1.1,1.1)',
      
      'cursor':'pointer'
    });
    $('.s1').fadeIn('slow');
    $('#A').text($('#A1').text());
    $('#A').fadeIn('slow'); 
  },function()
  {
        $(this).css({
      'transform': 'scale(1,1)',
      
    });
      $('.s1').fadeOut('slow');
      $('#A').fadeOut('slow');
  });  


     $('.img3').hover(function(){
    $(this).css({
       'transition-duration': '0.7s',
      'transform': 'scale(1.1,1.1)',
      
      'cursor':'pointer'
    });
    $('.s2').fadeIn('slow');
    $('#A').text($('#A2').text());
    $('#A').fadeIn('slow'); 
  },function()
  {
        $(this).css({
      'transform': 'scale(1,1)',
      
      
    });
        $('.s2').fadeOut('slow');
      $('#A').fadeOut('slow');
  });  



   $('.img4').hover(function(){
    $(this).css({
       'transition-duration': '0.7s',
      'transform': 'scale(1.1,1.1)',
      
      'cursor':'pointer'
    });
    $('.s3').fadeIn('slow');
    $('#A').text($('#A3').text());
    $('#A').fadeIn('slow'); 
  },function()
  {
        $(this).css({
      'transform': 'scale(1,1)',
            
    });
        $('.s3').fadeOut('slow');
      $('#A').fadeOut('slow');
  });  



   $('.img5').hover(function(){
    $(this).css({
       'transition-duration': '0.7s',
      'transform': 'scale(1.1,1.1)',
      'cursor':'pointer'
    });
    $('.s4').fadeIn('slow');
    $('#A').text($('#A4').text());
    $('#A').fadeIn('slow'); 
  },function()
  {
        $(this).css({
      'transform': 'scale(1,1)',
      
    });
        $('.s4').fadeOut('slow');
      $('#A').fadeOut('slow');
  });  


   $('.s1').hover(function(){

    $('.I2').css({
      'opacity':'0.2',
    });
   },function(){
    $('.I2').css({
      'opacity':'0.8',
    });
   });


  $('.s2').hover(function(){

    $('.I3').css({
      'opacity':'0.2',
    });
   },function(){
    $('.I3').css({
      'opacity':'0.8',
    });
   });


  $('.s3').hover(function(){

    $('.I4').css({
      'opacity':'0.2',
    });
   },function(){
    $('.I4').css({
      'opacity':'0.8',
    });
   });



  $('.s4').hover(function(){

    $('.I5').css({
      'opacity':'0.2',
    });
   },function(){
    $('.I5').css({
      'opacity':'0.8',
    });
   });

//End Our-Section//

$('#im1').hover(function(){
  $('#A10').fadeIn('slow');
  $('.btnn1').fadeIn('slow');
});

$('#im2').hover(function(){
  $('#A11').fadeIn('slow');
  $('.btnn2').fadeIn('slow');
});

$('#im3').hover(function(){
  $('#A12').fadeIn('slow');
  $('.btnn3').fadeIn('slow');
});

  $("html").niceScroll();

  

  $(".li1").click(function()
  {
    $(this).addClass("Active_link");
    $(".li2,.li3,.li4,.li5,.li6").removeClass("Active_link");
    $(".since").fadeIn("slow");
    $(".mygad, .ashaar, .misque, .noqosh, .Photoshop").hide("1");
  });

  $(".li2").click(function()
  {
    $(this).addClass("Active_link");
    $(".li1,.li3,.li4,.li5,.li6").removeClass("Active_link");
    $(".mygad").fadeIn("slow");
    $(".since, .ashaar, .misque, .noqosh, .Photoshop").hide("1");
  });

  $(".li3").click(function()
  {
    $(this).addClass("Active_link");
    $(".li2,.li1,.li4,.li5,.li6").removeClass("Active_link");
    $(".ashaar").fadeIn("slow");
    $(".since, .mygad, .misque, .noqosh, .Photoshop").hide("1");
  });

    $(".li4").click(function()
  {    
    $(this).addClass("Active_link");
    $(".li2,.li3,.li1,.li5,.li6").removeClass("Active_link");
    $(".misque").fadeIn("slow");
    $(".since, .mygad, .ashaar,.noqosh, .Photoshop").hide("1");
  });

    $(".li5").click(function()
  {
      $(this).addClass("Active_link");
      $(".li2,.li3,.li4,.li1,.li6").removeClass("Active_link");
    $(".noqosh").fadeIn("slow");
    $(".since, .mygad, .ashaar, .misque,.Photoshop").hide("1");
  });

  $(".li6").click(function()
  {
    $(this).addClass("Active_link");
    $(".li2,.li3,.li4,.li5,.li1").removeClass("Active_link");
    $(".Photoshop").fadeIn("slow");
    $(".since, .mygad, .ashaar, .misque, .noqosh").hide("1");
  });


  $("img").hover(function(){
    $(this).addClass("hvr-grow-shadow ");
  });



});

<!-- window-->

$(window).scroll(function(){
  console.log($(this).scrollTop());
  if($(this).scrollTop()>=700)
  {
    $("#scrol").show();
  }
  else
  {
    $("#scrol").hide();
  }

  $("#scrol").click(function()
  {
    $("html,body").animate({scrollTop:0},600);
    scrollTop()=auto;
  });
});


<!--login-->
