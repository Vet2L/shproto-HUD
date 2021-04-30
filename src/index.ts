import HUDApp from './base/HUDApp';
import HUDScore from './score/HUDScore';
import HUDShop from './shop/HUDShop';

function hudPrototype() {
    const div = document.querySelector('.hud-score');
    const app = new HUDApp(div, 1280, 720);

    const HUD = new HUDScore();
    app.scene.addChild(HUD);

    const onResize = () => {
        let width = window.innerWidth;
        let height = window.innerHeight;

        app.canvas.style.width = width + "px";
        app.canvas.style.height = height + "px";

        const scale = Math.min(width / 1280, height / 720);
        app.canvas.style.width = Math.floor(scale * 1280) + "px";
        app.canvas.style.height = Math.floor(scale * 720) + "px";
        app.canvas.style.left = Math.floor((width - (1280 * scale))/2) + "px";
        app.canvas.style.top = "0px";

        app.onResize(1280, 720);
    }

    onResize();
    window.addEventListener('resize', onResize);

    /* for debug purpose only */
    //@ts-ignore
    window.app = app;
    //@ts-ignore
    window.HUD = HUD;

    const parseData = (data: any)=>{
        for (let i = 0; i < data.points.length; ++i) {
            let point = data.points[i];
            switch (point.type) {
                case "kill":
                    HUD.onPlayerKill(point.name);
                    HUD.onPlayerScore(point.points);
                    HUD.onPlayerPoint(point);
                    break;
                default:
                    HUD.onPlayerScore(point.points);
                    HUD.onPlayerPoint(point);
                    break;
            }
        }
    };

    const onButtonClick = ()=>{
        let raw = document.querySelector('.hud-test__data').innerHTML;
        let data = null;
        try{
            data = JSON.parse(raw);
        } catch (e) {
            console.error(e);
        }
        if (data) { parseData(data); }
    }

    let btn: HTMLButtonElement = document.querySelector('.hud-test__button');
    btn.onclick = onButtonClick;

    const shopDiv = document.querySelector('.hud-shop');
    const shopApp = new HUDApp(shopDiv, 900, 720);

    const shop = new HUDShop();
    shopApp.scene.addChild(shop);

    //@ts-ignore
    window.shopApp = shopApp;
    //@ts-ignore
    window.shop = shop;

    console.log("READY");
}

hudPrototype();