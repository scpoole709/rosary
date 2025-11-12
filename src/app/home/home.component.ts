import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PrayersService } from '../services/prayers.service';
import { CommonModule } from '@angular/common';
import { RosaryBgService } from '../rosary-bg/rosary-bg.service';
import { InstructionsEN } from '../language/EN/instructions';
import { PopupTemplateComponent, TemplateOptions } from '../popup-template/popup-template.component';
import { InstructionsES } from '../language/ES/instructions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PopupTemplateComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  @ViewChild("homeOptions") homeOptions;

  textFontSize = "11px";

  instructions: any;
  constructor( public router: Router,
               public prayerSvc: PrayersService,
               private rbgSvc: RosaryBgService){


    this.language();
    setTimeout( () => {
       this.rbgSvc.selectedTemplate = this.homeOptions;
    })

    this.rbgSvc.contentSpace.subscribe({
      next: (next: any) => {
        if (next.update === "resize"){
          this.textFontSize = this.determineFontSize(next.contentInfo);
        }
        else if (next.update === "rebuild") {
        }
        else if (next.update === "redraw") {
        }
      }
    })

    this.textFontSize = this.determineFontSize(this.rbgSvc.getSpace());
    rbgSvc.unselectAll();
    rbgSvc.showButtons = false;
  }


  options = new TemplateOptions();
  showTemplate(event: MouseEvent, content)
  {
    this.options.templateViewChild = content;
    //this.adminAction = action;
    this.options.show("100px", "40%");
  }

  languageSelected(event){
    this.language(event.target.value);
    localStorage.setItem("language", event.target.value);
    this.options.hide();
  }

  glossary(txt){
    const found = this.instructions.glossary.find( g => g.key === txt);
    return !!found ? found.translation : txt;
  }

   language(lang?: string){
    lang = lang || localStorage.getItem("language") || "ES";
    switch(lang){
      case 'ES':
        this.instructions = new InstructionsES();
        break;
      case 'EN':
        this.instructions = new InstructionsEN();
        break;
    }

    this.prayerSvc.pages = this.instructions.pages;
    this.prayerSvc.mysteries = this.instructions.mysteries;
    this.prayerSvc.instructions = this.instructions;
  }

  doReset(){
    this.prayerSvc.doReset();
  }

  determineFontSize(space){
    const area = Math.floor((space.maxX - space.minX) * (space.maxY - space.topY));
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
