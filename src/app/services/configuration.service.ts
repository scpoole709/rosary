import { Injectable } from '@angular/core';
import { ContentSpace, ContentUpdate } from '../rosary-bg/rosary-bg.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() { }

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
