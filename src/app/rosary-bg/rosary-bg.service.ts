import { Injectable } from '@angular/core';
// import { all, create } from 'mathjs'
import { Subject } from 'rxjs';
// const math = create(all)

@Injectable({
  providedIn: 'root'
})
export class RosaryBgService {

  contentSpace = new Subject<ContentUpdate>();

  _showButtons = false;
  set showButtons(value: boolean){
    this._showButtons = value;
    if (value){
      setTimeout( () => {
        this.contentSpace.next({update: "rebuild"});
      });
    }
  }
  get showButtons(){
    return this._showButtons;
  }

  crucifix;
  mary;

  constructor() {
    this.crucifix = new Image();
    this.crucifix.onload = (e) => {
      this.contentSpace.next({update: "redraw"});
    }
    this.crucifix.src = "../../assets/Crucifix.png";

    this.mary = new Image();
    this.mary.onload = (e) => {
      this.contentSpace.next({update: "redraw"});
    }
    this.mary.src = "./../../assets/MotherMary.png";
  }

  drawEvents(canvas: HTMLCanvasElement, locations){
    this.count = 0;
    this.drawLine( canvas, locations);
    this.drawBeadsFromList( canvas, locations);
    locations.forEach(each => {
      if (each.gtype === "cross"){
        this.drawCrucifix(canvas, each);
      }
      else if (each.gtype === "mary"){
        this.drawMary(canvas, each);
      }
      else if (each.gtype === "chain-only"){
        this.drawChainEnd(canvas, each);
      }
    });
  }

  selectItem(txt: string){
    this.unselectAll();
    const item = this.eventArray.find( e => e.key === txt);
    item.selected = true;
    this.contentSpace.next({update: "redraw"});
  }

