import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  game = ""

  constructor(private router : Router){}
  selectGame(game){
    this.router.navigateByUrl(game)

  }
}
