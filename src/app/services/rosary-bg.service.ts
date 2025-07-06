import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RosaryBgService {

  constructor() { }

  drawBeads(canvas: HTMLCanvasElement){
    let dc = canvas.getBoundingClientRect();

    canvas.width = dc.width;
    canvas.height = dc.height;
    const ctx = canvas.getContext("2d");

    const numBeads = 59;
    const indent = 30;
    const boxWidth = dc.width - 2 * indent;
    const boxHeight = dc.height - 2 * indent;

    const circum = (2 * boxWidth) + (2 * boxHeight);
    const space = Math.floor(circum / (numBeads + 1));

    const radius = space / 3;

    let x = indent;
    let y = indent;

    let test = indent + boxWidth;
    while (x <= test){
      this.drawShinyBall(ctx, x, y, radius);
      x += space;
    }
    if (x > test) {
      x -= space;
    }
    y += space;

    test = indent + boxHeight;
    while (y <= test){
      this.drawShinyBall(ctx, x, y, radius);
      y += space;
    }
    if (y >= test) {
      y -= space;
    }
    x -= space;

    test = indent;
    while (x >= test){
      this.drawShinyBall(ctx, x, y, radius);
      x -= space;
    }
    if (x <= test) {
      x += space;
    }
    y -= space;

    test = indent;
    while (y > test){
      this.drawShinyBall(ctx, x, y, radius);
      y -= space;
    }
  }

  count = 1;
  drawShinyBall(ctx, centerX: number, centerY: number, radius: number){

    // Create a radial gradient for shading
    const gradient = ctx.createRadialGradient(
      centerX, centerY, radius * 0.1, // Inner circle (highlight)
      centerX, centerY, radius // Outer circle (sphere edge)
    );
    gradient.addColorStop(0, 'white'); // Start with white for highlight
    gradient.addColorStop(1, 'blue'); // Transition to sphere color

    // Draw the sphere with the radial gradient
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.closePath();

    ctx.fillText("" + this.count++, centerX + radius * 1.5, centerY);
  }

  makeParm(x, y, rx, ry, tilt){
    return {
      centerX: x,
      centerY: y,
      radiusX: rx,
      radiusY: ry,
      tilt: tilt
    }
  }


  drawOvalBeads(canvas: HTMLCanvasElement){
    let dc = canvas.getBoundingClientRect();

    canvas.width = dc.width;
    canvas.height = dc.height;
    const ctx = canvas.getContext("2d");

    const numBeads = 59;
    const indent = 30;
    const boxWidth = dc.width - 2 * indent;
    const boxHeight = dc.height - 2 * indent;

    const circum = (2 * boxWidth) + (2 * boxHeight);
    const space = Math.floor(circum / (numBeads + 1));

    const radiusW = space / 3;
    const radiusH = space / 3;

    const offsetSize = 10;
    const parmList = [];

    let x = indent;
    let y = indent;


    ctx.beginPath();
    ctx.moveTo(indent, 2);
    ctx.lineTo(dc.width - 2 * indent, 2);
    //ctx.fill();
    ctx.moveTo(0, boxHeight + indent);
    ctx.lineTo(dc.width , boxHeight + indent);
    ctx.stroke();
    ctx.closePath();


    
    let test = indent + boxWidth;
    let tilt = .25;
    let offsetX = offsetSize;
    let offsetY = offsetSize;
    while (x <= test){
      if (x + space > test) {
        tilt = -.25;
        offsetX = -offsetSize;
        offsetY = offsetSize;
      }
      parmList.push(this.makeParm( x + offsetX, y + offsetY, radiusW, radiusH, tilt));
      tilt = .5;
      offsetX = 0;
      offsetY = 0;
      x += space;
    }
    if (x > test) {
      x -= space;
    }
    y += space;

    test = indent + boxHeight + 6;
    tilt = 1;
    offsetX = 0;
    offsetY = 0;
    while (y <= test){
      if (y + space > test) {
        tilt = .25;
        offsetX = -offsetSize;
        offsetY = -offsetSize;
      }
      parmList.push(this.makeParm( x + offsetX, y + offsetY, radiusW, radiusH, tilt));
      tilt = 1;
      offsetX = 0;
      offsetY = 0;
      y += space;
    }
    if (y >= test) {
      y -= space;
    }
    x -= space;

    test = indent;
    tilt = 1.5;
    offsetX = 0;
    offsetY = 0;
    while (x >= test){
      if (x - space < test) {
        tilt = -.25;
        offsetX = offsetSize;
        offsetY = -offsetSize;
      }
      parmList.push(this.makeParm( x + offsetX, y + offsetY, radiusW, radiusH, tilt));
      x -= space;
    }
    if (x <= test) {
      x += space;
    }
    y -= space;

    test = indent;
    tilt = 2.0;
    while (y > test){
      parmList.push(this.makeParm(x, y, radiusW, radiusH, tilt));
      y -= space;
    }

    ctx.lineWidth = 10;
    ctx.strokeStyle = "orange"
    parmList.forEach( (each, index) => {
      if (index == 0) {
        ctx.beginPath();
        ctx.moveTo(each.centerX, each.centerY);
      }
      else {
        ctx.fillStyle = "#000000";
        ctx.lineTo(each.centerX, each.centerY);
        if (parmList.length == index + 1) {
          ctx.lineTo(parmList[0].centerX, parmList[0].centerY);
        }
      }
    })
    ctx.stroke();
    ctx.closePath();

    parmList.forEach( each => {
      this.drawShinyEllipse(ctx, each.centerX, each.centerY, each.radiusX, each.radiusY, each.tilt);
    })
  }

  drawShinyEllipse(ctx, centerX: number, centerY: number, radiusX: number, radiusY, tilt){

    // Create a radial gradient for shading
    const gradient = ctx.createRadialGradient(
      centerX, centerY, radiusX * 0.1, // Inner circle (highlight)
      centerX, centerY, radiusX // Outer circle (sphere edge)
    );
    gradient.addColorStop(0, 'white'); // Start with white for highlight
    gradient.addColorStop(1, 'blue'); // Transition to sphere color

    // Draw the sphere with the radial gradient
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radiusX, radiusY, tilt * Math.PI, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.closePath();

    ctx.fillText("" + this.count++, centerX + radiusX * 1.5, centerY);
  }
}



interface Parms {
  centerX: number;
  centerY: number;
  radiusX: number;
  radiusY: number;
  tilt: number;
}


