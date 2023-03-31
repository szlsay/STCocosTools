import { _decorator, Component, Node, Sprite, resources, SpriteFrame, Color } from 'cc';
import { STButtonNode, STLabelNode, STSpriteNode } from './STUI';
const { ccclass, property } = _decorator;

@ccclass('HomeCanvasCC')
export class HomeCanvasCC extends Component {

    private spriteBGNode: STSpriteNode = new STSpriteNode()
    private iconBGNode: STSpriteNode = new STSpriteNode()
    private buttonNode: STButtonNode = new STButtonNode()
    private btnLabelNode: STLabelNode = new STLabelNode()
    __preload() {
        console.debug("HomeCanvasCC __preload")
        this.node.addChild(this.spriteBGNode)
        this.spriteBGNode.sprite.sizeMode = Sprite.SizeMode.CUSTOM
        this.spriteBGNode.st_left = 0
        this.spriteBGNode.st_right = 0
        this.spriteBGNode.st_top = 0
        this.spriteBGNode.st_bottom = 0
        this.spriteBGNode.st_colorHexString = "#CBFF8D"
        this.spriteBGNode.loadDir("home/default_sprite")

        this.node.addChild(this.iconBGNode)
        this.iconBGNode.sprite.sizeMode = Sprite.SizeMode.CUSTOM
        this.iconBGNode.st_left = 0
        this.iconBGNode.st_right = 0
        this.iconBGNode.st_top = 0
        this.iconBGNode.st_bottom = 0
        this.iconBGNode.loadDir("home/home_bg")

        this.node.addChild(this.buttonNode)
        this.buttonNode.sprite.sizeMode = Sprite.SizeMode.CUSTOM
        this.buttonNode.st_width = 200
        this.buttonNode.st_height = 80
        this.buttonNode.loadDir("home/home_btn_bg")

        this.buttonNode.addChild(this.btnLabelNode)
        this.btnLabelNode.st_string = "案例1"
        this.btnLabelNode.st_colorHexString = "#639F28"
        this.btnLabelNode.st_fontSize = 30
        this.btnLabelNode.setPosition(0, 4)
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

