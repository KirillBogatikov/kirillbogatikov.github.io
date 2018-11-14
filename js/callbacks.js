var callbacks = {
		"devornchg":[],
		"onpgloadd":[]
};

Callbacks = {
		UPS:25,
		registerListener:function(property, listener) {
			callbacks[property].push(listener);
		},
		addOnDeviceOrientationChangeListener:function(l) {
			Callbacks.registerListener("devornchg", l);
		},
		addOnloadListener:function(l) {
			Callbacks.registerListener("onpgloadd", l);
		},
		__workspace: {
			lastFrameSize:[0, 0]
		},
		__update:function() {
			var lastSize = Callbacks.__workspace.lastFrameSize;
			if(screen.width != lastSize[0] || screen.height != lastSize[1]) {
				var r = Callbacks.__callListeners("devornchg");
				if(r) {
					lastSize[0] = screen.width;
					lastSize[1] = screen.height;
				}
			}
			
			onload = function() {
				for(var callback in callbacks) {
					Callbacks.__callListeners(callback);
				}
			}
				
			setTimeout(Callbacks.__update, 1000 / Callbacks.UPD);
		},
		__callListeners:function(property) {
			var i;
			for(i = 0; i < callbacks[property].length; i++) {
				try {
					callbacks[property][i].call();
				} catch (exception) {
					console.error(exception);
				}
			}
			return i > 0;
		}
};
