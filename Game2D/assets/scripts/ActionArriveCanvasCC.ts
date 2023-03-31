import { _decorator, Component, Node, director, Sprite, Scene, SceneAsset } from 'cc';
import { STButtonNode, STSpriteNode } from './STUI';
const { ccclass, property } = _decorator;

@ccclass('ActionArriveCanvasCC')
export class ActionArriveCanvasCC extends Component {
    private spriteBGNode: STSpriteNode = new STSpriteNode()

    __preload() {
        this.node.addChild(this.spriteBGNode)
        this.spriteBGNode.sprite.sizeMode = Sprite.SizeMode.CUSTOM
        this.spriteBGNode.st_left = 0
        this.spriteBGNode.st_right = 0
        this.spriteBGNode.st_top = 0
        this.spriteBGNode.st_bottom = 0
        this.spriteBGNode.st_colorHexString = "#CBFF8D"
        this.spriteBGNode.loadDir("home/default_sprite")

        console.debug("ActionArriveCanvasCC __preload")
        const backBtnNode: STButtonNode = new STButtonNode()
        backBtnNode.loadDir("back")
        backBtnNode.st_left = 20
        backBtnNode.st_top = 20
        backBtnNode.on(Node.EventType.TOUCH_END, this.onClickBack, this)
        this.node.addChild(backBtnNode)
    }

    onLoad() {
        console.debug("ActionArriveCanvasCC onLoad")
    }

    start() {
        console.debug("ActionArriveCanvasCC start")
    }

    onClickBack() {
        director.preloadScene("Home", (completedCount: number, totalCount: number, item: any) => {
            console.log("preloadScene", completedCount, totalCount, item)
        }, (error: null | Error, sceneAsset?: SceneAsset) => {
            console.log("preloadScene", error, sceneAsset)
            director.loadScene("Home")
        })
    }
}

