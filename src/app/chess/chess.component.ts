import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.css']
})
export class ChessComponent implements OnInit {

  constructor() { }
  boardArr = []
  title = 'myChess';
  selected = {};
  possible = []

  ngOnInit(){
    this.fillBoard()
  }

  fillBoard(){
    let letters = ['a','b','c','d','e','f','g','h']
    let lcount = 0,ncount = 0,arr=[];
    for(let i =8 ;i > 0;i--){
      arr=[]
      for(let j=0;j<8;j++){
        arr.push({piece: i==7 || i ==2 ? 'Pawn' : this.getPiece(i,j),tag: letters[j]+i , side: this.getSide(i)})
      }
      this.boardArr.push(arr)
    }
  }

  getPiece(i,j){
    if(i!=8 && i!=1){
      return ''
    }else{
      switch(j){
        case 0: case 7: return 'Rook';
        case 1: case 6: return 'Knight';
        case 2: case 5: return 'Bishop';
        case 3: return 'Queen'
        case 4: return 'King'
      }
    }
  }

  getColor(i,j){
    if(i%2==0){
      if(j%2==0){
        return 'antiquewhite';
      }else{
        return '#779455'
      }
    }else{
      if(j%2==0){
        return '#779455'
      }else{
        return 'antiquewhite';
      }
    }
  }

  getSide(i){
    if(i==1 || i == 2){
      return 'White'
    }else {
      return 'Black'
    }
  }

  selectPiece(obj){
    this['getTilesFor'+obj.piece](obj);
    this.selected = obj;
  }

  getTilesForPawn(peice){
    let letters = ['a','b','c','d','e','f','g','h']
    if(peice.side == 'black'){
      this.boardArr[parseInt(peice.tag[1])][ letters.indexOf(peice.tag[0]) ]
    }
  }

}
