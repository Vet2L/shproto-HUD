import HUDObject from './HUDObject';

interface HUDAppOptions {
    transparency: boolean
}

interface HUDEvent {
    type: string;
    x: number;
    y: number;
}

class HUDApp {
    _time: number = -1;
    lifetime: number = 0;
    lastDelta: number = 0;

    scene: HUDObject;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    width: number;
    height: number;

    constructor(view: HTMLElement | Element = document.body, width: number = 640, height: number = 480){
        if (view.tagName === "CANVAS") {
            this.canvas = <HTMLCanvasElement> view;
        } else {
            this.canvas = document.createElement('canvas');
            this.canvas.className = "hud-canvas";
            view.appendChild(this.canvas);
        }
        this.canvas.width = this.width = width;
        this.canvas.height = this.height = height;

        this.context = this.canvas.getContext('2d', { alpha: true });
        this.scene = new HUDObject();

        this.render = this.render.bind(this);
        this.render();

        // this.canvas.addEventListener('mousedown', (e)=>{
        //     let sx = this.canvas.width / this.canvas.offsetWidth;
        //     let sy = this.canvas.height / this.canvas.offsetHeight;
        //     this.eventHandler({
        //         type: 'mousedown',
        //         x: e.offsetX * sx,
        //         y: e.offsetY * sy
        //     });
        // });

        // this.canvas.addEventListener('mousemove', (e)=>{
        //     let sx = this.canvas.width / this.canvas.offsetWidth;
        //     let sy = this.canvas.height / this.canvas.offsetHeight;
        //     this.eventHandler({
        //         type: 'mousemove',
        //         x: e.offsetX * sx,
        //         y: e.offsetY * sy
        //     });
        // });

        // this.canvas.addEventListener('mouseup', (e)=>{
        //     let sx = this.canvas.width / this.canvas.offsetWidth;
        //     let sy = this.canvas.height / this.canvas.offsetHeight;
        //     this.eventHandler({
        //         type: 'mouseup',
        //         x: e.offsetX * sx,
        //         y: e.offsetY * sy
        //     });
        // });
    }

    /* main ticker function */
    tick(delta: number){
        // console.log(delta);
    }

    eventHandler(e: HUDEvent){
        /* i'm exhausted to continue this mouse event system */
        // console.log(e);
        // for (let i = 0; i < this.scene.children.length; ++i){

        // }
    }

    render(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.scene.render(this.context);
        // this.scene.updateHitArea();

        if (this._time < 0) {
            this._time = window.performance.now();
        }
        let old = this._time;
        this._time = window.performance.now();
        this.lastDelta = this._time - old;
        this.lifetime += this.lastDelta;

        this.tick(this.lastDelta);

        window.requestAnimationFrame(this.render);
    }

    onResize(width: number, height: number){
        this.canvas.width = this.width = width;
        this.canvas.height = this.height = height;
        
        for (let i = 0; i < this.scene.children.length; ++i){
            this.scene.children[i].onResize(width, height);
        }
    }
}

export default HUDApp;