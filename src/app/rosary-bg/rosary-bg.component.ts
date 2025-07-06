import { AfterViewInit } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RosaryBgService } from '../services/rosary-bg.service';
// import { mat4 } from 'gl-matrix';


@Component({
  selector: 'rosary-bg',
  standalone: true,
  imports: [],
  templateUrl: './rosary-bg.component.html',
  styleUrl: './rosary-bg.component.scss'
})
export class RosaryBgComponent implements OnInit, AfterViewInit {

  @ViewChild("slidercanvas") slidercanvas;

  constructor( private rbSvc: RosaryBgService){}

  get canvas(){
    return this.slidercanvas.nativeElement;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {

    this.rbSvc.drawOvalBeads(this.canvas);
  }

}
