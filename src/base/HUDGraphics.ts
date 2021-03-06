import HUDObject from './HUDObject';

import Point from './Point';

class DrawObject extends Point {
    render(context: CanvasRenderingContext2D) {} // draws shape
    path(context: CanvasRenderingContext2D) {} // make path of shape
}

class ColorObject extends DrawObject {
    color: string;
    constructor(color = "#000000"){
        super();

        this.color = color;
    }

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
    }
}

class RectObject extends DrawObject {
    width: number;
    height: number;

    constructor(x: number = 0, y: number = 0, width: number = 1, height: number = 1){
        super(x, y);

        this.width = width;
        this.height = height;
    }

    render(context: CanvasRenderingContext2D){
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    path(context: CanvasRenderingContext2D){
        // context.moveTo(this.x, this.y);
        // context.lineTo(this.x + this.width, this.y);
        // context.lineTo(this.x + this.width, this.y + this.height);
        // context.lineTo(this.x, this.y + this.height);
        // context.lineTo(this.x, this.y);
        context.rect(this.x, this.y, this.width, this.height);
    }
}

class HUDGraphics extends HUDObject {
    _drawables: Array<DrawObject> = [];
    width: number = 0;
    height: number = 0;

    constructor(){
        super();
    }

    fillStyle(color: string){
        this._drawables.push(new ColorObject(color));
        return this;
    }

    drawRect(x: number, y: number, width: number, height: number){
        this._drawables.push(new RectObject(x, y, width, height));
        this.width = width;
        this.height = height;
        return this;
    }

    clear(){
        this._drawables = [];
        return this;
    }

    path(context: CanvasRenderingContext2D){
        context.save();
        
        context.translate(this.position.x, this.position.y);
        context.rotate(this.rotation);
        context.scale(this.scale.x, this.scale.y);
        context.translate( -this.pivot.x, -this.pivot.y);

        context.beginPath();
        for (let i = 0; i < this._drawables.length; ++i) {
            this._drawables[i].path(context);
        }

        context.restore();
    }

    render(context: CanvasRenderingContext2D){
        if (!this.visible) { return; }
        if (this.isMask) { return; }

        if (this.mask) {
            this.mask.path(context);
            context.clip();
        }

        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.rotation);
        context.scale(this.scale.x, this.scale.y);
        context.translate( -this.pivot.x, -this.pivot.y);

        let alpha = context.globalAlpha;
        context.globalAlpha = Math.min(Math.max(0, context.globalAlpha * this.alpha), 1);

        for (let i = 0; i < this._drawables.length; ++i) {
            this._drawables[i].render(context);
        }

        super.render(context);
        
        context.restore();
        context.globalAlpha = alpha;
    }

    updateHitArea(){
        this.hitArea.setRect(0, 0, this.width, this.height);
        this.hitArea.move(this.position.x, this.position.y);
        this.hitArea.scale(this.scale.x, this.scale.y);
        this.hitArea.move(
            (-(this.pivot.x) - (this.anchor.x * this.width)) * this.scale.x,
            (-(this.pivot.y) - (this.anchor.y * this.height)) * this.scale.y
        );

        super.updateHitArea();
    }
}

export default HUDGraphics;