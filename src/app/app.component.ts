import { CommonModule } from '@angular/common';
import { applyChange, CounterState } from './utilities/page';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrayersService } from './services/prayers.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'rosary';
  colorIndex = 0;
  direction = true;
  firstColor = 0;
  scale = "1 1";

  counterState: CounterState = {current: 0, low:0, high: 25, direction: true};

  orientation: "vertical" | "horizontal";
  constructor( protected prayerService: PrayersService){}

  ngOnInit(): void {
    this.setScale();
    window.onresize = () => {
      this.setScale();
    }

    setInterval( () => {
      const div = document.getElementById(this.orientation === 'horizontal' ? 'radiant-div-h' : 'radiant-div-v');
      if (!!div){
        let color = "#" + applyChange(this.counterState);

        div.style.backgroundImage = `radial-gradient(white ${this.counterState.current}%, yellow, green)`;
      }
    }, 100);
  }

  setScale(){
    this.orientation = (window.innerWidth > window.innerHeight) ? 'horizontal' : 'vertical';
    // this.scale = this.orientation === 'horizontal' ? (window.innerWidth / 758) + " " + (window.innerHeight / 501)
    //                                                : (window.innerWidth / 507) + " " + (window.innerHeight / 761);
  }
}
