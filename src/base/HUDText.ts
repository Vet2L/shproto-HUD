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

        /* not sure about round number of font size */
        context.font = `${/*Math.round(*/this.fontSize/*)*/}px ${this.fontFamily}`;
        context.fillStyle = this.color;

        this.metric = context.measureText(this.text);

        let alpha = this.alpha;
        let x = this.position.x - this.pivot.x - this.anchor.x * this.metric.width;
        let y = this.position.y - this.pivot.y - this.anchor.y * this.fontSize;
        let parent = this.parent;
        while (parent) {
            x += parent.position.x - parent.pivot.x;
            y += parent.position.y - parent.pivot.y;
            alpha *= parent.alpha;

            parent = parent.parent;
        }

        context.globalAlpha = Math.min(1, Math.max(0, alpha));
        context.fillText(this.text, x, y + this.fontSize);
        
        super.render(context);
    }
}

export default HUDText;