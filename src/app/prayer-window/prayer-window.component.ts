import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PrayersService } from '../services/prayers.service';
import { Page } from '../utilities/page';
import { ContentUpdate, RosaryBgService } from '../rosary-bg/rosary-bg.service';

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

  fontSize = "11px";

  get reset(){
    return this.prayerSvc.reset;
  }

  get height(){
    return window.outerHeight;
  }
  get width(){
    return window.outerWidth;
  }

  determineFontSize(space: ContentUpdate){
    const area = Math.floor((space.contentInfo.maxX - space.contentInfo.minX) * (space.contentInfo.maxY - space.contentInfo.topY));
    let fontcount = 50;
    for ( let i = 1000000; i >= 0; i -= 50000) {
      if (area > i){
        return Math.round(fontcount) + "px";
      }
      fontcount -= 1.81;
    }
    return "11px";
  }

  subscribers = [];
  constructor( private prayerSvc: PrayersService,
               private rbgSvc: RosaryBgService){
    this.subscribers.push(prayerSvc.nav.subscribe( txt => {
      switch(txt){
        case 'next':
          this.next();
          break;
        case 'prev':
          this.previous();
          break;
        default:
          this.currentPage = this.prayerSvc.getPageByKey(txt);
          this.currentMystery = this.prayerSvc.getCurrentMystery();
          break;
      }
    }));

     this.rbgSvc.contentSpace.subscribe({
      next: (next: any) => {
        if (next.update === "resize"){
          this.fontSize = this.determineFontSize(next);
        }
        else if (next.update === "rebuild") {
        }
        else if (next.update === "redraw") {
        }
      }
    })
  }

  ngOnInit(): void {
    this.prayerSvc.startFromBeginning();
    this.currentPage = this.prayerSvc.getCurrentPage();
    this.currentMystery = this.prayerSvc.getCurrentMystery();
    this.rbgSvc.showButtons = true;
    this.rbgSvc.selectItem("cross");
    this.updateState();
  }

  ngOnDestroy(){
    this.subscribers.forEach(each=> {
      each.unsubscribe();
    })
  }

  previous(){
    this.updateState();
    let test = this.prayerSvc.getPrevPage();
    if (test) {
      this.currentPage = test;
    }
    this.currentMystery = this.prayerSvc.getCurrentMystery();
    this.rbgSvc.selectItem(this.currentPage.key);
  }

  next(){
    this.updateState();
    let test = this.prayerSvc.getNextPage();
    if (test) {
      this.currentPage = test;
    }
    this.currentMystery = this.prayerSvc.getCurrentMystery();
    this.rbgSvc.selectItem(this.currentPage.key);
  }

  updateState(){
    const list = document.getElementsByClassName("slow-fade");
    Array.from(list).forEach( (e: HTMLElement) => {
      e.style.opacity = "1";
      e.classList.toggle('slow-fade');
    });
  }
}
