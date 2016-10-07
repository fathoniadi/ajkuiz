var socket = io.connect();
var soal_ = [];
var userAns=[];
var userScore=[];
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

function calcScore()
{
	var length_soal = soal_.length;	
	for(i in userAns)
	{
		console.log("looping");
		if(soal_[parseInt(userAns[i].soal)].jawaban_ajkuiz==userAns[i].jawaban)
		{
			console.log(userScore[userAns[i].id]);
			userScore[userAns[i].id]+=1;
			console.log(userScore[userAns[i].id]);
		}
	}
};

socket.on('recvClientAns', function(data){

	if(userAns.length==0)
	{
		userAns.push(data);
		userScore[data.id]=0;
	}
	else
	{
		var flag_exist=0;
		for(i in userAns)
		{
			console.log(userAns[i].id+" "+data.id+" "+userAns[i].soal+" "+data.soal);
			if(userAns[i].id==data.id&&userAns[i].soal==data.soal)
			{
				console.log("lebih dari satu input");
				userAns[i].jawaban = data.jawaban;
				flag_exist=1;
			}
		}
		if(flag_exist==0) 
		{
			console.log("belum input");
			userAns.push(data);
			userScore[data.id]=0;
		}
	}
});

function gantiSoal(noSoal,soalI)
{
	/*console.log(soalI);
	console.log("asdasd");*/
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



