/**
 * jImgColorPicker - Copyright Philippe Bernard 2013
 */

(function($) {
	$.fn.colorPicked = function(callback) {
		registerElement(this, callback);
		return this;
	};
} (jQuery));

function registerElement(canvas, callback) {
	if (! canvas.is('canvas')) {
		console.log('Element ' + canvas + 'is not a canvas');
		return;
	}
	
	var img = new Image();
	img.onload = function(e) {
		canvas.attr('width', e.target.naturalWidth);
		canvas.attr('height', e.target.naturalHeight);
		
		var context = canvas[0].getContext('2d');
		context.drawImage(e.target, 0, 0);
		
        if (callback != undefined) {
		    canvas.mousemove(function(e) {
		    	var scaleX = 1;
		    	var scaleY = 1;
		    	
		    	tr = canvas.css('transform');
		    	if (tr != 'none') {
			    	tr = tr.replace(/^\w+\(/,"[").replace(/\)$/,"]");
			    	tr = JSON.parse(tr);
			    	scaleX = tr[0];
			    	scaleY = tr[3];
		    	}
		    	
		        var 
		        	x = e.pageX - canvas.offset().left, 
		        	y = e.pageY - canvas.offset().top,
		        	d = context.getImageData(x / scaleX, y / scaleY, 1, 1).data, 
		        	r = d[0],
		        	g = d[1],
		        	b = d[2],
		        	a = d[3];
		        
		        callback(canvas, r, g, b, a);
		    });
        }
	};
	img.src = canvas.attr('src');
}

function jICPcomponentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
	return '#' + jICPcomponentToHex(r) + jICPcomponentToHex(g) + jICPcomponentToHex(b);
}
