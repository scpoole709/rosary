import { Instructions } from './../utilities/instructions.interface';
import { Injectable } from '@angular/core';
import { Page } from '../utilities/page';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class PrayersService {

  get instructions(){
    return this.cfgSvc.instructions;
  };
  get pages(){
    return this.cfgSvc.instructions.pages;
  }
  get mysteries(){
    return this.cfgSvc.instructions.mysteries;
  }

  currentPrayerIndex = 0;
  reset = false;

  nav = new Subject<string>();

  next(){
    this.nav.next("next");
  }
  prev(){
    this.nav.next("prev");
  }

  constructor(private router: Router,
              private cfgSvc: ConfigurationService ) { }

  glossary(txt){
    const found = this.instructions.glossary.find( g => g.key === txt);
    return !!found ? found.translation : txt;
  }

  doReset(){
    this.router.navigate(['/']);
    this.currentPrayerIndex = 0;
    this.reset = false;
  }

  startFromBeginning(){
    this.currentPrayerIndex = 0;
    this.reset = false;
  }

  getPageByKey(key: string){

    const page = this.pages.find( p => p.key.indexOf(key) >= 0);
    this.currentPrayerIndex = this.pages.indexOf(page);
    return page;
  }

  getNextPage(){
    if (this.reset){
      this.doReset();
    }
    else {
      this.currentPrayerIndex++;
      if (this.currentPrayerIndex >= this.pages.length){
        this.currentPrayerIndex = this.pages.length -1;
        this.reset = true;
      }
    }
    return this.formatPage()
  }

  getPrevPage(){
     this.currentPrayerIndex--;
    if (this.currentPrayerIndex < 0){
      this.currentPrayerIndex = 0;
      this.router.navigate(['/']);
      return undefined;
    }
    return this.formatPage();
  }

  getCurrentPage(){
    if (this.currentPrayerIndex >= 0 && this.currentPrayerIndex < this.pages.length){
      return this.formatPage();
    }
    return undefined;
  }

  getCurrentMystery(){
    const test = this.pages[this.currentPrayerIndex];
    if (test && test.decadeIndex !== undefined) {
      const mystery = this.mysteries[test.decadeIndex];
      if (mystery.Meditation && test.mysteryIndex != undefined){
        return { Title: test.mysteryIndex >= 0 ? "" : mystery.Title,
                 SubTitle: mystery.SubTitle,
                 Meditation: mystery.Meditation[test.mysteryIndex].text
               };
      } else {
        return { Title: mystery.Title,
                 SubTitle: mystery.SubTitle,
                };
      }
    }
    return undefined;
  }

  formatPage(){
    return { page: this.pages[this.currentPrayerIndex], mystery: this.getCurrentMystery()}
  }
}
