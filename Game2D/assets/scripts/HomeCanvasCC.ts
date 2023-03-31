import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HomeCanvasCC')
export class HomeCanvasCC extends Component {

    __preload() {
        console.debug("HomeCanvasCC __preload")
    }

    onLoad() {
        console.debug("HomeCanvasCC onLoad")
    }

    start() {
        console.debug("HomeCanvasCC start")
    }

    update(deltaTime: number) {

    }
}

