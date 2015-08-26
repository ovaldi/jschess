define(function(){
	"use strict";

	return {
		//使用一个数字来代表走法的原始位置和目标位置
		genMove: function(src, dst){
			return src + dst * 256;
		},
		//反推起始位置
		getSrc: function(mv){
			return mv % 256;
		},
		//反推目标位置
		getDest: function(){
			return parseInt(mv/256);
		}
	};
});