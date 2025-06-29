import { Component, Input, OnInit } from '@angular/core';
import { PrayersService } from '../services/prayers.service';
import { Page } from '../utilities/page';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prayer-window',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prayer-window.component.html',
  styleUrl: './prayer-window.component.css'
})
export class PrayerWindowComponent implements OnInit {

  get orientation() {
    return window.innerWidth > window.innerHeight ? 'horizontal' : 'vertical';
  }
  get currentPage(){
    let test = this.prayerService.currentPage();
    return this.prayerService.currentPage();
  }
  get currentMystery(){
    return this.prayerService.currentMystery();
  }

  constructor( private prayerService: PrayersService){}

  ngOnInit(): void {
    setTimeout(() => {this.prayerService.next()}, 10);
  }

  // previous(ev: MouseEvent){
  //   let test = this.prayerService.getPrevPage();
  //   if (test) {
  //     this.currentPage = test;
  //   }
  //   this.currentMystery = this.prayerService.getCurrentMystery();
  // }

  // next(ev: MouseEvent){
  //   let test = this.prayerService.getNextPage();
  //   if (test) {
  //     this.currentPage = test;
  //   }
  //   this.currentMystery = this.prayerService.getCurrentMystery();
  // }
}
