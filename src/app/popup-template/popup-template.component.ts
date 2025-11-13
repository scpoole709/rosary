import { CommonModule } from '@angular/common';
import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'popup-template',
  templateUrl: './popup-template.component.html',
  styleUrls: ['./popup-template.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class PopupTemplateComponent implements OnInit {
  @ViewChild('popup', {static: true}) popup:ElementRef;

  @Output() exitAction = new EventEmitter();

  options:TemplateOptions = new TemplateOptions();

  @Input() set templateOptions(value) {

    this.options = value;
    if (value != null)
    {
      this.options.popup = this.popup;
      this.options.showTimer = this.showTimer;
      this.options.show = this.show;
      this.options.hide = this.hide;
    }
  }
  get templateOptions() {
    return this.options;
  }

  _top:string = "20%";
  @Input() set top(value)
  {
    this._top = value;
  }
  get top()
  {
    return this._top;
  }

  _left:string = "30%";
  @Input() set left(value)
  {
    this._left = value;
  }
  get left()
  {
    return this._left;
  }

  checkFocus(ev)
  {
    if (this.options.onFocus)
      this.options.onFocus(ev, this);
  }

  constructor() {}

  ngOnInit() {
   // this.hide();
  }

  reset() {
    this.top = "20%";
    this.left = "30%";

    var el = this.popup.nativeElement;
    el.style.top = this.top;
    el.style.left = this.left;
  }

  showTimer(top?:string, left?:string)
  {
    this.show(top, left);

    setTimeout(() => {
      var el = this.popup.nativeElement;
      el.style.opacity = "0.0";
      el.style.width = "0px";
      el.style.height = "0px";
    },1000);
  }

  show(top?:string, left?:string)
  {
    var el = this.popup.nativeElement;
    el.style.display = "block";

    setTimeout((el)=> {
      el.style.opacity = "1.0";
      if (top)
        el.style.top = top;
      if (left)
        el.style.left = left;
    }, 10, el);
  }

  hide()
  {
    var el = this.popup.nativeElement;
    el.style.opacity = "0.0";

    setTimeout((el)=> {
      el.style.display = "none";
      el.style.top = this.top;
      el.style.left = this.left;

      if (this instanceof TemplateOptions)
        this.title = undefined;
      else
        this.options.title = undefined;
    }, 10, el);

  }

  ngOnDestroy() {
  }
}

export class TemplateOptions
{
  popup:ElementRef;
  templateViewChild:any;
  title:string;

  showTimer;
  show;
  hide;
  onFocus(e,p) {};

  get isShowing()
  {
    return this.popup && this.popup.nativeElement.style.display != "none";
  }
}
