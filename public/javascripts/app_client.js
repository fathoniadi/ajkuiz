var socket = io();
var supportVibrate = "vibrate" in navigator;

$(document).ready(function(){

  $('#myModal').modal({
  	backdrop: 'static',
  	keyboard: true
	});
});

window.onresize = function (event) {
  applyOrientation();
}

function applyOrientation() {
  if (window.innerHeight > window.innerWidth) {
    	alert('Best view in landscape mode');
  }
}

$(document).on('submit','#myForm', function(e){
	e.preventDefault();
	var username =$('#username').val();
	if(username!='')
	{
		$("#clientContaint").css('display','');
		$("#userApp").text(username);
		$("#user-content").css('display','');
		socket.emit('user', socket.id,username);
		$('#myModal').modal('hide');
	}
	else alert("Nama tidak boleh kosong");
});


$(document).on('click','.but-ans', function(e){
	e.preventDefault();

	$('.but-ans').css('background-color','#555555');
	$(this).css('background-color','#50c878');
	//$('.but-ans').css('background-color','red');
	var noSoal = $('#noSoal').text();
	var answer = $(this).attr('value');
	var username = $("#userApp").text();
	var data = {	
					'id': '/#'+socket.id,
					'username':username,
					'soal':noSoal,
					'jawaban':answer
	};

	socket.emit('receiveClient',data);
});

socket.on('recvNoSoal', function(noSoal, soalData)
{
	$('.but-ans').css('background-color','#555555');
	$('#opsiA').text(soalData.opsiA);
	$('#opsiB').text(soalData.opsiB);
	$('#opsiC').text(soalData.opsiC);
	$('#opsiD').text(soalData.opsiD);
	$('#noSoal').text(noSoal);
	navigator.vibrate(1000);
})