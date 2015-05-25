define(["./Piece"], function(Piece){
	"use strict";

	var codeMap = {
		0:13,
		1:21
	},
	delta = [-1,1,-16,16];

	var Cannon = Piece.extend({
		init:function(cfg){
			Piece.prototype.init.apply(this, arguments);
			this.code = codeMap[this.player];
		},
		legalMove:function(dst){//假定dst一定在棋盘内
			var board = this.board, cell = this.cell, pcDst = board.boardMap[dst], nDelta, pin;
			if(this.isSide(pcDst)){
				return false;
			}
			if(this.sameRow(dst)){
				nDelta = cell < dst ? -1 : 1;
			}else if(this.sameCol(dst)){
				nDelta = cell < dst ? -16 : 16;
			}
			else{
				return false;
			}
			pin = this.cell + nDelta;
			while(pin != dst && board.boardMap[pin] == 0){
				pin += nDelta;
			}
			if(pin != dst && pcDst != 0){
				while(pin != dst && board.boardMap[pin] == 0){
					pin += nDelta;
				}
			}
			return pin == dst;
		},
		generateMoves:function(){
			var board = this.board, cell = this.cell, mvs=[], dst=null, pcDst, nDelta, oppSideCode = this.oppSideCode();
			for(var i=0;i<4;i++){
				nDelta = delta[i];
				dst = cell + nDelta;
				while(board.inBoard(dst)){
					pcDst = board.boardMap[dst];
					if(pcDst==0){
						mvs.push([cell, dst]);
					}
					else{
						break;
					}
					dst += nDelta;
				}
				dst += nDelta;
				while(board.inBoard(dst)){
					pcDst = board.boardMap[dst];
					if(pcDst != 0){
						if(oppSideCode & pcDst == 0){
							mvs.push([cell, dst]);
						}
						break;
					}
					dst += nDelta;
				}
			}
			return mvs;
		},
		getValue: function(){
			return Cannon.valuePos[this.cell];
		}
	});

	Cannon.valuePos=[
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,100,100, 96, 91, 90, 91, 96,100,100,  0,  0,  0,  0,
		0,  0,  0, 98, 98, 96, 92, 89, 92, 96, 98, 98,  0,  0,  0,  0,
		0,  0,  0, 97, 97, 96, 91, 92, 91, 96, 97, 97,  0,  0,  0,  0,
		0,  0,  0, 96, 99, 99, 98,100, 98, 99, 99, 96,  0,  0,  0,  0,
		0,  0,  0, 96, 96, 96, 96,100, 96, 96, 96, 96,  0,  0,  0,  0,
		0,  0,  0, 95, 96, 99, 96,100, 96, 99, 96, 95,  0,  0,  0,  0,
		0,  0,  0, 96, 96, 96, 96, 96, 96, 96, 96, 96,  0,  0,  0,  0,
		0,  0,  0, 97, 96,100, 99,101, 99,100, 96, 97,  0,  0,  0,  0,
		0,  0,  0, 96, 97, 98, 98, 98, 98, 98, 97, 96,  0,  0,  0,  0,
		0,  0,  0, 96, 96, 97, 99, 99, 99, 97, 96, 96,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0
	];

	return Cannon;
});