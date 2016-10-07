var socket = io.connect();

$(document).ready(function(){
	$("#myModalCat").modal({
  	backdrop: 'static',
  	keyboard: true
	});
});

$(document).on('click', '.but-cat', function(e)
{
	e.preventDefault();
	var cat = $(this).attr('value');

	$("#catSoal").text(cat);
	socket.emit('getSoal',cat);

	$("#dashboardContent").css('display','');
	$("#myModalCat").modal('hide');

	var counter = 30;
	$("#timerCountdown").text(counter);
	var interval = setInterval(function() {
	    counter--;
	    $("#timerCountdown").text(counter);
	    if (counter == 0) {
	        counter = 30;
	        $("#timerCountdown").text(counter);
	    }
	}, 1000);

});




