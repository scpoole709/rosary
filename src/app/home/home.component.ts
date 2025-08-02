import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  static timesVisited = 0;
  get showResume(){
    return HomeComponent.timesVisited > 1;
  }
  constructor( public router: Router){
    HomeComponent.timesVisited++;
  }
}
