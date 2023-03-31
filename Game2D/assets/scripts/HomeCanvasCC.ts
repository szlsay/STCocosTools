import { _decorator, Component, Node, Sprite, resources, SpriteFrame, Color, Layout, EventTouch, director } from 'cc';
import { STButtonNode, STLabelNode, STLayoutNode, STSpriteNode } from './STUI';
const { ccclass, property } = _decorator;

@ccclass('HomeCanvasCC')
export class HomeCanvasCC extends Component {

    private spriteBGNode: STSpriteNode = new STSpriteNode()
    private iconBGNode: STSpriteNode = new STSpriteNode()

    private sceneNames: string[] = [
        "ActionArrive",
        "BaseTube",
        "PlaneWar",
        "SheepStart",
        "Audio",
        "FlyKnife",
        "RollBall",
        "AngryBird",
        "ItemTest",
        "ItemTest",
        "ItemTest",
        "ItemTest",
    ];
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

        const layoutNode = new STLayoutNode()
        layoutNode.st_width = 640
        layoutNode.layout.type = Layout.Type.GRID
        layoutNode.layout.resizeMode = Layout.ResizeMode.CONTAINER
        layoutNode.layout.spacingX = 20
        layoutNode.layout.spacingY = 20
        this.node.addChild(layoutNode)

        for (let index = 0; index < this.sceneNames.length; index++) {
            layoutNode.addChild(this.initBtn(this.sceneNames[index]))
        }
    }

    initBtn(name): STButtonNode {
        const buttonNode: STButtonNode = new STButtonNode(name)
        buttonNode.sprite.sizeMode = Sprite.SizeMode.CUSTOM
        buttonNode.st_width = 200
        buttonNode.st_height = 80
        buttonNode.loadDir("home/home_btn_bg")
        buttonNode.on(Node.EventType.TOUCH_END, this.onClick, this)

        const btnLabelNode: STLabelNode = new STLabelNode()
        btnLabelNode.st_string = name
        btnLabelNode.st_colorHexString = "#639F28"
        btnLabelNode.st_fontSize = 30
        btnLabelNode.setPosition(0, 4)
        buttonNode.addChild(btnLabelNode)
        return buttonNode
    }

    onClick(evt: EventTouch) {
        const name = evt.currentTarget.name
        console.log('name', name)
        if (name.string !== 'ItemTest') {
            director.loadScene(name)
        }
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

