import { _decorator, Component, Node, Sprite, resources, SpriteFrame, Color } from 'cc';
import { STSpriteNode } from './STUI';
const { ccclass, property } = _decorator;

@ccclass('HomeCanvasCC')
export class HomeCanvasCC extends Component {

    private spriteNode: STSpriteNode = new STSpriteNode()
    __preload() {
        console.debug("HomeCanvasCC __preload")
        this.node.addChild(this.spriteNode)
        this.spriteNode.sprite.sizeMode = Sprite.SizeMode.CUSTOM
        this.spriteNode.st_left = 0
        this.spriteNode.st_right = 0
        this.spriteNode.st_top = 0
        this.spriteNode.st_bottom = 0
        this.spriteNode.st_colorHexString = "#CBFF8D"

        // #CBFF8D
        this.spriteNode.loadDir("home/default_sprite")
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