  clear(canvas: HTMLCanvasElement){
    let dc = canvas.parentElement.getBoundingClientRect();
    canvas.width = dc.width;
    canvas.height = dc.height;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,dc.width, dc.height);
  }

  build(canvas){
    this.clear(canvas);
    this.drawStart(canvas);
    this.drawBeads(canvas, 10);
    for (let se of this.eventArray){
      if (se.gtype === "mary"){
        this.saveCoordinatesAuto(se.x, se.y, "chain-only", 10, 10, "mary");
      }
    }
    let space = this.getSpace();
    this.contentSpace.next({ update: "resize", contentInfo: space});
  }

  redraw(canvas, resize?){
    if (resize){
      let space = this.getSpace();
      this.contentSpace.next({ update: "resize", contentInfo: space});
    }
    this.clear(canvas);
    this.drawEvents(canvas, this.eventArray);
  }


  count = 1;
  drawShinyBall(ctx, centerX: number, centerY: number, radiusX: number, radiusY, selected?: boolean){

    // Create a radial gradient for shading
    const gradient = ctx.createRadialGradient(
      centerX, centerY, radiusX * 0.1, // Inner circle (highlight)
      centerX, centerY, radiusX // Outer circle (sphere edge)
    );
    gradient.addColorStop(0,selected ? 'yellow' : 'white'); // Start with white for highlight
    gradient.addColorStop(1, 'blue'); // Transition to sphere color

    // Draw the sphere with the radial gradient
    ctx.beginPath();
    ctx.arc(centerX, centerY, radiusX, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.closePath();

    ctx.fillText("" + this.count++, centerX + radiusX * 1.5, centerY);
  }

  drawChainLink(ctx, x, y, width, height, rotation) {
    // Use `ctx.save()` to isolate transformations for each link
    ctx.save();
    ctx.translate(x, y); // Move to the link's center
    ctx.rotate(rotation); // Rotate the link

    // Draw a rounded rectangle (representing a chain link)
    ctx.beginPath();
    const radius = height / 4; // Adjust for roundness
    ctx.moveTo(-width / 2 + radius, -height / 2);
    ctx.lineTo(width / 2 - radius, -height / 2);
    ctx.arcTo(width / 2, -height / 2, width / 2, -height / 2 + radius, radius);
    ctx.lineTo(width / 2, height / 2 - radius);
    ctx.arcTo(width / 2, height / 2, width / 2 - radius, height / 2, radius);
    ctx.lineTo(-width / 2 + radius, height / 2);
    ctx.arcTo(-width / 2, height / 2, -width / 2, height / 2 - radius, radius);
    ctx.lineTo(-width / 2, -height / 2 + radius);
    ctx.arcTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2, radius);
    ctx.closePath();
    ctx.stroke();

    // Restore the canvas state
    ctx.restore();
  }

  degToRad(degrees) {
      return (degrees * Math.PI) / 180;
  }

  rotateSlope(ctx, dx, dy) {
    // console.log(Math.atan2(dy, dx) * 180 / Math.PI);

    const angleInDegrees = Math.atan2(dy, dx) * 180 / Math.PI;

    // Calculate the end point of the second line
    const angleInRadians = this.degToRad(-angleInDegrees);
    ctx.rotate(-angleInRadians);
    return angleInRadians;
  }

  drawCrucifix(canvas: HTMLCanvasElement, loc: ObjEvent){
    const ctx = canvas.getContext('2d');

    ctx.save();
    let {x, y, w, h } = loc;

    if (loc.selected){
      ctx.beginPath();
      let offset = 10;
      ctx.ellipse(x, y + h / 2,  w / 1.6, h / 1.6, 0, 0, 2 * Math.PI);
      ctx.fillStyle = "lightblue";
      ctx.fill();
      ctx.closePath();
    }
    ctx.restore();
    ctx.drawImage(this.crucifix, x - w / 2, y, w, h);
  }

  drawChainEnd(canvas: HTMLCanvasElement, loc: ObjEvent){
    const ctx = canvas.getContext('2d');

    ctx.save();
    let {x, y, w, h } = loc;

    if (loc.selected){
      ctx.beginPath();
      let offset = 10;
      ctx.ellipse(x, y + h / 2,  w / 1.6, h / 1.6, 0, 0, 2 * Math.PI);
      ctx.fillStyle = "lightblue";
      ctx.fill();
      ctx.closePath();
    }
    ctx.restore();
  }

  drawMary(canvas: HTMLCanvasElement, loc: ObjEvent){

    const ctx = canvas.getContext('2d');

    ctx.save();

    let {x, y, w, h } = loc;

    if (loc.selected){
      ctx.beginPath();
      ctx.ellipse(x, y + h / 2,  w / 1.9, h / 1.9, 0, 0, 2 * Math.PI);
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.closePath();
    }

    ctx.beginPath();
    ctx.ellipse(x, y + h / 2, .75 * w / 1.9, h / 1.9, 0, 0, 2 * Math.PI);
    ctx.fillStyle = "pink";
    ctx.fill();
    ctx.closePath();

    ctx.restore();

    ctx.drawImage(this.mary, x - w / 2, y, w, h);
  }

  drawFrame(canvas: HTMLCanvasElement, w: number, h: number){
    // this.drawLineToCorners(canvas, w, h);
    let centerX = w / 2.
    let centerY = h / 2;
    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.translate(400, 100);

    ctx.beginPath();

    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, w, h);

    let offset = 10;
    ctx.ellipse(centerX, centerY,  20, 20, 0, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.stroke();

    ctx.closePath();

    let radius = Math.sqrt((centerX * centerX) + (centerY * centerY));

    let quad = [{x: w, y: 0}, {x: w, y: h}, {x: 0, y: h}, {x: 0, y: 0}];

    for (let i = 0; i < quad.length; i++) {
      let ang1 = Math.atan((quad[i].y - centerY) / (quad[i].x - centerX)) * 180 / Math.PI;
      let ang2 = Math.asin((quad[i].y - centerY) / radius);

      // console.log("angles1: " + ang1);
      //// console.log("angles2: " + ang2);
    }

    const numberOfLines = 54; // Example: 8 lines
    for (let i = 0; i < numberOfLines; i++) {
        const angle = (i / numberOfLines) * (2 * Math.PI); // Calculate angle in radians
        let rad = (w / 2) / Math.cos(angle);
        let endX = centerX + radius * Math.cos(angle);
        let endY = centerY + radius * Math.sin(angle);

        // console.log("ANGLE: " + angle);

        let pt = this.getConfinedPt(centerX, centerY, Math.round(endX), Math.round(endY), w, h);

        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY); // Start at the circle's center
        ctx.lineTo(pt.x, pt.y);     // Draw to the calculated endpoint on the circumference
        ctx.stroke();

        // ctx.strokeStyle = "red";
        // ctx.lineWidth = 5;

        // ctx.beginPath();
        // ctx.moveTo(centerX, centerY); // Start at the circle's center
        // ctx.lineTo(pt.x, pt.y);     // Draw to the calculated endpoint on the circumference
        // ctx.stroke();
    }

    ctx.restore();
  }

  getConfinedPt(x, y, endX, endY, w, h) {
    // return {x: endX,  y: endY}
    if (y == endY) return {x: (endX > 0 ? w : 0), y: endY};
    if (x == endX) return {x: endX, y: (endY > 0 ? h : 0)};

    let pa;

    switch (this.getQuad(endX, endY, x, y)){
      case 1:
        pa = [this.getInfiniteLineIntersection(x, y, endX, endY, 0, 0, 0, h),
              this.getInfiniteLineIntersection(x, y, endX, endY, 0, 0, w, 0)];
        break;
      case 2:
        pa = [this.getInfiniteLineIntersection(x, y, endX, endY, w, 0, w, h),
              this.getInfiniteLineIntersection(x, y, endX, endY, 0, 0, w, 0)];
        break;
      case 3:
        pa = [this.getInfiniteLineIntersection(x, y, endX, endY, 0, 0, 0, h),
              this.getInfiniteLineIntersection(x, y, endX, endY, 0, h, w, h)];
        break;
      case 4:
        pa = [this.getInfiniteLineIntersection(x, y, endX, endY, 0, h, w, h),
              this.getInfiniteLineIntersection(x, y, endX, endY, w, 0, w, h)];
        break;
    }

    let ret =  this.withinRange(h, w, pa);
    return ret;
  }

  withinRange(h, w, pa:any[]){
    for (let p of pa){
      if ((p.x <= w && p.x >= 0)
        &&(p.y <= h && p.y >= 0)){
        return p;
      }
    }
    return pa[1];
  }

  getQuad(x, y, cx, cy){
    if (x <= cx){
      if (y <= cy)
        return 1;
      else return 3;
    }
    else {
      if ( y <= cy)
        return 2;
      else return 4;
    }
  }

  getInfiniteLineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {

  // Check if none of the lines are of length 0
	if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
		return false
	}

	const denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

  // Lines are parallel
	if (denominator === 0) {
		return false
	}

	let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
	let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

  // is the intersection along the segments
	if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
		//return false
	}

  // Return a object with the x and y coordinates of the intersection
	let x = x1 + ua * (x2 - x1)
	let y = y1 + ua * (y2 - y1)

	return {x, y}
}

  drawLine( canvas: HTMLCanvasElement, locations) {
    const ctx = canvas.getContext('2d');

    ctx.save();

    ctx.lineWidth = 2;
    ctx.strokeStyle = "gold"
    let count = -1;
    let start = null;

    locations.forEach( ( each, index) => {

      //if (!each.shiftKey){
        if (start == null || each.gtype === 'start' || each.shiftKey){
          start = each;
        }
        else {
          count++;

          ctx.save();

          const ballRadius = 0;

          // Define the properties of the angle
          const startX = 0; // X-coordinate of the angle's vertex
          const startY = 0; // Y-coordinate of the angle's vertex

          let dx = each.x - start.x;
          let dy = each.y - start.y;

          ctx.translate(start.x, start.y);
          this.rotateSlope(ctx, dx, dy);

          const lineLength = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) - ballRadius;

          let pX = 0;
          let i = 0;
          const linkWidth = 8;
          const linkHeight = 8 / 2;

          while (pX <= lineLength) {
            pX = startX + i * (linkWidth * 0.7);
            //pY += yChange;
            const rotation = i % 2 === 0 ? 0 : Math.PI / 4; // Alternate rotation
            this.drawChainLink(ctx, pX, 0, linkWidth, linkHeight, rotation);
            i++;
          }
          start = each;

          ctx.restore();
        }
      //}
    });
    ctx.restore();
  }

  getSpace(){
    let minX = 1000;
    let minY = 1000;
    let maxX = 0;
    let maxY = 0;
    this.eventArray.forEach( each => {
      minX = Math.min(minX, each.x + each.w);
      minY = Math.min(minY, each.y + each.h);
      maxX = Math.max(maxX, each.x - each.w);
      maxY = Math.max(maxY, each.y - each.h);
    });
    let cross =  this.eventArray.find(e => e.gtype === 'cross');
    let mary = this.eventArray.find(e => e.gtype === 'mary');
    let topY = Math.max(cross.y + cross.h, mary.y + mary.h);

    return {
      minX, topY, maxX, maxY
    }
  }
  getItem( item: string){
     return this.eventArray.find(e => e.gtype === item);
  }

  determineSizes( canvas: HTMLCanvasElement){
    let dc = canvas.getBoundingClientRect();
    canvas.width = dc.width;
    canvas.height = dc.height;

    const numBeads = 54;
    const circum = (2 * canvas.width) + (2 * canvas.height);
    let space = Math.floor(circum / (numBeads + 2));
    const radius = Math.floor(space / 6);
    const indent = radius;
    const openWidth = space;

    // recalculate space
    space =  Math.floor(((2 * canvas.width) + (2 * canvas.height) - openWidth) / (numBeads + 4));
    const start = Math.max(indent + 8 * space, (canvas.width + openWidth) / 2);

    return {
      totalWidth: dc.width,
      totalHeight: dc.height,
      indent,
      openWidth,
      radius,
      space,
      imageWidth: Math.floor(1.2 * space),
      imageHeight: Math.floor(1.2 * space),
      start
    };
  }

  getBeadKey(decade, count){
    return `bead-${decade}-${10 - count}`
  }

  drawBeads(canvas: HTMLCanvasElement, rad){

    let dim = this.determineSizes(canvas);
    const ctx = canvas.getContext("2d");

    let x = dim.start;
    let y = dim.indent;

    let count = 10;
    let decade = 1;
    let total = 0;

    let test = dim.totalWidth - dim.indent;
    while (x <= test){

      if (count == 0){
        this.saveCoordinatesAuto(x, y, "bead", dim.radius, dim.radius + 5, "decade-" + decade++);
        total++;
        count = 10;
      }
      else {
        this.saveCoordinatesAuto(x, y, "bead", dim.radius, dim.radius, this.getBeadKey(decade, count));
        total++;
        count--;
      }

      x += dim.space;
    }
    if (x > test) {
      x -= dim.space;
    }
    y += dim.space;

    test = dim.totalHeight - dim.indent;
    while (y <= test){

      if (count == 0){
        this.saveCoordinatesAuto(x, y, "bead", dim.radius, dim.radius + 5, "decade-" + decade++);
        total++;
        count = 10;
      }
      else {
        this.saveCoordinatesAuto(x, y, "bead", dim.radius, dim.radius, this.getBeadKey(decade, count));
        total++;
         count--;
      }
      y += dim.space;
    }
    if (y > test) {
      y -= dim.space;
    }
    x -= dim.space;

    test = dim.indent;
    while (x >= test){

      if (count == 0){
        this.saveCoordinatesAuto(x, y, "bead", dim.radius, dim.radius + 5, "decade-" + decade++);
        total++;
        count = 10;
      }
      else {
        this.saveCoordinatesAuto(x, y, "bead", dim.radius, dim.radius, this.getBeadKey(decade, count));
        total++;
         count--;
      }
      x -= dim.space;
    }
    if (x < test) {
      x += dim.space;
    }
    y -= dim.space;

    test = dim.indent;
    while (y > test){

      if (count == 0){
        this.saveCoordinatesAuto(x, y, "bead", dim.radius, dim.radius + 5, "decade-" + decade++);
        total++;
        count = 10;
      }
      else {
        this.saveCoordinatesAuto(x, y, "bead", dim.radius, dim.radius, this.getBeadKey(decade, count));
        total++;
        count--;
      }
      y -= dim.space;
    }
    if (y < test){
      y = dim.indent;
    }
   // x = dim.indent;

    while (total < 54 ){

      if (count == 0){
        this.saveCoordinatesAuto(x, y, "bead", dim.radius, dim.radius + 5, "decade-" + decade++);
        total++;
        count = 10;
      }
      else {
        this.saveCoordinatesAuto(x, y, "bead", dim.radius, dim.radius, this.getBeadKey(decade, count));
        total++;
         count--;
      }

      x += dim.space;
    }

    let minX = 1000;
    let minY = 1000;
    let maxX = 0;
    let maxY = 0;
    this.eventArray.forEach( each => {
      minX = Math.min(minX, each.x);
      minY = Math.min(minY, each.y);
      maxX = Math.max(maxX, each.x);
      maxY = Math.max(maxY, each.y);
    })

    let shiftX = (minX + dim.totalWidth - maxX) / 2;
    let shiftY = (minY + dim.totalHeight - maxY) / 2;

    shiftX -= minX;
    shiftY -= minY;

    this.eventArray.forEach( each => {
      each.x += shiftX;
      each.y += shiftY;
    })
  }

  drawStart( canvas: HTMLCanvasElement){
    const dim = this.determineSizes(canvas);
    let w = canvas.width;
    let h = canvas.height;
    let centerX = dim.start - dim.space;
    let linkX = Math.min( dim.space, centerX / 8);
    this.eventArray = [
      {
        "x": centerX - 6 * linkX,
        "y": 5 * dim.indent,
        "selected": false,
        "gtype": "cross",
        "h": dim.imageHeight,
        "w": dim.imageWidth,
        "shiftKey": false,
        "key": "cross"
      },
      {
        "x": centerX - 5 * linkX,
        "y": 4 * dim.indent,
        "selected": false,
        "gtype": "ovalbead",
        "h": dim.radius,
        "w": 1.5 * dim.radius,
        "shiftKey": false,
        "key": "oval-1"
      },
      {
        "x": centerX - 4 * linkX,
        "y": 4.2 * dim.indent,
        "selected": false,
        "gtype": "bead",
        "h": dim.radius,
        "w": dim.radius,
        "shiftKey": false,
        "key": "bead-1"
      },
      {
        "x": centerX - 3 * linkX,
        "y": 5 * dim.indent,
        "selected": false,
        "gtype": "bead",
        "h": dim.radius,
        "w": dim.radius,
        "shiftKey": false,
        "key": "bead-2"
      },
      {
        "x": centerX - 2 * linkX,
        "y": 7.5 * dim.indent,
        "selected": false,
        "gtype": "bead",
        "h": dim.radius,
        "w": dim.radius,
        "shiftKey": false,
        "key": "bead-3"
      },
      {
        "x": centerX - 1 * linkX,
        "y": 9 * dim.indent,
        "selected": false,
        "gtype": "ovalbead",
        "h": dim.radius,
        "w": 1.5 * dim.radius,
        "shiftKey": false,
        "key": "oval-2"
      },
      {
        "x": centerX,
        "y": dim.indent + dim.imageHeight,
        "selected": false,
        "gtype": "chain-only",
        "h": 10,
        "w": 10,
        "shiftKey": false,
        "key": "none"
      },
      {
        "x": centerX,
        "y": 1.5 * dim.indent,
        "selected": false,
        "gtype": "mary",
        "h": dim.imageHeight,
        "w": dim.imageWidth,
        "shiftKey": true,
        "key": "mary"
      }
    ];
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
    ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.closePath();

    // ctx.fillText("" + this.count++, centerX + radiusX * 1.5, centerY);
  }

  drawShinyEllipseSelected(ctx, centerX: number, centerY: number, radiusX: number, radiusY, tilt){

    // Draw the sphere with the radial gradient
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();

    // // ctx.fillText("" + this.count++, centerX + radiusX * 1.5, centerY);
  }


  drawLineToCorners(canvas: HTMLCanvasElement, w: number, h: number){
    let centerX = w / 2.
    let centerY = h / 2;
    const ctx = canvas.getContext('2d');

    ctx.save();
    ctx.translate(400, 200);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(w, h);
    ctx.stroke();

     ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(0, h);
    ctx.stroke();

     ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(0, 0);
    ctx.stroke();

     ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(w, 0);
    ctx.stroke();

    ctx.restore();
  }

  drawBeadsFromList(canvas: HTMLCanvasElement, locations){
    const ctx = canvas.getContext("2d");

    let lastLoc;
    let lastAngle;
    let drawBead;
    let count = -1;

    for (var i = 0; i < locations.length; i++){
      const loc = locations[i];
      if (loc.gtype === "bead" ||loc.gtype === "ovalbead"){
        count++;
        if (i == 0 || !drawBead){
          lastLoc = loc;
          drawBead = loc.gtype === "bead" || "ovalbead";
        }
        else {
          ctx.save();
          ctx.translate(lastLoc.x, lastLoc.y);
          lastAngle = this.rotateSlope(ctx, loc.x - lastLoc.x, loc.y - lastLoc.y);
          this.drawShinyEllipse(ctx, 0, 0, lastLoc.w, lastLoc.h, 1);
          if (lastLoc.selected){
            this.drawShinyEllipseSelected(ctx, 0, 0, lastLoc.w, lastLoc.h, 1);
          }
          lastLoc = loc;
          drawBead = (loc.gtype === "bead" || loc.gtype === "ovalbead");
          ctx.restore();
        }
      }
    }

    if (drawBead){
      ctx.save();
      ctx.translate(lastLoc.x, lastLoc.y);
      ctx.rotate(-lastAngle);
      this.drawShinyEllipse(ctx, 0, 0, lastLoc.w, lastLoc.h, 1);
      if (lastLoc.selected){
        this.drawShinyEllipseSelected(ctx, 0, 0, lastLoc.w, lastLoc.h, 1);
      }
      ctx.restore();
    }
  }

  getClicked( event: MouseEvent){
    // if (!event.shiftKey && !event.ctrlKey){
    //   this.unselectAll();
    // }
    if (event.shiftKey){
      return null;
    }
    for (var i = 0; i < this.eventArray.length; i++){
      const each = this.eventArray[i];
      switch (each.gtype){
        case "cross":
        case "mary":
          if ((event.clientX < each.x + each.w / 2 && event.clientX > each.x - each.w / 2)
            &&(event.clientY < each.y + each.h - 5 && event.clientY > each.y + 5 )){
              return each;
            }
          break;
        case "bead":
        case "ovalbead":
          if ((event.clientX < each.x + each.w  && event.clientX > each.x - each.w)
            &&(event.clientY < each.y + each.h && event.clientY > each.y - each.h )){
              return each;
            }
          break;
        case "chain-only":
          if ((event.clientX < each.x + each.w  && event.clientX > each.x - each.w)
            &&(event.clientY < each.y + each.h && event.clientY > each.y - each.h )){
              return each;
          }
          break;
      }
    }

    //   if ((event.clientX < each.x + each.w / 2 && event.clientX > each.x - each.y / 2)
    //     &&(event.clientY < each.y + 10 && event.clientY > each.y - 10)){
    //       alert("kdkdk");
    //       return true;
    //   }
    // }
    return null;
  }

  downloadEvents(){
      const events = JSON.stringify(this.eventArray, null, 2);
      const blob = new Blob([events], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'event-list.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url); // Clean up the object URL
  }

  redoArray = [];
  checkUndo(e: KeyboardEvent){
    if (e.ctrlKey){
      if (e.key === 'z'){
        let popped = this.eventArray.pop();
        if (!!popped){
          this.redoArray.push(popped);
        }
      }
      else if (e.key === 'y') {
        let popped = this.redoArray.pop();
        if (!!popped){
          this.eventArray.push(popped);
        }
      }
    }
  }

  unselectAll(){
    this.eventArray.forEach( each => {
      each.selected = false;
    })
  }

  eventArray: ObjEvent[]= [];
  saveCoordinates(event: MouseEvent, type: string, h: number, w: number, key: string){
    this.eventArray.push ({x: event.clientX, y: event.clientY, selected: false, gtype: type, h, w, shiftKey: event.shiftKey, key});
  }

  saveCoordinatesAuto(clientX: number, clientY: number, type: string, h: number, w: number, key){
    this.eventArray.push ({x: clientX, y: clientY, selected: false, gtype: type, h, w, shiftKey: false, key});
  }

  selectNext(){
    const list = this.eventArray.filter( e => e.gtype !== 'start' && e.gtype !== 'chain-only');
    for (let i = 0; i < list.length; i++){
      if (list[i].selected){
        list[i].selected = false;
        if (i < list.length -1){
          list[i+1].selected = true;
          break;
        }
      }
    }
  }

  selectPrev(){
    const list = this.eventArray.filter( e => e.gtype !== 'start' && e.gtype !== 'chain-only');
    for (let i = 0; i < list.length; i++){
      if (list[i].selected){
        list[i].selected = false;
        if (i > 0){
          list[i-1].selected = true;
          break;
        }
      }
    }
  }

  next(canvas: HTMLCanvasElement){
    this.selectNext();
    this.redraw(canvas);
  }

   prev(canvas: HTMLCanvasElement){
    this.selectPrev();
    this.redraw(canvas);
  }
}


export interface ObjEvent {
  x: number;
  y: number;
  h?: number;
  w?: number;
  selected: boolean;
  gtype: string; // "bead" | "cross" |"chain-only";
  shiftKey: boolean;
  key: string;
}

export interface ContentUpdate {
  update: string;
  contentInfo?: any;
}


