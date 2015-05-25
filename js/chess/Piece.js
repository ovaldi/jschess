define([
	"jquery",
	"../utils/declare",
	"../utils/EventManager"
],function ($, declare, EventMgr) {
	"use strict";
	
	//棋子基类
	var Piece = declare(null, {
		init:function(cfg){
			//棋子名称
			this.text = cfg.text;
			//所在格子：0～255
			this.cell = cfg.cell;
			//0：红方，1：黑方
			this.player = cfg.player;
			//所在棋盘
			this.board = cfg.board;
			//8~14依次表示红方的帅、仕、相、马、车、炮和兵；
			//16~22依次表示黑方的将、士、象、马、车、炮和卒；
			//(code&8)!=0 表示红方棋子，(code&16)!=0 表示黑方棋子。
			this.code = 0;
			this.render();
		},
		
		isValidDst:function(dst){
			return false;
		},
		generateMoves:function(){
			return [];
		},
		getValue:function(){
			return 0;
		},


		//当前棋子是否与目标位置处在同一行
		isSameRow: function(dst){
			return this.board.isSameRow(this.cell, dst);
		},
		//当前棋子是否与目标位置处在同一列
		isSameCol: function(dst){
			return this.board.isSameCol(this.cell, dst);
		},
		//当前棋子是否未过河
		isHomeHalf : function(){
			return this.board.isHomeHalf(this.cell);
		},
		//当前棋子是否已过河
		isAwayHalf : function(){
			return this.board.isAwayHalf(this.cell);
		},
		sideCode : function(){
			return 8 + (this.player<<3);
		},
		oppSideCode : function(){
			return 16-(this.player<<3);
		},
		//判断是否己方棋子
		isSide : function(code){
			return code && code & (8 + (this.player<<3));
		},
		//渲染棋子
		render : function(){
			var self=this;
			
			this.listener.fire("render");
			
			//TODO：绘制棋子
			
			self.listener.fire("rendered");
		},
		select : function(){
			this.listener.fire("select");
			//TODO：选中逻辑
			this.listener.fire("selected");
		},
		//移动棋子到目标位置
		moveTo : function(dst){
			this.cell = dst;
		},
		//销毁棋子
		destroy : function(){
			
			delete this.board;
		}
	});	
	
	
	Piece.KING = 0;
	Piece.SCHOLAR = 1;
	Piece.ELEPHANT = 2;
	Piece.KNIGHT = 3;
	Piece.ROOK = 4;
	Piece.CANNON = 5;
	Piece.PAWN = 6;

	return Piece;
});