define([
	"./Piece",
	"./mv"
],function(Piece, mv){
	"use strict";
	
	var codeMap = {
			0:14,
			1:22
		};
	
	var Pawn = Piece.extend({
		init:function(){
			Piece.prototype.init.apply(this,arguments);
			this.code = codeMap[this.player];
		},
		//向前走一步
		forward:function(){
			//this.cell-16：无论黑方红方，向前进一步
			//this.player<<5：红方player为0，则0<<5=0正好是向前进一步；黑方player是1，则正好1<<5=32，实现了向下进一步
			return this.cell - 16 + (this.player << 5);
		},
		//判断走法是否有效
		isValidDst:function(dst){
			var board= this.board, cell = this.cell;
			return !this.isSide(board.boardMap[dst]) && 
				((this.isAwayHalf() && Math.abs(this.cell - dst)==1) || dst == this.forward());
		},
		genMoves:function(){
			var board = this.board, boardMap = board.boardMap, mvs=[],dst=null;
			dst = this.forward();
			if(board.inBoard(dst) && !this.isSide(boardMap[dst])){
				mvs.push(mv.gen(cell, dst));
			}
			if(this.isAwayHalf()){
				dst = cell - 1;
				if(board.inBoard(dst)&&!this.isSide(boardMap[dst])){
					mvs.push(mv.gen(cell, dst));
				}
				dst = cell + 1;
				if(board.inBoard(dst)&&!this.isSide(boardMap[dst])){
					mvs.push(mv.gen(cell, dst));
				}
			}
			return mvs.push(mv.gen(cell, dst));;
		},
		getValue:function(){
			return Pawn.valuePos[this.cell];
		}
	});
	
	Pawn.valuePos = [
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  9,  9,  9, 11, 13, 11,  9,  9,  9,  0,  0,  0,  0,
		0,  0,  0, 19, 24, 34, 42, 44, 42, 34, 24, 19,  0,  0,  0,  0,
		0,  0,  0, 19, 24, 32, 37, 37, 37, 32, 24, 19,  0,  0,  0,  0,
		0,  0,  0, 19, 23, 27, 29, 30, 29, 27, 23, 19,  0,  0,  0,  0,
		0,  0,  0, 14, 18, 20, 27, 29, 27, 20, 18, 14,  0,  0,  0,  0,
		0,  0,  0,  7,  0, 13,  0, 16,  0, 13,  0,  7,  0,  0,  0,  0,
		0,  0,  0,  7,  0,  7,  0, 15,  0,  7,  0,  7,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0
	];
	
	return Pawn;
});