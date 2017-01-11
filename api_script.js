var streamers = ['ESL_SC2','OgamingSC2','cretetion','freecodecamp','storbeck','habathcx','RobotCaleb','noobs2ninjas','brunofin','comster404'];
var clientID = 'rpkd7d5ra8zsd5jgbupb4nuywh7ivc';

$(document).ready(function() {
	getLiveStreamers();
	//setList(data);	
});

function getLiveStreamers() {
	$.ajax({
		url: 'https://api.twitch.tv/kraken/streams?channel=' + streamers.toString(),
		headers: {
		'Client-ID': clientID
		},
		success: function(data) {
			//console.log(data);
	   		setList(data);
 		}
	});
}

function setList(data) {
	var list = '';
	$.each(data.streams, function(index, stream) {
		console.log(stream);
		list += '<li>' + stream.channel.display_name + '</li>';
	}); 
	$('#streamer-list').append(list);
}


