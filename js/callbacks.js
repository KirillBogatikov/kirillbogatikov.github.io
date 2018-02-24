var callbacks = {
		"devornchg":[]
};

Callbacks = {
		UPS:25,
		registerListener:function(property, listener) {
			callbacks[property].push(listener);
		},
		addOnDeviceOrientationChangeListener:function(l) {
			Callbacks.registerListener("devornchg", l);
		},
		__workspace: {
			lastFrameSize:[0, 0]
		},
		__update:function() {
			var lastSize = Callbacks.__workspace.lastFrameSize;
			if(screen.width != lastSize[0] || screen.height != lastSize[1]) {
				lastSize[0] = screen.width;
				lastSize[1] = screen.height;
				Callbacks.__callListeners("devornchg");
			}
				
			setTimeout(Callbacks.__update, 1000 / Callbacks.UPD);
		},
		__callListeners:function(property) {
			for(var i = 0; i < callbacks[property].length; i++) {
				try {
					callbacks[property][i].call();
				} catch (exception) {
					console.error(exception);
				}
			}
		}
};


