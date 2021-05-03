import Point from './Point';

class Rectangle extends Point {
    
    width: number;
    height: number;

    constructor(x: number = 0, y: number = 0, width: number = 1, height: number = 1){
        super(x, y);

        this.width = width;
        this.height = height;
    }

    setSize(width: number, height: number = width){
        this.width = width;
        this.height = height;
    }
}

export default Rectangle;