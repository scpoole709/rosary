import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrayersService } from '../services/prayers.service';
import { CommonModule } from '@angular/common';
import { ContentUpdate, RosaryBgService } from '../rosary-bg/rosary-bg.service';

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

  textFontSize = "11px";
  constructor( public router: Router,
               public prayerService: PrayersService,
               private rbgSvc: RosaryBgService){

     this.rbgSvc.contentSpace.subscribe({
      next: (next: any) => {
        if (next.update === "resize"){
          this.textFontSize = this.determineFontSize(next.contentInfo);
        }
        else if (next.update === "rebuild") {
        }
        else if (next.update === "redraw") {
        }
      }
    })

    this.textFontSize = this.determineFontSize(this.rbgSvc.getSpace());
    HomeComponent.timesVisited++;
    rbgSvc.unselectAll();
    rbgSvc.showButtons = false;
  }

  doReset(){
    this.prayerService.doReset();
    HomeComponent.timesVisited = 1;
  }

  determineFontSize(space){
    const area = Math.floor((space.maxX - space.minX) * (space.maxY - space.topY));
    let fontcount = 50;
    for ( let i = 1000000; i >= 0; i -= 50000) {
      if (area > i){
        return Math.round(fontcount) + "px";
      }
      fontcount -= 1.81;
    }
    return "11px";
  }
}
