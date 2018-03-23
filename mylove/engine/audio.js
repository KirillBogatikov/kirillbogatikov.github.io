AudioSystem = function(uri) {
	this.fetchURI = uri;
	
	this.fetch = function() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', this.fetchURI, false);
		xhr.send(null);
		
		if(xhr.status != 200) {
			console.log("SMTH wrong: " + xhr.statusText);
		} else {
			this.tracks = JSON.parse(xhr.responseText);
		}
	}
	
	this.apply = function(player) {
		for(var trackID in this.tracks) {
			player.addTrack(this.tracks[trackID]);
		}
	}
};

AudioPlayer = function(widthForUI) {
	this.nativePlayer = $("<audio></audio>");
	this.current = -1;
	
	this.tracks = [];
	
	this.addTrack = function(track) {
		this.tracks.push(track);
		if(this.tracks.length == 1) {
			this.current++;
			this.nativePlayer.src = track.src;
		}
	};
	
	this.removeTrack = function(track) {
		for(var trackID in this.tracks) {
			if(this.tracks[trackID] == track) {
				delete this.tracks[trackID];
			}
		}
	};
	
	this.play = function() {
		if(this.nativePlayer.src == "") {
			this.playNextTrack();
		}
		
		this.nativePlayer.play();
	}
	
	this.pause = function() {
		this.nativePlayer.pause();
	}
	
	this.playNextTrack = function() {
		if(++this.current >= this.tracks.length)
			this.current = 0;
		
		this.playTrack(this.current);
	}
	
	this.playLastTrack = function() {
		if(--this.current < 0)
			this.current = this.tracks.length - 1;
		
		this.playTrack(this.current);
	}
	
	this.playTrack = function(index) {
		this.nativePlayer.src = this.tracks[index].src;
		this.nativePlayer.play();
		
		if(this.current != index) {
			this.current = index;
		}
	}
	
	this.toggleVolume = function() {
		this.nativePlayer.volume = (this.nativePlayer.volume <= 0 ? 1 : 0);
	}
	
	this.moveTo = function(p) {
		this.nativePlayer.currentTime = this.nativePlayer.duration * p;
	}
	
	this.UI = new AudioPlayerUI(this, widthForUI);
	
	this.nativePlayer.on("pause", function() {
		this.UI.updatePlayButton(true);
		
		if(Math.round(this.nativePlayer.currentTime) == Math.round(this.nativePlayer.duration))
			this.playNextTrack();
		
	}.bind(this));
	
	this.nativePlayer.on("play", function() {
		this.UI.updatePlayButton(false);
	}.bind(this));
	
	this.nativePlayer.on("timeupdate", function() {
	  	 var p = this.nativePlayer.currentTime / this.nativePlayer.duration;
	  	 this.UI.setProgress.bind(this.UI, p, false)();
	  	 
	  	 var parseTime = function(atime) {
			var time = Math.round(atime);
			 var mins = Math.floor(time / 60);
			 var secs = time - (mins * 60);
			
			 mins = mins.toString();
			 secs = secs.toString();
			
			 if(mins.length == 1)
				mins = "0" + mins;
			 if(secs.length == 1)
				secs = "0" + secs;
				
			return [isNaN(mins) ? "00" : mins, isNaN(secs) ? "00" : secs];
		 }
	  	 
	  	 this.UI.updateTrackInfo.bind(this.UI, parseTime(this.nativePlayer.currentTime), parseTime(this.nativePlayer.duration), this.tracks[this.current].title)();
	}.bind(this));
	this.nativePlayer = this.nativePlayer[0];
};

