import { Component, OnDestroy, OnInit } from '@angular/core';
import { PrayersService } from '../services/prayers.service';
import { Page } from '../utilities/page';
import { RouterLink } from '@angular/router';
import { RosaryBgService } from '../rosary-bg/rosary-bg.service';


@Component({
  selector: 'app-prayer-window',
  standalone: true,
  imports: [],
  templateUrl: './prayer-window.component.html',
  styleUrl: './prayer-window.component.css'
})
export class PrayerWindowComponent implements OnInit, OnDestroy {

  currentPage: Page | undefined;
  currentMystery: any | undefined;

  area = 0;
  _fontSize = "20px";
 get fontSize() {
  this.area = window.innerHeight * window.innerWidth;
  if (this.area >  1500000){
    return "50px";
  }
  if (this.area > 600000){
    return "32px";
  }
  if (this.area >500000){
    return "30px";
  }
   if (this.area > 400000){
    return "26px";
  }
  if (this.area > 300000){
    return "24px";
  }
  if (this.area > 200000){
    return "18px";
  }
  if (this.area > 100000){
    return "11px";
  }
  return this._fontSize;
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
