import { Injectable } from '@angular/core';
import { ContentSpace, ContentUpdate } from '../rosary-bg/rosary-bg.service';
import { InstructionsEN } from '../language/EN/instructions';
import { InstructionsES } from '../language/ES/instructions';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() {
    this.code = localStorage.getItem("language");
    this.languageCode = this.code ? this.code : "EN";
  }

  code = "EN";
  instructions = new InstructionsEN();

  set languageCode(value: string){
    this.code = value;
    localStorage.setItem("language", this.code);
    switch(this.code){
      case "EN":
      default:
        this.instructions = new InstructionsEN();
        break;
      case "ES":
        this.instructions = new InstructionsES();
        break;
    }
  }
  get languageCode(){
    return this.code;
  }

  determineFontSize(space: ContentSpace){
    const area = Math.floor((space.maxX - space.minX) * (space.maxY - space.minY));
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
