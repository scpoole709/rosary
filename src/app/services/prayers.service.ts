import { Injectable } from '@angular/core';
import { Page } from '../utilities/page';
import Beginning from '../../assets/Beginning.json';
import Mysteries from '../../assets/Mysteries.json';
import ApostlesCreed from '../../assets/ApostlesCreed.json';
import GloryBe from '../../assets/GloryBe.json';
import HailMary from '../../assets/HailMary.json';
import HailHolyQueen from '../../assets/HailHolyQueen.json';
import OurFather from '../../assets/OurFather.json';
import OhMyJesus from '../../assets/OhMyJesus.json';
import FinalPrayer from '../../assets/FinalPrayer.json';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrayersService {

  pages: Page[] =  [
    { instruction: "Holding the Crucifix", file: Beginning, key: "cross"},
    { file: ApostlesCreed, key: "cross"},
    { instruction: "Hold first bead and Say", file: OurFather, key: "oval-1"},
    { instruction: "Hold second bead and Say", file: HailMary, key: "bead-1"},
    { instruction: "Hold third bead", file: HailMary, key: "bead-2"},
    { instruction: "Hold fourth bead", file: HailMary, key: "bead-3"},
    { instruction: "Hold fifth bead", file: GloryBe, key: "oval-2"},
    { instruction: "Announce the Mystery", decadeIndex: 0, key: "mary"},
    { instruction: "", file: OurFather, key: "mary"},
    { file: HailMary, decadeIndex: 0, mysteryIndex: 0, key: "bead-1-0"},
    { file: HailMary, decadeIndex: 0, mysteryIndex: 1, key: "bead-1-1"},
    { file: HailMary, decadeIndex: 0, mysteryIndex: 2, key: "bead-1-2"},
    { file: HailMary, decadeIndex: 0, mysteryIndex: 3, key: "bead-1-3"},
    { file: HailMary, decadeIndex: 0, mysteryIndex: 4, key: "bead-1-4"},
    { file: HailMary, decadeIndex: 0, mysteryIndex: 5, key: "bead-1-5"},
    { file: HailMary, decadeIndex: 0, mysteryIndex: 6, key: "bead-1-6"},
    { file: HailMary, decadeIndex: 0, mysteryIndex: 7, key: "bead-1-7"},
    { file: HailMary, decadeIndex: 0, mysteryIndex: 8, key: "bead-1-8"},
    { file: HailMary, decadeIndex: 0, mysteryIndex: 9, key: "bead-1-9"},
    { instruction: "", file: GloryBe, key: "decade-1"},
    { instruction: "", file: OhMyJesus, key: "decade-1"},
    { instruction: "Announce the Mystery", decadeIndex: 1, key: "decade-1"},
    { instruction: "", file: OurFather, key: "decade-1"},
    { file: HailMary, decadeIndex: 1, mysteryIndex: 0, key: "bead-2-0"},
    { file: HailMary, decadeIndex: 1, mysteryIndex: 1, key: "bead-2-1"},
    { file: HailMary, decadeIndex: 1, mysteryIndex: 2, key: "bead-2-2"},
    { file: HailMary, decadeIndex: 1, mysteryIndex: 3, key: "bead-2-3"},
    { file: HailMary, decadeIndex: 1, mysteryIndex: 4, key: "bead-2-4"},
    { file: HailMary, decadeIndex: 1, mysteryIndex: 5, key: "bead-2-5"},
    { file: HailMary, decadeIndex: 1, mysteryIndex: 6, key: "bead-2-6"},
    { file: HailMary, decadeIndex: 1, mysteryIndex: 7, key: "bead-2-7"},
    { file: HailMary, decadeIndex: 1, mysteryIndex: 8, key: "bead-2-8"},
    { file: HailMary, decadeIndex: 1, mysteryIndex: 9, key: "bead-2-9"},
    { instruction: "", file: GloryBe, key: "decade-2"},
    { instruction: "Announce the Mystery", decadeIndex: 2, key: "decade-2"},
    { instruction: "", file: OurFather, key: "decade-2"},
    { file: HailMary, decadeIndex: 2, mysteryIndex: 0, key: "bead-3-0"},
    { file: HailMary, decadeIndex: 2, mysteryIndex: 1, key: "bead-3-1"},
    { file: HailMary, decadeIndex: 2, mysteryIndex: 2, key: "bead-3-2"},
    { file: HailMary, decadeIndex: 2, mysteryIndex: 3, key: "bead-3-3"},
    { file: HailMary, decadeIndex: 2, mysteryIndex: 4, key: "bead-3-4"},
    { file: HailMary, decadeIndex: 2, mysteryIndex: 5, key: "bead-3-5"},
    { file: HailMary, decadeIndex: 2, mysteryIndex: 6, key: "bead-3-6"},
    { file: HailMary, decadeIndex: 2, mysteryIndex: 7, key: "bead-3-7"},
    { file: HailMary, decadeIndex: 2, mysteryIndex: 8, key: "bead-3-8"},
    { file: HailMary, decadeIndex: 2, mysteryIndex: 9, key: "bead-3-9"},
    { instruction: "", file: GloryBe, key: "decade-3"},
    { instruction: "", file: OhMyJesus, key: "decade-3"},
    { instruction: "Announce the Mystery", decadeIndex: 3, key: "decade-3"},
    { instruction: "", file: OurFather, key: "decade-3"},
    { file: HailMary, decadeIndex: 3, mysteryIndex: 0, key: "bead-4-0"},
    { file: HailMary, decadeIndex: 3, mysteryIndex: 1, key: "bead-4-1"},
    { file: HailMary, decadeIndex: 3, mysteryIndex: 2, key: "bead-4-2"},
    { file: HailMary, decadeIndex: 3, mysteryIndex: 3, key: "bead-4-3"},
    { file: HailMary, decadeIndex: 3, mysteryIndex: 4, key: "bead-4-4"},
    { file: HailMary, decadeIndex: 3, mysteryIndex: 5, key: "bead-4-5"},
    { file: HailMary, decadeIndex: 3, mysteryIndex: 6, key: "bead-4-6"},
    { file: HailMary, decadeIndex: 3, mysteryIndex: 7, key: "bead-4-7"},
    { file: HailMary, decadeIndex: 3, mysteryIndex: 8, key: "bead-4-8"},
    { file: HailMary, decadeIndex: 3, mysteryIndex: 9, key: "bead-4-9"},
    { instruction: "", file: GloryBe, key: "decade-4"},
    { instruction: "Announce the Mystery", decadeIndex: 4, key: "decade-4"},
    { instruction: "", file: OurFather , key: "decade-4"},
    { file: HailMary, decadeIndex: 4, mysteryIndex: 0, key: "bead-5-0"},
    { file: HailMary, decadeIndex: 4, mysteryIndex: 1, key: "bead-5-1"},
    { file: HailMary, decadeIndex: 4, mysteryIndex: 2, key: "bead-5-2"},
    { file: HailMary, decadeIndex: 4, mysteryIndex: 3, key: "bead-5-3"},
    { file: HailMary, decadeIndex: 4, mysteryIndex: 4, key: "bead-5-4"},
    { file: HailMary, decadeIndex: 4, mysteryIndex: 5, key: "bead-5-5"},
    { file: HailMary, decadeIndex: 4, mysteryIndex: 6, key: "bead-5-6"},
    { file: HailMary, decadeIndex: 4, mysteryIndex: 7, key: "bead-5-7"},
    { file: HailMary, decadeIndex: 4, mysteryIndex: 8, key: "bead-5-8"},
    { file: HailMary, decadeIndex: 4, mysteryIndex: 9, key: "bead-5-9"},
    { instruction: "", file: GloryBe, key: "cross"},
    { instruction: "", file: HailHolyQueen, key: "mary"},
    { instruction: "", file: FinalPrayer, key: "cross"},
    { instruction: "Make the sign of the cross", key: "cross"}
  ]
  currentPrayerIndex = 0;
  reset = false;

  nav = new Subject<string>();

  next(){
    this.nav.next("next");
  }
  prev(){
    this.nav.next("prev");
  }

  constructor(private router: Router) { }

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
    const page = this.pages.find( p => p.key === key);
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
        HomeComponent.timesVisited = 0;
        this.reset = true;
      }
    }

    return this.pages[this.currentPrayerIndex];
  }

  getPrevPage(){
     this.currentPrayerIndex--;
    if (this.currentPrayerIndex < 0){
      this.currentPrayerIndex = 0;
      this.router.navigate(['/']);
      return undefined;
    }
    return this.pages[this.currentPrayerIndex];
  }

  getCurrentPage(){
    if (this.currentPrayerIndex >= 0 && this.currentPrayerIndex < this.pages.length){
      return this.pages[this.currentPrayerIndex];
    }
    return undefined;
  }

  getCurrentMystery(){
    const test = this.getCurrentPage();
    if (test && test.decadeIndex !== undefined) {
      const mystery = Mysteries.Mysteries[test.decadeIndex];
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
}
