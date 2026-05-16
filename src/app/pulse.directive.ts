import { Directive, ElementRef } from '@angular/core';
import { applyChange, CounterState } from './utilities/page';

@Directive({
  selector: '[pulse]'
})
export class PulseDirective {
  counterState: CounterState = {current: 0, low:0, high: 25, direction: true};

  constructor(private el: ElementRef) {
    setInterval( () => {
      let color = "#" + applyChange(this.counterState);
      el.nativeElement.style.backgroundImage = `radial-gradient(circle, white ${this.counterState.current}%, rgba(245, 250, 247, 1),rgba(230, 50, 170, 0.98))`
    }, 200);
  }
}
