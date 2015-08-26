define([
	"./Piece",
	"./mv"
],function(Piece, mv){
	"use strict";

	var codeMap = {
			0: 13,
			1: 21
		},
		//炮的走法偏移量
		delta:[-1,1,-16,16]

	var Rook = Piece.extend({
		init:function(cfg){
			Piece.prototype.init.apply(this, arguments);
			this.code = codeMap[this.player];
		},
		isValidMove:function(dst){//假定dst一定在棋盘内
			var boardMap = this.board.boardMap, this.cell, nDelta,pin,pcDst=boardMap[dst];
			if(this.isSide(pcDst)){
				return false;
			}
			if(this.sameRow(dst)){
				nDelta=cell<dst?-1:1;
			}else if(this.sameCol(dst)){
				nDelta=cell < dst?-16:16;
			}
			else{
				return false;
			}
			pin = cell + nDelta;
			while(pin != dst && boardMap[pin]==0){
				pin += nDelta;
			}
			return pin == dst;
		},
		generateMoves:function(){
			var board = this.board, cell  = this.cell, oppSideCode = this.oppSideCode(), mvs=[], dst=null, pcDst, nDelta;
			for(var i=0;i<4;i++){
				nDelta = delta[i];
				dst = cell + nDelta;
				while(board.inBoard(dst)){
					pcDst = board.boardMap[dst];
					if(oppSideCode&pcDst == 0){
						mvs.push(mv.gen(cell, dst));
					}
					if(pcDst != 0){
						break;
					}
					dst += nDelta;
				}
			}
			return mvs;
		}
	});

	Rook.valuePos=[
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,206,208,207,213,214,213,207,208,206,  0,  0,  0,  0,
		0,  0,  0,206,212,209,216,233,216,209,212,206,  0,  0,  0,  0,
		0,  0,  0,206,208,207,214,216,214,207,208,206,  0,  0,  0,  0,
		0,  0,  0,206,213,213,216,216,216,213,213,206,  0,  0,  0,  0,
		0,  0,  0,208,211,211,214,215,214,211,211,208,  0,  0,  0,  0,
		0,  0,  0,208,212,212,214,215,214,212,212,208,  0,  0,  0,  0,
		0,  0,  0,204,209,204,212,214,212,204,209,204,  0,  0,  0,  0,
		0,  0,  0,198,208,204,212,212,212,204,208,198,  0,  0,  0,  0,
		0,  0,  0,200,208,206,212,200,212,206,208,200,  0,  0,  0,  0,
		0,  0,  0,194,206,204,212,200,212,204,206,194,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0
	];

	return Rook;
});