import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css']
})
export class TictactoeComponent implements OnInit {

  turn = 0;
  score = {AI: 0, player:0}
  constructor() { }
  matrixArr =[0,1,2];
  square = [['-','-','-'],['-','-','-'],['-','-','-']]
  ngOnInit() {
  }

  resetSquare(){
    this.square = [['-','-','-'],['-','-','-'],['-','-','-']]
    this.turn=0
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
      if(this.turn ==0){
        this.markForTurn1(i,j)
      }else{
        this.markForAI(i,j)
      }
    }
  }

  markForTurn1(i,j){
    if(i==1 && j==1){
      this.square[0][0] = "O"
    }else{
      this.square[1][1] = "O"
    }
    this.turn++;
  }

  checkForWin(sym:any, arr){
    if(arr[1][1] === sym){
      // sym in middle path
      if((arr[0][0] == arr[2][2] && arr[2][2] == sym) || (arr[2][0] == arr[0][2] && arr[0][2] == sym)
        || (arr[0][1] == arr[2][1] && arr[0][1] == sym) || 
        (arr[1][0] == arr[1][2] && arr[1][0] == sym)){
        return true;
      } else if((arr[0][0] == arr[0][1] && arr[0][1] == arr[0][2] && arr[0][1] == sym) || 
      (arr[0][0] == arr[1][0] && arr[0][0] == arr[2][0] && arr[0][0]==sym) || 
      (arr[2][0] == arr[2][1] && arr[2][0] == arr[2][2] && arr[2][0]==sym) ||
      (arr[0][2] == arr[1][2] && arr[1][2]== arr[2][2] && arr[1][2] ==sym)){
        return true;
      }
      return false;
    }else if( (arr[0][0] == arr[0][1] && arr[0][1] == arr[0][2] && arr[0][1] == sym) || 
      (arr[0][0] == arr[1][0] && arr[0][0] == arr[2][0] && arr[0][0]==sym) || 
      (arr[2][0] == arr[2][1] && arr[2][0] == arr[2][2] && arr[2][0]==sym) ||
      (arr[0][2] == arr[1][2] && arr[1][2]== arr[2][2] && arr[1][2] ==sym)){
        return true;
    }
    return false;
  }

  markForAI(i,j){
    this.turn++;
    let arr= this.getAvailable()
    if(arr.length == 0){
      alert("It's a tie");
      this.resetSquare();
      return;
    }

    //Go for the win if available
    let winFlag = false,winIndex=0,loseFlag=false,loseIndex = 0;
    let dummyArr = JSON.parse(JSON.stringify(this.square))
    for(let x in arr){
      dummyArr [arr[x][0]]   [arr[x][1]] = "O"
      let flag = this.checkForWin('O',dummyArr)
      if(flag){
        winFlag=true;
        winIndex = parseInt(x);
       break; 
      }else{
        dummyArr = JSON.parse(JSON.stringify(this.square))
      }
    }

    dummyArr = JSON.parse(JSON.stringify(this.square))
    for(let x in arr){
      dummyArr[arr[x][0]][arr[x][1]] = "X"
      let flag = this.checkForWin('X',dummyArr)
      if(flag){
        loseFlag=true;
        loseIndex = parseInt(x);
       break; 
      }else{
        dummyArr = JSON.parse(JSON.stringify(this.square))
      }
    }

    
    if(winFlag){
      //Winning match found
      this.square[arr[winIndex][0]][arr[winIndex][1]] = "O"
    }else if(loseFlag){
      this.square[arr[loseIndex][0]][arr[loseIndex][1]] = "O"
    }else{
      //Random choice logic
      let random = Math.floor(Math.random()*arr.length)
      this.square[arr[random][0]][arr[random][1]] = "O"
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

  getAvailable(){
    let available = []
    for(let i in this.square){
      for(let j in this.square[i]){
        if(this.square[i][j] == '-'){
          available.push(i+""+j)
        }
      }
    }
    return available;
  }

}