AudioPlaylistUI = function(player) {
	this.shadow = $("<div></div>");
	this.shadow.width("100%").height("100%").css("position", "fixed").css("");
	this.shadow.on("click", function() {
		this.dismiss();
	}.bind(this));
	this.container = $("<div></div>");
	this.container.width("50%").height("80%").css("background", "rgba(0, 0, 0, 0.5)").css("overflow", "auto").css("position", "fixed").css("left", "25%").css("top", "10%").css("padding", 15).css("color", "#FFB400");

	player.UI.playlistUI = this;
	
	this.show = function() {
		for(var trackID in player.tracks) {
			var item = $("<div></div>");
			item.width("100%").css("border-bottom", "solid 2px #FFB400 ").html(player.tracks[trackID].title).css("font-size", "150%").css("padding-top", 5).css("padding-bottom", 5);
			eval("item.on('click', function(){ player.playTrack('" + trackID + "'); });");
			this.container.append(item);
		}
		
		this.shadow.css("display", "block");
		this.container.css("display", "block");
	}
	
	this.dismiss = function() {
		this.container.css("display", "none");
		this.shadow.css("display", "none");
	}
	
	$(document.body).append(this.shadow).append(this.container);
	this.dismiss();
}

AudioPlayerUI = function(player, width) {
	const DEL = 10;
	
	this.last = $("<img class='audio-player-button' src='" + REL_PATH + "img/audioplayer/last.png'/>");
	this.play = $("<img class='audio-player-button' src='" + REL_PATH + "img/audioplayer/play.png' state='play'/>");
	this.next = $("<img class='audio-player-button' src='" + REL_PATH + "img/audioplayer/next.png'/>");
	this.volume = $("<img class='audio-player-button' src='" + REL_PATH + "img/audioplayer/volume_on.png' state='on'/>");
	
	this.seekbar = {
		container:$("<div></div>"),
		background:$("<div class='audio-player-seekbar-line'></div>"),
		foreground:$("<div class='audio-player-seekbar-line'></div>"),
		point:$("<div></div>")
	};
	
	this.seekbar.background.width(width).css("background", "#BF8500");
	this.seekbar.background.on("click", function(e) { this.onbarclick(e); }.bind(this));
	this.seekbar.foreground.width(0).css("background", "#F2A900");
	this.seekbar.foreground.on("click", function(e) { this.onbarclick(e); }.bind(this));
	this.seekbar.point.width(20).height(20).css("border-radius", 15).css("background", "#FFB400").css("position", "absolute").css("z-index", "3").css("top", 20).css("box-shadow", "0 0 10px #BF8500").css("left", 15);
	this.seekbar.container.append(this.seekbar.background).append(this.seekbar.foreground).append(this.seekbar.point);
	
	this.playlistUI = null;
	this.title = $("<marquee>AHAHAHAHHAHA</marquee>");
	this.title.css("font-size", (width / Math.max(screen.width, screen.height) * 500) + "%").css("background", "rgba(0, 0, 0, 0.5)").css("padding", 5).css("border-radius", "20px").css("color", "#FFB400");
	this.title.on("click", function() {
		if(this.playlistUI != null) {
			this.playlistUI.show();
		}
	}.bind(this));
			
	this.timer = {
		current:$("<div class='audio-player-timer'></div>"),
		full:$("<div class='audio-player-timer'></div>")
	};
	
	this.last.on("click", function(){ player.playLastTrack(); });
	this.play.on("click", function(){
		var state = this.play.attr('state');
		if(state == 'play') {
			player.play();
			this.updatePlayButton(false);
		} else {
			player.pause();
			this.updatePlayButton(true);
		}
	}.bind(this));
	this.next.on("click", function(){ player.playNextTrack(); });
	this.volume.on("click", function() {
		var state = this.volume.attr('state');
		player.toggleVolume();
		if(state == 'on') {
			this.volume.attr('state', 'off');
		} else {
			this.volume.attr('state', 'on');
		}
		this.volume.attr("src", REL_PATH + "img/audioplayer/volume_" + this.volume.attr('state') + ".png");
	}.bind(this));
	
	this.timer.current.html("00:00");
	this.timer.current.css("position", "relative").css("float", "left").css("font-size", (width / Math.max(screen.width, screen.height) * 350) + "%");
	this.timer.full.html("00:00");
	this.timer.full.css("position", "relative").css("float", "right").css("font-size", (width / Math.max(screen.width, screen.height) * 350 ) + "%");
	
	this.controls = $("<div></div>");
	this.controls.append(this.last).append(this.play).append(this.next).append(this.volume);
	
	this.container = $("<table></table>");
	var line = $("<tr></tr>");
	var cell = $("<td style='padding-left:15px'></td>");
	cell.attr("colspan", "3").append(this.seekbar.container).height(35);
	line.append(cell);
	this.container.append(line);
	
	line = $("<tr></tr>")
	cell = $("<td></td>");
	cell.attr("colspan", "3").append(this.title);
	line.append(cell);
	this.container.append(line);
	
	line = $("<tr align='center'></tr>");
	cell = $("<td></td>");
	cell.append(this.timer.current);
	cell.width(width * 2 / 8);
	line.append(cell);
	cell = $("<td></td>");
	cell.append(this.controls);
	cell.width(width * 4 / 8);
	line.append(cell);
	cell = $("<td></td>");
	cell.append(this.timer.full);
	cell.width(width * 2 / 8);
	line.append(cell);
	this.container.append(line).width(width + 50).css("padding", "7px").css("background", "rgba(0, 0, 0, 0.33)").css("border-radius", 30);
	$(document.body).append(this.container);
	
	$(".audio-player-button").width(width / 8).height(width / 8);
	$(".audio-player-seekbar-line").height(10).css("border-radius", 10).css("position", "absolute").css("z-index", "1").css("top", 25);
	$(".audio-player-timer").css("background", "rgba(0, 0, 0, 0.5)").css("padding", 5).css("border-radius", "20px").css("color", "#FFB400");
	
	this.stopSeekbarTracking = function(event) {
		if(event.target != this.seekbar.point[0] && this.seekbar.point.attr("state") != "down")
			return;
			
		this.seekbar.point.attr("state", "up");	
	};
	
	this.startSeekbarTracking = function(event) {
		if(event.target != this.seekbar.point[0])
			return;
			
		this.seekbar.point.attr("state", "down");
	};
	
	this.trackSeeking = function(event) {
		if(this.seekbar.point.attr("state") != "down")
			return;
		
		var x, y;
		if(event.originalEvent.touches)	{
			event = event.originalEvent.touches[0];
		}
		
		x = event.clientX - this.container[0].offsetLeft - this.seekbar.background[0].offsetLeft;
		y = event.clientY - this.container[0].offsetTop - this.seekbar.background[0].offsetTop;
		
		if(x < this.seekbar.point.width() / 2 || x > this.seekbar.background.width())
			return;
			
		this.setProgress(x / this.seekbar.background.width(), true);
	}
	
	this.getProgress = function() {
		var p = Math.round(this.seekbar.foreground.width() / this.seekbar.background.width() * 100) / 100;
		return Math.max(0, Math.min(p, 1));
	}
	
	this.setProgress = function(p, updateTrack) {
		this.seekbar.foreground.width(this.seekbar.background.width() * p);
		this.seekbar.point.css("left", this.seekbar.background[0].offsetLeft + this.seekbar.foreground.width() - this.seekbar.point.width() / 2);
		
		if(updateTrack) {
			player.moveTo(this.getProgress());
		}
	}
	
	this.onbarclick = function(event) {
		var x = event.pageX - this.container[0].offsetLeft - this.seekbar.background[0].offsetLeft;
		var y = event.pageY - this.container[0].offsetTop - this.seekbar.background[0].offsetTop;
		
		if(x < this.seekbar.point.width() / 2 || x > this.seekbar.background.width())
			return;
			
		this.setProgress(x / this.seekbar.background.width(), true);
	}	
	
	this.updatePlayButton = function(paused) {
		if(!paused)
			this.play.attr('state', 'pause');
		else
			this.play.attr('state', 'play');
			
		this.play.attr("src", REL_PATH + "img/audioplayer/" + this.play.attr('state') + ".png");
	}
	
	this.updateTrackInfo = function(current, duration, _title) {
		this.timer.current.html(current[0] + ":" + current[1]);
		this.timer.full.html(duration[0] + ":" + duration[1]);
		this.title.html(_title);
	}
	
	$(window).on("mouseup", this.stopSeekbarTracking.bind(this));
	$(window).on("mousedown", this.startSeekbarTracking.bind(this));
	$(window).on("mousemove", this.trackSeeking.bind(this));
	
	$(window).on("touchstart", this.startSeekbarTracking.bind(this));
	$(window).on("touchend", this.stopSeekbarTracking.bind(this));
	$(window).on("touchmove", this.trackSeeking.bind(this));
	
};