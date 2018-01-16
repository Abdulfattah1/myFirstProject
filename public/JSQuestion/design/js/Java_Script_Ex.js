$(document).ready(function(){

	$('.But').click(function(){
		$('.Ex_Box').fadeOut('slow',function(){
			$('.Bounce1').fadeIn('slow',function(){
				$('#one').fadeIn('slow',function(){
					$(this).fadeOut('slow',function(){
						$('#two').fadeIn('slow',function(){
							$(this).fadeOut('slow',function(){
								$('#three').fadeIn('slow',function(){
									$('.Bounce1').fadeOut('slow');
								});
							});
						});
					});
				});
			});
		});
	});
});	



