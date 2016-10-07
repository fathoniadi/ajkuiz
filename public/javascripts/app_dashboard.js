var socket = io.connect();
var soal_ = [];
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

	$("#kategoriSoal").text(cat);
	socket.emit('getSoal',cat);

	
	$("#myModalCat").modal('hide');

});

socket.on('recvSoal', function(soal){
	soal_=soal;
	//console.log(soal_);
	$("#myModalStart").modal();
});

function gantiSoal(noSoal,soalI)
{
	console.log(soalI);
	console.log("asdasd");
	$("#noSoal").text(noSoal+1);
	socket.emit('triggerNoSoal', noSoal+1);
	$("#soalnya").text(soalI.soal_ajkuiz);
	$("#pilihanA").text(soalI.opsiA_ajkuiz);
	$("#pilihanB").text(soalI.opsiB_ajkuiz);
	$("#pilihanC").text(soalI.opsiC_ajkuiz);
	$("#pilihanD").text(soalI.opsiD_ajkuiz);
}

$(document).on('click', '#but-start', function(e){
	var noSoal=0;
	var length_soal = soal_.length;

	e.preventDefault();
	$("#myModalStart").modal('hide');
	$("#dashboardContent").css('display','');

	var counter = 30;
	$("#timerCountdown").text(counter);
	gantiSoal(noSoal,soal_[noSoal]);
	var interval = setInterval(function() {
	    counter--;
	    $("#timerCountdown").text(counter);
	    if (counter == 0) {
	    	noSoal+=1;
	    	if(noSoal==length_soal) clearInterval(interval);
	        else 
	        {		gantiSoal(noSoal,soal_[noSoal]);
	        		counter = 30;
	        		$("#timerCountdown").text(counter);
	        }
	    }
	}, 1000);
});



