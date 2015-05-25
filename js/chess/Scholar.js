define(["./Piece"],function(Piece){
	"use strict";
	
	var codeMap = {
			0:9,
			1:17
		},
		//士的走法偏移量
		delta = [-17,15,-15,17];
	
	var Scholar = Piece.extend({
		init:function(){
			Piece.prototype.init.apply(this,arguments);
			this.cdoe = codeMap[this.player];
			return this;
		},
		isValidMove:function(dst){
			return !this.isSide(this.board.boardMap[dst]) && 
				this.board.inFort(dst) && 
				this.board.legalSpanMap[dst - this.cell + 256] == 2;
		},
		generateMoves:function(){
			var me=this,moves=[],dst=null;
			for(var i=0;i<4;i++){
				dst=me.cell+me.delta[i];
				if(me.board.inFort(dst)&&!me.isSide(me.board.boardMap[dst])){
					moves.push([me.cell,dst]);
				}
			}
			return moves;
		},
		getValue:function(){
			return Scholar.valuePos[this.cell];
		}
	});
	
	
	Scholar.valuePos=[
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0, 20,  0, 20,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0, 23,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0, 20,  0, 20,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0
	];
	
	return Scholar;
});