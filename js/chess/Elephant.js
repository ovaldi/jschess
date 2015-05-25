define(["./Piece"],function(Piece){
	"use strict";
	
	var codeMap ={
			0:10,
			1:18
		},
		//象眼偏移量
		pins = [-17,-15,15,17],
		//象的走法偏移量
		delta = [-38,-34,34,38];
	
	var Elephant = Piece.extend({
		init:function(){
			Piece.prototype.init.apply(this,arguments);
			this.code = codeMap[this.player];
			return this;
		},
		isValidMove:function(dst){
			var board = this.board;
			return !this.isSide(board.boardMap[dst]) && 
				board.legalSpanMap[dst - this.cell + 256] == 3;
		},
		generateMoves:function(){
			var board = this.board, boardMap = board.boardMap, cell = this.cell, moves=[], pin=null, dst=null, i;
			for(i = 0; i < 4; i++){
				pin= pins[i] + cell;
				if(board.inBoard(pin)&&this.isHomeHalf()&&boardMap[pin]==0){
					dst = cell + delta[i];
					if(board.inBoard(dst) && !this.isSide(boardMap[dst])){
						moves.push([cell, dst]);
					}				
				}
			}
			return moves;
		},
		getValue:function(){
			return Elephant.valuePos[this.cell];
		}
	});
	
	Elephant.valuePos=[
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0, 20,  0,  0,  0, 20,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0, 18,  0,  0,  0, 23,  0,  0,  0, 18,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0, 20,  0,  0,  0, 20,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0
	];
	
	return Elephant;
});