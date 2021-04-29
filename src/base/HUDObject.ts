import Point from './Point';

class HUDObject {
    position: Point;
    pivot: Point;
    anchor: Point;
    scale: Point;

    parent: HUDObject;
    children: Array<HUDObject>;

    alpha: number = 1;
    rotation: number = 0;
    visible: boolean = true;

    constructor(){
        this.position = new Point();
        this.pivot = new Point();
        this.anchor = new Point();
        this.scale = new Point(1, 1);

        this.children = new Array<HUDObject>();
    }

    setParent(parent: HUDObject){
        if (this.parent) {
            this.parent.removeChild(this);
        }

        this.parent = parent;
    }

    addChild(child: HUDObject){
        child.setParent(this);
        
        this.children.push(child);

        return child;
    }

    addChildAt(child: HUDObject, index: number = 0){
        child.setParent(this);

        this.children.splice(index, 0, child);

        return child;
    }

    removeChild(child: HUDObject){
        let index = this.children.indexOf(child);

        if (index < 0) { return ; }

        this.children.splice(index, 1);

        return child;
    }

    removeChildren(){
        let child = this.children.pop();
        while (child) {
            child.parent = null;
            child = this.children.pop();
        }
    }

    render(context: CanvasRenderingContext2D){
        if (!this.visible) { return; }

        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.rotation);
        context.scale(this.scale.x, this.scale.y);
        context.translate( -this.pivot.x, -this.pivot.y);

        let alpha = context.globalAlpha;
        context.globalAlpha = Math.min(Math.max(0, context.globalAlpha * this.alpha), 1);

        for (let i = 0; i < this.children.length; ++i) {
            this.children[i].render(context);
        }

        context.restore();
        context.globalAlpha = alpha;
    }

    onResize(width: number, height: number){
        for (let i = 0; i < this.children.length; ++i) {
            this.children[i].onResize(width, height);
        }
    }
}

export default HUDObject;