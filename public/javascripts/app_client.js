var socket = io();

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

	var answer = $(this).attr('value');
	var username = $("#userApp").text();
	var data = {	
					'id': '/#'+socket.id,
					'username':username,
					'soal':null,
					'jawaban':answer
	};

	socket.emit('receiveClient',data);
	//alert(username);
	

});