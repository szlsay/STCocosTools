import { _decorator, Component, Node } from 'cc';
import { STSpriteNode } from './STUI';
const { ccclass, property } = _decorator;

@ccclass('HomeCanvasCC')
export class HomeCanvasCC extends Component {

    private spriteNode:STSpriteNode = new STSpriteNode()

    __preload() {
        console.debug("HomeCanvasCC __preload")
        this.node.addChild(this.spriteNode)
        this.spriteNode.load("home/home_share/spriteFrame")
        this.spriteNode.st_top = 20
        this.spriteNode.st_left = 0
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

