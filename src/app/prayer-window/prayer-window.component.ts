import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PrayersService } from '../services/prayers.service';
import { Page } from '../utilities/page';
import { RosaryBgService } from '../rosary-bg/rosary-bg.service';

@Component({
  selector: 'app-prayer-window',
  standalone: true,
  imports: [],
  templateUrl: './prayer-window.component.html',
  styleUrl: './prayer-window.component.css'
})
export class PrayerWindowComponent implements OnInit, OnDestroy {

  @ViewChild('prayerContainer') container

  currentPage: Page | undefined;
  currentMystery: any | undefined;

  area = 0;
  _fontSize = "20px";
  get fontSize() {
    // this.area = window.innerHeight * window.innerWidth;

    if (!this.container)return "20px";
    let rect = this.container.nativeElement.getBoundingClientRect();
    this.area = Math.floor(rect.width * rect.height);
    let fontcount = 50;
    for ( let i = 1000000; i >= 0; i -= 50000) {
      if (this.area > i){
        return Math.round(fontcount) + "px";
      }
      fontcount -= 1.75;
    }
    return "11px";
  }

  get reset(){
    return this.prayerService.reset;
  }

  get height(){
    return window.outerHeight;
  }
  get width(){
    return window.outerWidth;
  }

  subscribers = [];
  constructor( private prayerService: PrayersService,
               private rgbService: RosaryBgService){
    this.subscribers.push(prayerService.nav.subscribe( txt => {
      switch(txt){
        case 'next':
          this.next();
          break;
        case 'prev':
          this.previous();
          break;
        default:
          this.currentPage = this.prayerService.getPageByKey(txt);
          this.currentMystery = this.prayerService.getCurrentMystery();
          break;
      }
    }));
  }

  ngOnInit(): void {
    this.prayerService.startFromBeginning();
    this.currentPage = this.prayerService.getCurrentPage();
    this.currentMystery = this.prayerService.getCurrentMystery();
    this.rgbService.showButtons = true;
    this.rgbService.selectItem("cross");
    this.updateState();
  }

  ngOnDestroy(){
    this.subscribers.forEach(each=> {
      each.unsubscribe();
    })
  }

  previous(){
    this.updateState();
    let test = this.prayerService.getPrevPage();
    if (test) {
      this.currentPage = test;
    }
    this.currentMystery = this.prayerService.getCurrentMystery();
    this.rgbService.selectItem(this.currentPage.key);
  }

  next(){
    this.updateState();
    let test = this.prayerService.getNextPage();
    if (test) {
      this.currentPage = test;
    }
    this.currentMystery = this.prayerService.getCurrentMystery();
    this.rgbService.selectItem(this.currentPage.key);
  }

  updateState(){
    const list = document.getElementsByClassName("slow-fade");
    Array.from(list).forEach( (e: HTMLElement) => {
      e.style.opacity = "1";
      e.classList.toggle('slow-fade');
    });
  }
}
