import { _decorator, Component, Node, director, Sprite, Scene, SceneAsset, EventTouch, v2, v3, UITransform } from 'cc';
import { STSteeredVehicle } from './STSteeredVehicle';
import { STButtonNode, STSpriteNode } from './STUI';
const { ccclass, property } = _decorator;

const _temp_v2 = v2()
const _temp_v3 = v3()

@ccclass('FlyKnifeCanvasCC')
export class FlyKnifeCanvasCC extends Component {
    
    private spriteBGNode: STSpriteNode = new STSpriteNode()
    private targetNode: STSpriteNode = new STSpriteNode()
    private bulletNode: STSpriteNode = new STSpriteNode()
    private seeker: STSteeredVehicle

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

        this.node.addChild(this.targetNode)
        this.targetNode.loadDir("actionArrive/target")

        this.node.addChild(this.bulletNode)
        this.bulletNode.loadDir("actionArrive/bullet")
        this.seeker = this.bulletNode.addComponent(STSteeredVehicle).getComponent(STSteeredVehicle)
    }

    onLoad() {
        console.debug("ActionArriveCanvasCC onLoad")
    }

    start() {
        console.debug("ActionArriveCanvasCC start")
        this.node.on(Node.EventType.TOUCH_START, this.onTouchEvent, this)
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchEvent, this)
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEvent, this)
    }
    private onTouchEvent(evt: EventTouch) {
        evt.getUILocation(_temp_v2)
        _temp_v3.set(_temp_v2.x, _temp_v2.y, 0)
        this.node.getComponent(UITransform)?.convertToNodeSpaceAR(_temp_v3, _temp_v3)
        this.targetNode.setPosition(_temp_v3)
    }

    update() {
        _temp_v2.set(this.targetNode.position.x, this.targetNode.position.y)
        this.seeker.arrive(_temp_v2)
        this.seeker.fixedUpdate()
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

