const channels = ['ESL_SC2','OgamingSC2','cretetion','freecodecamp','storbeck','habathcx','RobotCaleb','noobs2ninjas','brunofin','comster404'];
const clientID = 'rpkd7d5ra8zsd5jgbupb4nuywh7ivc';
const baseUrl = 'https://api.twitch.tv/kraken';

const getChannelUrl = (data) => {
	return data._links.channel;
}

const addListItem = (isOnline, data) => {
	let li = '';
	let status = '';
	let colorClass = '';
	if (isOnline) {
		status = 'ONLINE';
		colorClass = 'list-group-item-success';
	} else {
		status = 'OFFLINE';
		colorClass = 'list-group-item-danger';
	}
	li += '<a href="' + data.url + '" class="list-group-item ' + colorClass + '" target="_blank">';
	li += '<img class="logo" src="' + data.logo + '"' + 'alt="logo">';
	li += '<h4 class="list-group-item-heading">' + data.display_name + '</h4>';
	li += '<span class="list-group-item-text">' + data.status + '</span>';
	li += '<span class="status">' + status + '</span>';
	li += '</a>';

	$('#streamer-list').append(li);
}

const setChannelInfo = (isOnline, channel) => {
	// retrieving channel information
	$.ajax({
		url: baseUrl + '/channels/' + channel,
		dataType: 'json',
		headers: {
		'Client-ID': clientID
		},
		success: function(data) {
			addListItem(isOnline, data);

		},
		error: function (jqXHR, textStatus, errorThrown) {
			var msg = '';
			if (jqXHR.status === 404) {
				msg = 'Channel "' + channel + '" does not exist!!';
				$('#exist').append('<li>' + msg + '</li>');
			}
		}
	});
}

const setActive = (id) => {
	// clears lists
	$('#exist').empty();
	$("#streamer-list").empty();

	// removes active tab
	$("#all").removeClass("active");
	$("#online").removeClass("active");
	$("#offline").removeClass("active");

	// sets active tab to id
	$('#' + id).addClass("active");
}

const updateList = (list) => {
	// retrieving online streamers
	channels.forEach(function(channel) {
		$.ajax({
			url: baseUrl + '/streams/' + channel,
			dataType: 'json',
			headers: {
			'Client-ID': clientID
			},
			success: function(data) {
				var channelUrl = getChannelUrl(data);
				console.log(data);
				if (data.stream) {
					// ONLINE
					if (list === 'online' || list === 'all') {
						setChannelInfo(true, channel);
					}
				} else {
					// OFFLINE
					if (list === "offline" || list === "all") {
						setChannelInfo(false, channel);
					}
				}
 			}
		});
	});
}

const clicked = (list) => {
	setActive(list);
	updateList(list);
}

$(document).ready(() => {
	let list = 'all';

	updateList(list);
});
