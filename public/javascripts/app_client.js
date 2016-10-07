var socket = io();

$(document).ready(function(){
  $('#myModal').modal({
  	backdrop: 'static',
  	keyboard: true
	});
});

$(document).on('submit','#myForm', function(e){
	e.preventDefault();
	var name =$('#username').val();
	if(name!='')
	{
		$("#clientContaint").css('display','');
		$("#userApp").text(name);
		$("#user-content").css('display','');
		socket.emit('user', socket.id,name);
		$('#myModal').modal('hide');
	}
	else alert("Nama tidak boleh kosong");
});


$(document).on('click','.but-ans', function(e){
	e.preventDefault();

	var answer = $(this).attr('value');
	var username = $("#userApp").text();
	alert(username);
	

});