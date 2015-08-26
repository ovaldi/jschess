define(function(){
	"use strict";

	return {
		//生成一个数字来代表一个走法的起始位置和目标位置
		gen: function(src, dst){
			return src + dst * 256;
		},
		//反推起始位置
		src: function(move){
			return move % 256;
		},
		//反推目标位置
		dest: function(move){
			return parseInt(move/256);
		}
	};
});