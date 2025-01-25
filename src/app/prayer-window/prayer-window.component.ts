import { Component, OnInit } from '@angular/core';
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

  currentPage: Page | undefined;
  currentMystery: any | undefined;

  constructor( private prayerService: PrayersService){}

  ngOnInit(): void {
    this.currentPage = this.prayerService.getNextPage();
  }

  previous(ev: MouseEvent){
    let test = this.prayerService.getPrevPage();
    if (test) {
      this.currentPage = test;
    }
    this.currentMystery = this.prayerService.getCurrentMystery();
  }

  next(ev: MouseEvent){
    let test = this.prayerService.getNextPage();
    if (test) {
      this.currentPage = test;
    }
    this.currentMystery = this.prayerService.getCurrentMystery();
  }
}
