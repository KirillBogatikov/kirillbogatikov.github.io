GitHubAnimation = {
	FPS:45, 
	animators:null,
	currentAnimator:null, 
	interpolator:null,
	icon:null,
	initiate:function() {
		GitHubAnimation.animators = [
		    function() {
				var right = parseInt(GitHubAnimation.icon.css("right"));
				right += GitHubAnimation.icon.width() / GitHubAnimation.FPS;
				GitHubAnimation.icon.css("right", right);
				
				return right < 0;
			},
			function() {
				var right = parseInt(GitHubAnimation.icon.css("right"));
				right -= GitHubAnimation.icon.width() / GitHubAnimation.FPS;
				GitHubAnimation.icon.css("right", right);
				
				return right > -GitHubAnimation.icon.width();
			}];
		GitHubAnimation.currentAnimator = null;
		GitHubAnimation.interpolator = null;
		GitHubAnimation.icon = $("#GitHubIcon");
	},
	animate:function(mode) {
		GitHubAnimation.currentAnimator = GitHubAnimation.animators[mode];

		if(GitHubAnimation.interpolator != null)
			return;
		
		GitHubAnimation.interpolator = function() {
			if(GitHubAnimation.currentAnimator())
				setTimeout(GitHubAnimation.interpolator, 1000 / GitHubAnimation.FPS);
			else 
				GitHubAnimation.interpolator = null;
		};
		
		GitHubAnimation.interpolator();
	}
};

AvatarAnimation = {
	FPS:25,
	animator:null,
	interpolator:null,
	icon_resource:null,
	icon_canvas:null,
	size:0,
	interrupted:false,
	initiate:function() {
		AvatarAnimation.icon_resource = $("<img src='img/KirillBogatikov.png'>");
		AvatarAnimation.icon_canvas = $("#avatar");
		
		AvatarAnimation.size = AvatarAnimation.icon_canvas.width();
		AvatarAnimation.icon_canvas = AvatarAnimation.icon_canvas[0];
		
		AvatarAnimation.icon_canvas.width = AvatarAnimation.icon_canvas.height = AvatarAnimation.size;
		AvatarAnimation.icon_resource.width(AvatarAnimation.size);
		AvatarAnimation.icon_resource = AvatarAnimation.icon_resource[0];
		
		AvatarAnimation.animator = function() {
			var ctx = AvatarAnimation.icon_canvas.getContext('2d');
			ctx.clearRect(0, 0, AvatarAnimation.size, AvatarAnimation.size);
			ctx.drawImage(AvatarAnimation.icon_resource, 0, 0, AvatarAnimation.size, AvatarAnimation.size);
			ctx.translate(AvatarAnimation.size / 2, AvatarAnimation.size / 2);
			ctx.rotate(36 / 25 * Math.PI / 180);
			ctx.translate(-AvatarAnimation.size / 2, -AvatarAnimation.size / 2);
		};
		
		var ctx = AvatarAnimation.icon_canvas.getContext('2d');
		ctx.clearRect(0, 0, AvatarAnimation.size, AvatarAnimation.size);
		ctx.drawImage(AvatarAnimation.icon_resource, 0, 0, AvatarAnimation.size, AvatarAnimation.size);
	},
	start:function() {
		AvatarAnimation.interrupted = false;
		if(AvatarAnimation.interpolator != null)
			return;
		
		AvatarAnimation.interpolator = function() {
			AvatarAnimation.animator();
			
			if(AvatarAnimation.interrupted)
				AvatarAnimation.interpolator = null;
			else 
				setTimeout(AvatarAnimation.interpolator, 1000 / AvatarAnimation.FPS);
		};
		
		AvatarAnimation.interpolator();
	}, 
	stop:function() {
		AvatarAnimation.interrupted = true;
	}
};