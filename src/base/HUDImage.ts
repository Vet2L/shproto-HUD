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

        if (!this._image.complete) { return; }
        else {
            this.width = this._image.width;
            this.height = this._image.height;
        }

        let alpha = this.alpha;
        let x = this.position.x - this.pivot.x - this.anchor.x * this.width;
        let y = this.position.y - this.pivot.y - this.anchor.y * this.height;
        let parent = this.parent;
        while (parent) {
            x += parent.position.x - parent.pivot.x;
            y += parent.position.y - parent.pivot.y;
            alpha *= parent.alpha;

            parent = parent.parent;
        }

        context.globalAlpha = Math.min(1, Math.max(0, alpha));

        context.drawImage(this._image, x, y);
        
        super.render(context);
    }
}

export default HUDImage;