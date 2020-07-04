import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChessComponent } from './chess/chess.component';
import { TictactoeComponent } from './tictactoe/tictactoe.component';

const routes: Routes = [
  {component: ChessComponent, path: 'chess'},
  {component: TictactoeComponent, path: 'ticTac'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
