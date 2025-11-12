import { PrayersService } from './../services/prayers.service';
import { Component, HostListener, OnInit, AfterViewInit, ViewChild, EventEmitter, Output, TemplateRef } from '@angular/core';
import { RosaryBgService } from './rosary-bg.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rosary-bg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rosary-bg.component.html',
  styleUrl: './rosary-bg.component.scss'
})
export class RosaryBgComponent implements OnInit, AfterViewInit {

  @ViewChild("fillcanvas") fillcanvas;
  @ViewChild("canvasDiv") canvasDiv;
  @ViewChild("contentDiv") contentDiv;
  @ViewChild("prevbtn") prevBtn;
  @ViewChild("nextbtn") nextBtn;
  @ViewChild("toolbar") toolbar;

  selectedTemplate;

  @Output() nav = new EventEmitter<string>();

  constructor( public rbSvc: RosaryBgService,
               public prayerService: PrayersService,
               public router: Router){}

  get canvas(){
    return this.fillcanvas.nativeElement;
  }
  get content(){
    return this.contentDiv.nativeElement;
  }

  ngOnInit(): void {
    this.rbSvc.contentSpace.subscribe({
      next: (next: any) => {
        if (next.update === "resize"){
          let space = next.contentInfo;
          let buttonRect = this.prevBtn.nativeElement.getBoundingClientRect();
          this.content.style.top = space.topY + "px";
          this.content.style.bottom = this.canvas.height - space.maxY + "px";
          this.content.style.left = space.minX + buttonRect.width + "px";
          this.content.style.right = this.canvas.width - space.maxX + buttonRect.width + "px";
          this.prevBtn.nativeElement.style.top = space.topY + "px";
          this.nextBtn.nativeElement.style.top = space.topY + "px";
          this.prevBtn.nativeElement.style.bottom = this.content.style.bottom;
          this.nextBtn.nativeElement.style.bottom = this.content.style.bottom;
          this.prevBtn.nativeElement.style.left = space.minX + "px";
          this.nextBtn.nativeElement.style.right = this.canvas.width - space.maxX + "px";

          const rect = this.toolbar.nativeElement.getBoundingClientRect();
          this.toolbar.nativeElement.style.top = space.topY / 2 + "px";
          this.toolbar.nativeElement.style.right = space.minX + "px";
        }
        else if (next.update === "rebuild") {
          //this.rbSvc.build(this.canvas);
          this.rbSvc.redraw(this.canvas, true);
        }
        else if (next.update === "redraw") {
          this.rbSvc.redraw(this.canvas);
        }
      }
    })
  }

  ngAfterViewInit(): void {
    this.rbSvc.build(this.canvas);
    this.rbSvc.redraw(this.canvas);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.rbSvc.build(this.canvas);
    this.rbSvc.redraw(this.canvas);
  }

  @HostListener('window:dblclick', ['$event'])
    onDblClick(event: Event): void {
  }
  saveEvent;
  lastType = "none";
  click(event: MouseEvent){

    this.saveEvent = event;
    const selected = this.rbSvc.getClicked(event);
    if (!!selected){
      this.prayerService.nav.next(selected.key);
      this.rbSvc.unselectAll();
      this.rbSvc.selectItem(selected.key);
    }
    else {
      // this.rbSvc.unselectAll();
      this.rbSvc.redraw(this.canvas);
    }
  }

  dblclick(event: MouseEvent){

    // const selected = this.rbSvc.getClicked(event);
    // if (!!selected){
    //   if (selected.gtype === "cross"){
    //     this.rbSvc.unselectAll();
    //     this.router.navigate(["/"]);
    //      this.rbSvc.redraw(this.canvas);
    //   }
    //   else {
    //     this.rbSvc.unselectAll();
    //     selected.selected = true;
    //     this.rbSvc.redraw(this.canvas);
    //     return;
    //   }
    // }
    // else {
    //   // this.rbSvc.unselectAll();
    //   this.rbSvc.redraw(this.canvas);
    // }
  }

  next(ev: MouseEvent){
    this.nav.next("next");
    //this.rbSvc.next(this.canvas);
  }

   prev(ev: MouseEvent){
    this.nav.next("prev");
    //this.rbSvc.prev(this.canvas);
  }
}
