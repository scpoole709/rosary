import { Component, OnInit } from '@angular/core';
import { PrayersService } from '../services/prayers.service';
import { Page } from '../utilities/page';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-prayer-window',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './prayer-window.component.html',
  styleUrl: './prayer-window.component.css'
})
export class PrayerWindowComponent implements OnInit {

  currentPage: Page | undefined;
  currentMystery: any | undefined;

  get reset(){
    return this.prayerService.reset;
  }

  constructor( private prayerService: PrayersService){}

  ngOnInit(): void {
    this.currentPage = this.prayerService.getCurrentPage();
    this.currentMystery = this.prayerService.getCurrentMystery();
    this.updateState();
  }

  previous(ev: MouseEvent){
    this.updateState();
    let test = this.prayerService.getPrevPage();
    if (test) {
      this.currentPage = test;
    }
    this.currentMystery = this.prayerService.getCurrentMystery();
  }

  next(ev: MouseEvent){
    this.updateState();
    let test = this.prayerService.getNextPage();
    if (test) {
      this.currentPage = test;
    }
    this.currentMystery = this.prayerService.getCurrentMystery();
  }

  updateState(){
    const list = document.getElementsByClassName("slow-fade");
    Array.from(list).forEach( (e: HTMLElement) => {
      e.style.opacity = "1";
      e.classList.toggle('slow-fade');
    });
  }
}
