import HUDObject from './HUDObject';

class HUDImage extends HUDObject {
    _image: HTMLImageElement;
    width: number = 0;
    height: number = 0;

    constructor(src: string){
        super();

        this._image = new Image();
        this._image.src = src;
    }

    render(context: CanvasRenderingContext2D) {
        if (!this.visible) { return; }
        if (this.isMask) { return; }

        if (!this._image.complete) { return; }
        else {
            this.width = this._image.width;
            this.height = this._image.height;
        }

        if (this.mask) {
            this.mask.path(context);
            context.clip();
        }

        context.save();
        context.translate(
            this.position.x/* - (this.pivot.x * this.scale.x) - (this.anchor.x * this.width * this.scale.x)*/, 
            this.position.y/* - (this.pivot.y * this.scale.y) - (this.anchor.y * this.height * this.scale.y)*/
        );
        context.rotate(this.rotation);
        context.scale(this.scale.x, this.scale.y);
        context.translate(
            -this.pivot.x - this.anchor.x * this.width,
            -this.pivot.y - this.anchor.y * this.height
        );

        let alpha = context.globalAlpha;
        context.globalAlpha = Math.min(1, Math.max(0, context.globalAlpha * this.alpha));

        context.drawImage(this._image, 0, 0);

        super.render(context);
        
        context.restore();
        context.globalAlpha = alpha;
    }
}

export default HUDImage;