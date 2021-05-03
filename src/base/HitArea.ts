import Point from './Point';

class HitArea {
    points: Array<Point>;
    width: number;
    height: number;

    constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0){
        let AA = new Point(x, y);
        let AB = new Point(x + width, y);
        let BB = new Point(x + width, y + height);
        let BA = new Point(x, y + height);

        this.points = [AA, AB, BB, BA];

        this.width = width;
        this.height = height;
    }

    setRect(x: number, y: number, width: number, height: number){
        this.points[0].set(x, y);
        this.points[1].set(x + width, y);
        this.points[2].set(x + width, y + height);
        this.points[3].set(x, y + height);

        this.width = width;
        this.height = height;
    }

    move(x: number, y: number) {
        for (let i = 0; i < this.points.length; ++i) {
            this.points[i].x += x;
            this.points[i].y += y;
        }
    }

    scale(x: number, y: number) {
        this.setRect(this.points[0].x, this.points[0].y, this.width * x, this.height * y);
    }

    isHit(x: number, y: number) {
        return 
            ((x > this.points[0].x) && (x < this.points[1].x)) &&
            ((y > this.points[0].y) && (y < this.points[2].y));
    }
}

export default HitArea;