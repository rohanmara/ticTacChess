import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.css']
})
export class ChessComponent implements OnInit {

  constructor() { }
  boardArr = [[],[],[],[],[],[],[],[]]
  title = 'myChess';
  turn = 'white'
  selected;
  filled = false;
  possible = []

  ngOnInit(){
    this.fillBoard()
  }

  fillBoard(){

    let lcount = 0,ncount = 0,arr=new Array(8);
    for(let i =0 ;i <= 7;i++){
      for(let j = 0; j <= 7; j++){
        this.boardArr[i][j] = { piece: i==6 || i ==1 ? 'pawn' : this.getPiece(i,j),side: this.getSide(i)};
      }
    }
    this.filled = true;
    console.log(this.boardArr)
  }

  getPiece(i,j){
    if(i!=7 && i!=0){
      return ''
    }else{
      switch(j){
        case 0: case 7: return 'rook';
        case 1: case 6: return 'knight';
        case 2: case 5: return 'bishop';
        case 3: return 'queen'
        case 4: return 'king'
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
    if(i==0 || i == 1){
      return 'black'
    }else {
      return 'white'
    }
  }

  makeAMove(row, col){
    if(this.possible.some((indArr) => { return row === indArr[0] && col === indArr[1];})){
      this.boardArr[row][col] = {...JSON.parse(JSON.stringify(this.boardArr[this.selected[0]][this.selected[1]])), selected: false};
      this.boardArr[this.selected[0]][this.selected[1]] = {piece : '', side: ''};
      this.boardArr[this.selected[0]][this.selected[1]].selected = false;
      this.possible = [];
      this.selected = null;
      this.turn = this.turn === 'white' ? 'black' : 'white';
    }
  }

  selectPiece(row, col){
    let obj = this.boardArr[row][col]
    if(this.turn === obj.side){
      if(this.selected && this.selected.length) {
        this.boardArr[this.selected[0]][this.selected[1]].selected = false;
      }
      obj.selected = !obj.selected;
      this.selected = !obj.selected ? [] : [row, col];
      if(obj.selected){
        this['getTilesFor'+obj.piece](obj, row, col);
      }
    }
  }

  getTilesForpawn(peice, row, col){
    let letters = ['a','b','c','d','e','f','g','h']
    
    this.possible = [];
    console.log(peice, row, col);
    let oppSide = peice.side === 'white' ? 'black' : 'white';
    if(peice.side == 'white'){
      if(this.boardArr[row - 1][col].piece === '') this.possible.push([row - 1, col])
      if(row === 6 && this.boardArr[row - 2][col].piece === '') this.possible.push([row - 2, col])
      if(col < 7 && col > 0){
        if(this.boardArr[row - 1][col - 1].piece !== '' && this.boardArr[row - 1][col - 1].side === oppSide)  this.possible.push([row - 1, col - 1]);
        if(this.boardArr[row - 1][col + 1].piece !== '' && this.boardArr[row - 1][col + 1].side === oppSide)  this.possible.push([row - 1, col + 1]);
      }else if(col === 0){
        if(this.boardArr[row - 1][col + 1].piece !== '' && this.boardArr[row - 1][col + 1].side === oppSide)  this.possible.push([row - 1, col + 1]);
      }else{
        if(this.boardArr[row - 1][col - 1].piece !== '' && this.boardArr[row - 1][col - 1].side === oppSide)  this.possible.push([row - 1, col - 1]);
      }
    }else {
      if(this.boardArr[row + 1][col].piece === '') this.possible.push([row + 1, col])
      if(row === 1 && this.boardArr[row + 2][col].piece === '') this.possible.push([row + 2, col])
      if(col < 7 && col > 0){
        if(this.boardArr[row + 1][col + 1].piece !== '')  this.possible.push([row + 1, col + 1]);
        if(this.boardArr[row + 1][col - 1].piece !== '')  this.possible.push([row + 1, col - 1]);
      }else if(col === 0){
        if(this.boardArr[row + 1][col + 1].piece !== '')  this.possible.push([row + 1, col + 1]);
      }else{
        if(this.boardArr[row + 1][col - 1].piece !== '')  this.possible.push([row + 1, col - 1]);
      }
    }
    console.log(this.possible)
  }

  getTilesForrook(peice, row, col){
    this.possible = [];
    for(let pos = row + 1; pos <= 7; pos++){
      if(this.boardArr[pos][col].piece !== ''){
        if(this.boardArr[pos][col].side !== this.turn) this.possible.push([pos, col]);
        break;
      }else{
        this.possible.push([pos, col]);
      }
    }
    for(let pos = row - 1; pos >= 0; pos--){
      if(this.boardArr[pos][col].piece !== ''){
        if(this.boardArr[pos][col].side !== this.turn) this.possible.push([pos, col]);
        break;
      }else{
        this.possible.push([pos, col]);
      }
    }
    for(let pos = col + 1; pos <= 7; pos++){
      if(this.boardArr[row][pos].piece !== ''){
        if(this.boardArr[row][pos].side !== this.turn) this.possible.push([pos, col]);
        break;
      }else{
        this.possible.push([row, pos]);
      }
    }
    for(let pos = col - 1; pos >= 0; pos--){
      if(this.boardArr[row][pos].piece !== ''){
        if(this.boardArr[row][pos].side !== this.turn) this.possible.push([pos, col]);
        break;
      }else{
        this.possible.push([row, pos]);
      }
    }
    console.log(this.possible)
  }

  getTilesForknight(peice, row, col){

  }

  getTilesForbishop(peice, row, col){

  }

  getTilesForqueen(peice, row, col){

  }

  getTilesForking(peice, row, col){

  }

  isShowPossible(ind1,ind2){
    if(!this.possible.length) return false;
    if(this.possible.some((x) => {
      return ind1 === x[0] && ind2 === x[1];
    })){
      return true
    }
    return false;
  }

}
