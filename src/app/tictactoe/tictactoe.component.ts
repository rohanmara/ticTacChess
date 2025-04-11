import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css']
})
export class TictactoeComponent implements OnInit {

  turn = 0;
  aiFirst = false;
  score = {AI: 0, player:0}
  constructor() { }
  matrixArr =[0,1,2];
  square = [['-','-','-'],['-','-','-'],['-','-','-']]
  ngOnInit() {
  }

  resetSquare(){
    this.square = [['-','-','-'],['-','-','-'],['-','-','-']]
    this.turn = 0;
    this.aiFirst = !this.aiFirst;
    if(this.aiFirst){
      this.markForAI()
    }
  }

  mark(i,j){
    if(this.square[i][j] === '-'){
      this.square[i][j] = "X";
      let flag = this.checkForWin('X',this.square)
      if(flag){
        let that=this;
        setTimeout(function(){
          alert("Player Wins")
          that.score.player++;
          that.resetSquare();
        }, 100)
        return;
      }
      this.markForAI();
    }
  }

  checkForWin(sym:any, arr){
    for(let i = 0; i < 3; i++){
      if(arr[i][0] == sym && arr[i][1] == sym && arr[i][2] == sym){
        return true;
      }
      if(arr[0][i] == sym && arr[1][i] == sym && arr[2][i] == sym){
        return true;
      }
    }
    if(arr[0][0] == sym && arr[1][1] == sym && arr[2][2] == sym){
      return true;
    }
    if(arr[0][2] == sym && arr[1][1] == sym && arr[2][0] == sym){
      return true;
    }
    return false;
  }

  markForAI(){
    this.turn++;
    let arr= this.getAvailable()
    if(arr.length == 0){
      alert("It's a tie");
      this.resetSquare();
      return;
    }

    let [row, col] = this.minimax(JSON.parse(JSON.stringify(this.square)), arr, 'O');
    this.square[row][col] = 'O';
    arr= this.getAvailable()
    if(arr.length == 0){
      alert("It's a tie");
      this.resetSquare();
      return;
    }
    let flag = this.checkForWin('O',this.square)
    if(flag){
      let that =this;
      setTimeout(function(){
        alert("AI Wins")
        that.score.AI++;
        that.resetSquare();
      }, 100)
    }
  }

  minimax(board: string[][], available: [number, number][], turn: string): [number, number] {
    const isMaximizing = turn === 'O';
  
    let bestScore = isMaximizing ? -Infinity : Infinity;
    let bestMove: [number, number] = [-1, -1];
  
    for (let k = 0; k < available.length; k++) {
      const [i, j] = available[k];
      // Clone board and available
      const newBoard = board.map(row => [...row]);
      const newAvailable = available.slice(0, k).concat(available.slice(k + 1));
      newBoard[i][j] = turn;
  
      // Check for win
      if (this.checkForWin(turn, newBoard)) {
        return [i, j]; // immediate win, take it
      }
      const score = this.evaluate(newBoard, newAvailable, turn === 'X' ? 'O' : 'X');
      if (isMaximizing ? score > bestScore : score < bestScore) {
        bestScore = score;
        bestMove = [i, j];
      }
    }
  
    return bestMove;
  }

  evaluate(board: string[][], available: [number, number][], turn: string): number {
    if (this.checkForWin('O', board)) return 1;
    if (this.checkForWin('X', board)) return -1;
    if (available.length === 0) return 0;
  
    const isMaximizing = turn === 'O';
    let bestScore = isMaximizing ? -Infinity : Infinity;
  
    for (let k = 0; k < available.length; k++) {
      const [i, j] = available[k];
  
      const newBoard = board.map(row => [...row]);
      const newAvailable = available.slice(0, k).concat(available.slice(k + 1));
  
      newBoard[i][j] = turn;
  
      const score = this.evaluate(newBoard, newAvailable, turn === 'X' ? 'O' : 'X');
  
      bestScore = isMaximizing
        ? Math.max(bestScore, score)
        : Math.min(bestScore, score);
    }
  
    return bestScore;
  }

  getAvailable(){
    let available = []
    for(let i in this.square){
      for(let j in this.square[i]){
        if(this.square[i][j] == '-'){
          available.push([+i, +j]);
        }
      }
    }
    return available;
  }

}
