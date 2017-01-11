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
			console.log(data);
	   		setList(data);
 		}
	});
}

function setList(data) {
	var list = '';
	for (var i = 0; i < streamers.length; i++) {
		var live = '';
		for (var j = 0; j < data.streams.length; j++) {
			if (data.streams[j].channel.display_name === streamers[i]) {
				live = 'LIVE';
			}
		}
		list += '<li>' + streamers[i] + ' ' + live + '</li>';
	}
	$('#streamer-list').append(list);
}


