import HUDObject from './HUDObject';

class HUDText extends HUDObject {
    text: string;
    color: string = "black";
    fontSize: number = 24;
    fontFamily: string = 'arial';

    metric: TextMetrics;

    constructor(text: string = "", color: string = "black"){
        super();

        this.text = text;
        this.color = color;
    }

    render(context: CanvasRenderingContext2D){
        if (!this.visible) { return; }
        if (this.isMask) { return; }

        if (this.mask) {
            this.mask.path(context);
            context.clip();
        }
        
        /* not sure about round number of font size */
        context.font = `${/*Math.round(*/this.fontSize/*)*/}px ${this.fontFamily}`;
        context.fillStyle = this.color;
        this.metric = context.measureText(this.text);

        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.rotation);
        context.scale(this.scale.x, this.scale.y);
        context.translate(
            -(this.pivot.x) - (this.anchor.x * this.metric.width),
            -(this.pivot.y) - (this.anchor.y * this.fontSize)
        );

        let alpha = context.globalAlpha;
        context.globalAlpha = Math.min(1, Math.max(0, context.globalAlpha * this.alpha));

        context.fillText(this.text, 0, this.fontSize);
        
        super.render(context);

        context.restore();
        context.globalAlpha = alpha;
    }

    updateHitArea(){
        this.hitArea.setRect(0, 0, this.metric.width, this.fontSize);
        this.hitArea.move(this.position.x, this.position.y);
        this.hitArea.scale(this.scale.x, this.scale.y);
        this.hitArea.move(
            (-(this.pivot.x) - (this.anchor.x * this.metric.width)) * this.scale.x,
            (-(this.pivot.y) - (this.anchor.y * this.fontSize)) * this.scale.y
        );

        super.updateHitArea();
    }
}

export default HUDText;