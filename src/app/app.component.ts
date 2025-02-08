import { applyChange, CounterState } from './utilities/page';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
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

 ngOnInit(): void {
  console.log("height: " + window.innerHeight + " width: " + window.innerWidth);

  setInterval( () => {
    const div = document.getElementById('radiant-div');
    if (!!div){
      let color = "#" + applyChange(this.counterState);

      div.style.backgroundImage = `radial-gradient(white ${this.counterState.current}%, yellow, green)`;
    }
  }, 100);
  }
}
