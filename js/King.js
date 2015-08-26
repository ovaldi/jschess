define([
	"./Piece",
	"./mv"
],function(Piece, mv){
	"use strict";

	var legalSpanMap = [0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	  0, 0, 0, 0, 0, 0, 0];

	var codeMap = {
			0: 8,
			1: 16
		},
		//用于判断马走到当前位置，是否别马腿
		scholarDelta = [-17,15,-15,17],
		knightCheckDelta = [-33, -18], [-31, -14], [14, 31], [18, 33],
		//将的走法偏移量
		delta:[-1,1,-16,16];

	var King = Piece.extend({
		init:function(cfg){
			Piece.prototype.init.apply(this, arguments);
			this.code = codeMap[this.player];
		},
		isValidDst:function(dst){
			var board = this.board;
			return !this.isSide(board.boardMap[dst]) &&
				board.inFort(dst) &&
				//判断是否符合将的走法步长
				legalSpanMap[dst - this.cell + 256] == 1;
		},
		genMoves:function(){
			var cell = this.cell, board = this.board, mvs=[], dst;
			for(var i=0;i<4;i++){
				dst = cell + delta[i];
				if(board.inBoard(dst)&&!this.isSide(board.boardMap[dst])){
					mvs.push(mv.gen(cell, dst));
				}
			}
			return mvs;
		},
		//判断是否被将军
		isChecked:function(){
			var board = this.board, boardMap = board.boardMap, player = this.player,
				sideCode = this.sideCode(), oppSideCode = this.oppSideCode(),
				nDelta, pin, src, dst, code, i, j;

			for(src = 0; src < 256; src++){
				//1.找到"将/帅"的位置
				if(boardMap[src] != sideCode + piece.KING){
					continue;
				}
				//2.将的上面一格是否被对方“兵/卒"将军
				if(boardMap[src-16+(player<<5)] == oppSideCode + piece.PAWN){
					return true;
				}
				for(nDelta=-1; nDelta <= 1; nDelta+=2){
					if(boardMap[src + nDelta] == oppSideCode + piece.PAWN){
						return true;
					}
				}
				//3.判断是否被对方的马将军
				for(i = 0, j = scholarDelta.length; i < j; i++){
					if(boardMap[src+ scholarDelta[i]] == 0){
						for(j = 0; j < 2; j++){
							dst = src + knightCheckDelta[i][j];
							if(boardMap[dst] == oppSideCode+piece.KNIGHT){
								return true;
							}
						}
					}
				}
				//4.判断是否被对方的车或炮将军(包括将帅对脸)
				for(i = 0, j = delta.length; i < j; i++){
					nDelta = delta[i];
					dst = src + nDelta;
					while(board.inBoard(dst)){
						code = boardMap[dst];
						if(code != 0){
							if(code == oppSideCode + piece.ROOK || code == oppSideCode+piece.KING){
								return true;
							}
							break;
						}
						dst += nDelta;
					}
					dst += nDelta;
					while(board.inBoard(dst)){
						code = boardMap[dst];
						if(code != 0){
							if(code == oppSideCode + piece.CANNON){
								return true;
							}
							break;
						}
						dst += nDelta;
					}
				}
			}
			return false;
		},
		getValue:function(){
			return King.valuePos[this.cell];
		}
	});

	King.valuePos = [
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
		0,  0,  0,  0,  0,  0,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  2,  2,  2,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0, 11, 15, 11,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
		0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0
	];

	return King;
});