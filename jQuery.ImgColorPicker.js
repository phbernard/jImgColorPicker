/**
 * jImgColorPicker - Copyright Philippe Bernard 2013
 */

(function($) {
	$.fn.colorPicked = function(callback) {
		console.log("Color pick registration");
		
		registerElement(this, callback);
		
		return this;
	};
} (jQuery));

function registerElement(canvas, callback) {
	console.log("Register " + canvas + " with " + callback);
	
	if (! canvas.is('canvas')) {
		console.log('Element ' + canvas + 'is not a canvas');
		return;
	}
	
	var img = new Image();
	img.onload = function(e) {
		console.log("Image is " + e.target.naturalWidth + "x" + e.target.naturalHeight);
		canvas.attr('width', e.target.naturalWidth);
		canvas.attr('height', e.target.naturalHeight);
		
		var context = canvas[0].getContext('2d');
		context.drawImage(e.target, 0, 0);
		console.log('Image loaded and drawn');
		
        if (callback != undefined) {
		    canvas.mousemove(function(e) {
		        var 
		        	x = e.pageX - canvas.offset().left, 
		        	y = e.pageY - canvas.offset().top,
		        	d = context.getImageData(x, y, 1, 1).data, 
		        	r = d[0],
		        	g = d[1],
		        	b = d[2],
		        	a = d[3];
		        
		        	callback(canvas, r, g, b, a);
		    });
        }
	};
	img.src = canvas.attr('src');
	
	console.log('Done!');
}

function jICPcomponentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
	return '#' + jICPcomponentToHex(r) + jICPcomponentToHex(g) + jICPcomponentToHex(b);
}
