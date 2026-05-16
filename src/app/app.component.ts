import { applyChange, CounterState } from './utilities/page';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RosaryBgComponent } from "./rosary-bg/rosary-bg.component";
import { RosaryBgService } from './rosary-bg/rosary-bg.service';
import { PrayersService } from './services/prayers.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RosaryBgComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'rosary';
  colorIndex = 0;
  direction = true;
  firstColor = 0;
  scale = "1 1";

  constructor( private prayerSvc: PrayersService){}

  counterState: CounterState = {current: 0, low:0, high: 25, direction: true};

  ngOnInit(): void {
    }

  nav(event){
    switch (event){
      case 'next':
        this.prayerSvc.next();
        break;
      case 'prev':
        this.prayerSvc.prev();
        break;
    }
  }
}
