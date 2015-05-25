"use strict";

require.config({
	baseUrl:"./",
	paths:{
		"jquery": "jquery-1.10.1.min",
		"chess": "./chess"
	}
});

require(['chess/Board'], function (Board) {
    var board = new Board({
    	//config
    });

    //TODO
});