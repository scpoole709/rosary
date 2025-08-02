import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrayersService } from '../services/prayers.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  static timesVisited = 0;
  get showResume(){
    return HomeComponent.timesVisited > 1;
  }
  constructor( public router: Router, public prayerService: PrayersService){
    HomeComponent.timesVisited++;
  }

  doReset(){
    this.prayerService.doReset();
    HomeComponent.timesVisited = 1;
  }
}
