$(document).ready(function()
{
	$(".box").animate
	(
	{
		top:'0px',
	},500
	);
	$(".box").animate
	(
	{
		width:'400px',
		height:'300px',
	},500
	);

	$(".box").animate
	(
	{
	height:'300px',
	},500,function()
	{

		$("h1").fadeIn("slow");
		$(".in01").slideToggle("slow");
		$(".in01").addClass("inn");
		$(".in02").slideToggle("slow");
		$(".in02").addClass("inn");
		$(".in03").slideToggle("slow");
		$(".btn-success").slideToggle("slow");
		$("p").fadeIn(1100);
		$(".btn-danger").slideToggle("slow");
		$(".in1").slideToggle("slow");
		$(".in2").slideToggle("slow");
	}
	);

	$(".box").animate
	(
	{
		height:'+=70px',
		borderRaduis:'40px',

	},500
	);

});





















