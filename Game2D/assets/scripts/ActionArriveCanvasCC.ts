import { _decorator, Node, EventTouch, v2, v3, UITransform } from 'cc';
import { STController } from './STController';
import { STSteeredVehicle } from './STSteeredVehicle';
import { STSpriteNode } from './STUI';
const { ccclass, property } = _decorator;

const _temp_v2 = v2()
const _temp_v3 = v3()

@ccclass('ActionArriveCanvasCC')
export class ActionArriveCanvasCC extends STController {
    private targetNode: STSpriteNode = new STSpriteNode()
    private bulletNode: STSpriteNode = new STSpriteNode()
    private seeker: STSteeredVehicle

    __preload() {
        super.__preload()
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
}

