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

@Injectable({
  providedIn: 'root'
})
export class PrayersService {

  pages: Page[] =  [
    { instruction: "Holding the Crucifix", file: Beginning},
    { instruction: "Holding the Crucifix", file: ApostlesCreed},
    { instruction: "Hold first bead", file: OurFather},
    { instruction: "Hold second bead", file: HailMary},
    { instruction: "Hold third bead", file: HailMary},
    { instruction: "Hold fourth bead", file: HailMary},
    { instruction: "Say Glory Be", file: GloryBe},
    { instruction: "Announce the Mystery", decadeIndex: 0},
    { instruction: "Say Our Father", file: OurFather, decadeIndex: 0},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 0, mysteryIndex: 0},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 0, mysteryIndex: 1},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 0, mysteryIndex: 2},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 0, mysteryIndex: 3},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 0, mysteryIndex: 4},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 0, mysteryIndex: 5},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 0, mysteryIndex: 6},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 0, mysteryIndex: 7},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 0, mysteryIndex: 8},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 0, mysteryIndex: 9},
    { instruction: "Say Glory Be", file: GloryBe},
    { instruction: "Say Oh My Jesus", file: OhMyJesus},
    { instruction: "Announce the Mystery", decadeIndex: 1},
    { instruction: "Say Our Father", file: OurFather, decadeIndex: 1},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 1, mysteryIndex: 0},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 1, mysteryIndex: 1},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 1, mysteryIndex: 2},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 1, mysteryIndex: 3},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 1, mysteryIndex: 4},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 1, mysteryIndex: 5},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 1, mysteryIndex: 6},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 1, mysteryIndex: 7},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 1, mysteryIndex: 8},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 1, mysteryIndex: 9},
    { instruction: "Say Glory Be", file: GloryBe},
    { instruction: "Announce the Mystery", decadeIndex: 2},
    { instruction: "Say Our Father", file: OurFather, decadeIndex: 2},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 2, mysteryIndex: 0},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 2, mysteryIndex: 1},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 2, mysteryIndex: 2},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 2, mysteryIndex: 3},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 2, mysteryIndex: 4},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 2, mysteryIndex: 5},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 2, mysteryIndex: 6},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 2, mysteryIndex: 7},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 2, mysteryIndex: 8},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 2, mysteryIndex: 9},
    { instruction: "Say Glory Be", file: GloryBe},
    { instruction: "Say Oh My Jesus", file: OhMyJesus},
    { instruction: "Announce the Mystery", decadeIndex: 3},
    { instruction: "Say Our Father", file: OurFather, decadeIndex: 3},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 3, mysteryIndex: 0},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 3, mysteryIndex: 1},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 3, mysteryIndex: 2},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 3, mysteryIndex: 3},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 3, mysteryIndex: 4},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 3, mysteryIndex: 5},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 3, mysteryIndex: 6},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 3, mysteryIndex: 7},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 3, mysteryIndex: 8},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 3, mysteryIndex: 9},
    { instruction: "Say Glory Be", file: GloryBe},
    { instruction: "Announce the Mystery", decadeIndex: 4},
    { instruction: "Say Our Father", file: OurFather, decadeIndex: 4},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 4, mysteryIndex: 0},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 4, mysteryIndex: 1},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 4, mysteryIndex: 2},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 4, mysteryIndex: 3},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 4, mysteryIndex: 4},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 4, mysteryIndex: 5},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 4, mysteryIndex: 6},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 4, mysteryIndex: 7},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 4, mysteryIndex: 8},
    { instruction: "Meditate on mystery", file: HailMary, decadeIndex: 4, mysteryIndex: 9},
    { instruction: "Say Glory Be", file: GloryBe},
    { instruction: "Say Hail Holy Queen", file: HailHolyQueen},
    { instruction: "Say Final Prayer", file: FinalPrayer},
    { instruction: "Make the sign of the cross"}
  ]
  currentPrayerIndex = -1;

  constructor(private router: Router) { }

  getNextPage(){
    if (this.currentPrayerIndex >= this.pages.length){
      return undefined;
    }
    this.currentPrayerIndex++;
    return this.pages[this.currentPrayerIndex];
  }

  getPrevPage(){
    if (this.currentPrayerIndex <= 0){
      this.currentPrayerIndex = -1;
      this.router.navigate(['/']);
      return undefined;
    }
    this.currentPrayerIndex--;
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
        return { Title: mystery.Title,
                 SubTitle: mystery.SubTitle,
                 Meditation: mystery.Meditation[test.mysteryIndex]
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
