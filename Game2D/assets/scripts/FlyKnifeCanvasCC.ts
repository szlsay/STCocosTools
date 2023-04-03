import { _decorator, Node, v2, v3, tween, Vec3, view } from 'cc';
import { STController } from './STController';
import { STNode, STSpriteNode } from './STUI';
const { ccclass, property } = _decorator;

const _temp_v2 = v2()
const _temp_v3 = v3()

@ccclass('FlyKnifeCanvasCC')
export class FlyKnifeCanvasCC extends STController {
    private targetNode: STSpriteNode = new STSpriteNode()
    private knifeNode: STSpriteNode = new STSpriteNode()
    private knifeContainerNode: STNode = new STNode()
    private knifeNodeArray = [];
    private canThrow = true;

    __preload() {
        super.__preload()
        this.knifeNode.loadDir("flyknife/knife")
        this.knifeNode.setPosition(0, -500)
        this.knifeContainerNode.addChild(this.knifeNode)
        this.node.addChild(this.knifeContainerNode)

        this.targetNode.loadDir("flyknife/target")
        this.targetNode.setPosition(0, 300)
        this.node.addChild(this.targetNode)
    }

    onLoad() {
        console.debug("FlyKnifeCanvasCC onLoad")
        this.node.on(Node.EventType.TOUCH_START, this._touchStart, this);
    }

    start() {
        console.debug("FlyKnifeCanvasCC start")
    }

    update(deltaTime: number) {
        this.targetNode.angle = (this.targetNode.angle + 3) % 360;

        this.knifeNodeArray.forEach((element) => {
            element.angle = (element.angle + 3) % 360;

            //半径
            let r = this.targetNode.st_width / 2;
            //弧度
            let rad = (Math.PI * (element.angle - 90)) / 180;
            //Math.cos(弧度)
            element.setPosition(
                this.targetNode.position.x + r * Math.cos(rad),
                this.targetNode.position.y + r * Math.sin(rad)
            );
        });
    }

    onDestroy() {
        this.node.off(Node.EventType.TOUCH_START, this._touchStart, this);
    }

    _touchStart() {
        if (!this.canThrow) {
            return;
        }

        this.canThrow = false;

        tween()
            .target(this.knifeNode)
            .to(0.1, { position: new Vec3(0, 50) })
            .call(() => {
                var isHit = false;
                var gap = 15;

                this.knifeNodeArray.forEach((element) => {
                    if (element.angle < gap || 360 - element.angle < gap) {
                        isHit = true;
                    }
                });

                if (isHit) {
                    tween()
                        .target(this.knifeNode)
                        .to(0.4, {
                            position: new Vec3(
                                200,
                                -view.getFrameSize().height -
                                this.knifeNode.st_height
                            ),
                            angle: 120,
                        })
                        .call(() => {
                            this.knifeNode.angle = 0;
                            this.knifeNode.setPosition(0, -300);
                            this.canThrow = true;
                        })
                        .start();
                } else {
                    const knifeNode: STSpriteNode = new STSpriteNode()
                    knifeNode.loadDir("flyknife/knife")
                    knifeNode.setPosition(this.knifeNode.position);
                    this.knifeContainerNode.addChild(knifeNode);
                    this.knifeNodeArray.push(knifeNode);

                    this.knifeNode.setPosition(0, -300);
                    this.canThrow = true;
                }
            })
            .start();
    }
}

