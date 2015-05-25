define(function() {
	"use strict";

	var converter = {
		toBinary : function(num, scale) {
			scale = scale || 10;
			return parseInt(parseInt(num, scale).toString(2));
		},
		toDecimal : function(num, scale) {
			scale = scale || 10;
			return parseInt(num, scale);
		}
	};

	return converter;
}); 