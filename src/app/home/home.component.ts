import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PrayersService } from '../services/prayers.service';
import { CommonModule } from '@angular/common';
import { RosaryBgService } from '../rosary-bg/rosary-bg.service';
import { PopupTemplateComponent, TemplateOptions } from '../popup-template/popup-template.component';
import { ConfigurationService } from '../services/configuration.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PopupTemplateComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  @ViewChild("homeOptions") homeOptions;
  @ViewChild("menu") menu;

  textFontSize = "11px";

  get instructions(){
    return this.cfgSvc.instructions;
  }
  constructor( public router: Router,
               public prayerSvc: PrayersService,
               private rbgSvc: RosaryBgService,
               private cfgSvc: ConfigurationService){

    setTimeout( () => {
       this.rbgSvc.selectedTemplate = this.homeOptions;
    })

    this.rbgSvc.contentSpace.subscribe({
      next: (next: any) => {
        if (next.update === "resize"){
          this.textFontSize = this.cfgSvc.determineFontSize(next.contentInfo);
        }
        else if (next.update === "rebuild") {
        }
        else if (next.update === "redraw") {
        }
      }
    })

    //this.textFontSize = this.cfgSvc.determineFontSize(this.rbgSvc.getSpace());
    rbgSvc.unselectAll();
    rbgSvc.showButtons = false;
  }

  options = new TemplateOptions();
  showTemplate(event: MouseEvent, content)
  {
    this.options.templateViewChild = content;
    //this.adminAction = action;
    this.options.title = "Configuration";
    this.options.show("40%", "40%");
  }

  languageSelected(event){
    this.cfgSvc.languageCode = event.target.value;
    this.options.hide();
  }

  glossary(txt){
    const found = this.instructions.glossary.find( g => g.key === txt);
    return !!found ? found.translation : txt;
  }

  doReset(){
    this.prayerSvc.doReset();
  }
}
