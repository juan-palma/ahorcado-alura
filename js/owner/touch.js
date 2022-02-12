//******** Preparamos los eventos Touch y sus configuraciones y la alta del explorador. *********/

// Iniciamos creando el evento y lo definimos
/*
Browser.Features.Touch = (function(){
	try {
		document.createEvent('TouchEvent').initTouchEvent('touchstart');
		return true;
	} catch (exception){}
	
	return false;
})();
*/

//Definimos si es un movil
/*
(function(){
	Browser.Device = {
		name: 'other'
	};
	
	if (Browser.Platform.ios){
		let device = navigator.userAgent.toLowerCase().match(/(ip(ad|od|hone))/)[0];
		
		Browser.Device[device] = true;
		Browser.Device.name = device;
	}
	
	if (this.devicePixelRatio == 2)
		Browser.hasHighResolution = true;
	
	Browser.isMobile = !['mac', 'linux', 'win'].contains(Browser.Platform.name);
	
}).call(this);
*/


// Android doesn't have a touch delay and dispatchEvent does not fire the handler
Browser.Features.iOSTouch = (function(){
	let name = 'cantouch', // Name does not matter
		html = document.html,
		hasTouch = false;

	if (!html.addEventListener) return false;

	let handler = function(){
		html.removeEventListener(name, handler, true);
		hasTouch = true;
	};

	try {
		html.addEventListener(name, handler, true);
		let event = document.createEvent('TouchEvent');
		event.initTouchEvent(name);
		html.dispatchEvent(event);
		return hasTouch;
	} catch (exception){}

	handler(); // Remove listener
	return false;
})();


/*
// Creamos la contra parte de los eventos del mouse y cancelamos los el evento click
(function(){

	let down = false;
	let condition = function(event, type){
		if (type == 'touchstart') down = true;
		else if (type == 'touchend') down = false;
		else if (type == 'touchmove' && !down) return false;
	
		event.targetTouches = [];
		event.changedTouches = event.touches = [{
			pageX: event.page.x, pageY: event.page.y,
			clientX: event.client.x, clientY: event.client.y
		}];
	
		return true;
	};
	
	Element.Events.touchstart = {
		base: 'mousedown',
		condition: condition
	};
	Element.Events.touchmove = {
		base: 'mousemove',
		condition: condition
	};
	Element.Events.touchend = {
		base: 'mouseup',
		condition: condition
	};
	
	document.addEvent('mouseup', function() {
		down = false;
	});

//cancel click
	let name = 'click';
	delete Element.NativeEvents[name];
	
	Element.Events[name] = {
	
		base: 'touch'
	
	};

})();
*/

//delete Element.NativeEvents['click'];

//*** los creamos los eventos que queremos usar
// Evento Touch

(function(){
	let disabled;
	
	Element.Events.touch = {
	
		base: 'touchend',
	
		condition: function(event){
			if (disabled || event.targetTouches.length !== 0) return false;
	
			let touch = event.changedTouches[0],
				target = document.elementFromPoint(touch.clientX, touch.clientY);
	
			do {
				if (target == this) return true;
			} while (target && (target = target.parentNode));
	
			return false;
		},
	
		onEnable: function(){
			disabled = false;
		},
	
		onDisable: function(){
			disabled = true;
		}
	
	};
})();

// Evento swipe
(function(){
	let name = 'swipe',
		distanceKey = name + ':distance',
		cancelKey = name + ':cancelVertical',
		dflt = 50;
	
	let start = {}, disabled, active;
	
	let clean = function(){
		active = false;
	};
	
	let events = {
	
		touchstart: function(event){
			if (event.touches.length != 2) return;
	
			let touch = event.touches[0];
			let touch2 = event.touches[1];
			active = true;
			start = {x: touch.pageX, y: touch.pageY};
			start2 = {x: touch2.pageX, y: touch2.pageY};
		},
		
		touchmove: function(event){
			if (disabled || !active) return;
			if (event.changedTouches.length != 2) return;
						
			let touch = event.changedTouches[0],
			touch2 = event.changedTouches[1],
			end = {x: touch.pageX, y: touch.pageY},
			end2 = {x: touch2.pageX, y: touch2.pageY};
			
			if (this.retrieve(cancelKey) && Math.abs(start.y - end.y) > 10){
				active = false;
				return;
			}
			
			let distance = this.retrieve(distanceKey, dflt),
				delta = end.x - start.x,
				delta2 = end2.x - start2.x,
				isLeftSwipe = delta < -distance,
				isRightSwipe = delta > distance;
	
			if (event.scale < 0.95 && event.scale > 1.05) return;
			if (Math.abs(delta - delta2) > 10) return;
			if (!isRightSwipe && !isLeftSwipe) return;
						
			
			event.preventDefault();
			active = false;
			event.direction = (isLeftSwipe ? 'left' : 'right');
			event.start = start;
			event.end = end;
			
			this.fireEvent(name, event);
		},
	
		touchend: clean,
		touchcancel: clean
	
	};
	
	Element.Events[name] = {
	
		onAdd: function(){
			this.addEvents(events);
		},
	
		onRemove: function(){
			this.removeEvents(events);
		},
	
		onEnable: function(){
			disabled = false;
		},
	
		onDisable: function(){
			disabled = true;
			clean();
		}
	
	};
})();

// Evento pinch
(function(){
	let name = 'pinch',
		thresholdKey = name + ':threshold',
		disabled, active;
	
	let events = {
	
		touchstart: function(event){
			if (event.targetTouches.length == 2) active = true;
		},
	
		touchmove: function(event){
			if (disabled || !active) return;
	
			event.preventDefault();
	
			let threshold = this.retrieve(thresholdKey, 0.5);
			if (event.scale < (1 + threshold) && event.scale > (1 - threshold)) return;
	
			active = false;
			event.pinch = (event.scale > 1) ? 'in' : 'out';
			
			this.fireEvent(name, event);
		}
	
	};
	
	Element.Events[name] = {
	
		onAdd: function(){
			this.addEvents(events);
		},
	
		onRemove: function(){
			this.removeEvents(events);
		},
	
		onEnable: function(){
			disabled = false;
		},
	
		onDisable: function(){
			disabled = true;
		}
	};
})();

// Evento touchhold
(function(){
	let name = 'touchhold',
		delayKey = name + ':delay',
		disabled, timer;
	
	let clear = function(e){
		clearTimeout(timer);
	};
	
	let events = {
	
		touchstart: function(event){
			event.stopPropagation();
			if (event.touches.length > 1){
				clear();
				return;
			}
			
			timer = (function(){
				this.fireEvent(name, event);
			}).delay(this.retrieve(delayKey) || 750, this);
		},
	
		touchmove: clear,
		touchcancel: clear,
		touchend: clear
	
	};
	
	Element.Events[name] = {
	
		onAdd: function(){
			this.addEvents(events);
		},
	
		onRemove: function(){
			this.removeEvents(events);
		},
	
		onEnable: function(){
			disabled = false;
		},
	
		onDisable: function(){
			disabled = true;
			clear();
		}
	
	};

})();