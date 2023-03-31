import { _decorator, Node, Layers, Sprite, SpriteAtlas, resources, Label, UITransform, math, Layout, Button, __private, LabelOutline, Color, assetManager, ImageAsset, SpriteFrame, Texture2D, Slider, Widget } from 'cc';

const { ccclass } = _decorator;

@ccclass('STNode')
export class STNode extends Node {
    /**
     * @zh UI 变换组件
     */
    transform: UITransform;
    /**
     * @zh Widget 组件，用于设置和适配其相对于父节点的边距，Widget 通常被用于 UI 界面，也可以用于其他地方。<br/>
     * Widget 会自动调整当前节点的坐标和宽高，不过目前调整后的结果要到下一帧才能在脚本里获取到，除非你先手动调用 [[updateAlignment]]。
     */
    widget: Widget

    /**
     * @en
     * Size of the UI node.
     *
     * @zh
     * 内容尺寸。
     */
    get contentSize(): Readonly<math.Size> {
        return this.transform.contentSize
    }
    set contentSize(value: Readonly<math.Size>) {
        this.transform.setContentSize(value)
    }
    get width(): number {
        return this.transform.width
    }
    set width(value: number) {
        this.transform.width = value
    }
    get height(): number {
        return this.transform.height
    }
    set height(value: number) {
        this.transform.height = value
    }
    /**
     * @en
     * Anchor point of the UI node.
     *
     * @zh
     * 锚点位置。
     */
    get anchorPoint(): Readonly<math.Vec2> {
        this.transform.setAnchorPoint
        return this.transform.anchorPoint
    }
    set anchorPoint(value: Readonly<math.Vec2>) {
        this.transform.anchorPoint = value
    }
    setAnchorPoint(point: math.Vec2 | Readonly<math.Vec2> | number, y?: number): void {
        this.transform.setAnchorPoint(point, y)
    }
    get anchorX(): number {
        return this.transform.anchorX
    }
    set anchorX(value: number) {
        this.transform.anchorX = value
    }
    get anchorY(): number {
        return this.transform.anchorY
    }
    set anchorY(value: number) {
        this.transform.anchorY = value
    }

    constructor(name?: string) {
        super(name);
        this.layer = Layers.Enum.UI_2D
        this.transform = this.addComponent(UITransform).getComponent(UITransform)
        this.widget = this.addComponent(Widget).getComponent(Widget)
    }
}

@ccclass('STSpriteNode')
export class STSpriteNode extends STNode {

    /**
     * @zh 精灵
     */
    sprite: Sprite;

    /**
     * @zh 设置SpriteFrame中的图片
     * @param path SpriteFrame路径
     */
    load(path: string) {
        resources.load(path, SpriteFrame, (error: Error, sprite: SpriteFrame) => {
            if (error) {
            } else {
                this.sprite.spriteFrame = sprite
            }
        });
    }

    /**
     * @zh 设置图片集中的图片
     * @param path 图片集路径
     * @param name 图片名称
     */
    loadAtlas(path: string, name: string) {
        resources.load(path, SpriteAtlas, (error: Error, atlas: SpriteAtlas) => {
            if (error) {
            } else {
                this.sprite.spriteFrame = atlas.getSpriteFrame(name)
            }
        });
    }

    /**
     * @en
     * Load remote asset with url, such as audio, image, text and so on.
     *
     * @zh
     * 使用 url 加载远程资源
     *
     * @param url - The url of asset
     *
     */

    loadRemote(url: string) {
        assetManager.loadRemote<ImageAsset>(url, (err: Error, sp: ImageAsset) => {
            if (err) {
                console.error(err, sp);
                return;
            }
            const spriteFrame = new SpriteFrame();
            const texture = new Texture2D();
            texture.image = sp;
            spriteFrame.texture = texture;
            this.sprite.spriteFrame = spriteFrame;
        });
    }

    constructor(name?: string) {
        super(name);
        this.sprite = this.addComponent(Sprite).getComponent(Sprite)
    }
}

@ccclass('STLabelNode')
export class STLabelNode extends STNode {

    /**
     * @zh 文本
     */
    label: Label;

    /**
     * @zh 描边效果组件
     */
    labelOutline: LabelOutline;

    /**
     * @en
     * Content string of label.
     *
     * @zh
     * 标签显示的文本内容。
     */
    get string(): string {
        return this.label.string
    }
    set string(value: string) {
        this.label.string = value
    }

    setStringWitdhLength(value: string, length: number = 5) {
        let string = ''
        if (value) {
            if (value.length > length) {
                string = value.slice(0, length)
            } else {
                string = value
            }
        } else {
            string = ''
        }
        this.label.string = string
    }

    /**
     * @en Main color for rendering, it normally multiplies with texture color.
     * @zh 渲染颜色，一般情况下会和贴图颜色相乘。
     */
    get color(): Readonly<math.Color> {
        return this.label.color
    }
    set color(value: Readonly<math.Color>) {
        this.label.color = value
    }
    set colorHexString(value: string) {
        this.label.color = new Color(value)
    }
    /**
     * @en
     * Font size of label.
     *
     * @zh
     * 文本字体大小。
     */
    get fontSize(): number {
        return this.label.fontSize
    }

    set fontSize(value: number) {
        this.label.fontSize = value
    }
    /**
     * @en
     * Outline color.
     *
     * @zh
     * 改变描边的颜色。
     *
     * @example
     * ```ts
     * import { Color } from 'cc';
     * outline.color = new Color(0.5, 0.3, 0.7, 1.0);
     * ```
     */
    get colorOutline(): Readonly<math.Color> {
        return this.labelOutline.color
    }
    set colorOutline(value: Readonly<math.Color>) {
        this.labelOutline.color = value
    }
    /**
     * @en
     * Change the outline width.
     *
     * @zh
     * 改变描边的宽度。
     *
     * @example
     * ```ts
     * outline.width = 3;
     * ```
     */
    get widthOutline(): number {
        return this.labelOutline.width
    }
    set widthOutline(value: number) {
        this.labelOutline.width = value
    }
    constructor(name?: string) {
        super(name);
        this.label = this.addComponent(Label).getComponent(Label)
        this.labelOutline = this.addComponent(LabelOutline).getComponent(LabelOutline)
        this.widthOutline = 0
    }
}

@ccclass('STButtonNode')
export class STButtonNode extends STSpriteNode {

    /**
     * @zh 按钮
     */
    button: Button;

    /**
     * @en
     * Transition type.
     *
     * @zh
     * 按钮状态改变时过渡方式。
     */
    get transition(): __private._cocos_ui_button__Transition {
        return this.button.transition
    }
    set transition(value: __private._cocos_ui_button__Transition) {
        this.button.transition = value
    }
    /**
    * @en
    * Color and Scale transition duration.
    *
    * @zh
    * 颜色过渡和缩放过渡时所需时间。
    */
    get duration(): number {
        return this.button.duration
    }
    set duration(value: number) {
        this.button.duration = value
    }
    /**
     * @en
     * When user press the button, the button will zoom to a scale.
     * The final scale of the button equals (button original scale * zoomScale)
     * NOTE: Setting zoomScale less than 1 is not adviced, which could fire the touchCancel event if the touch point is out of touch area after scaling.
     * if you need to do so, you should set target as another background node instead of the button node.
     *
     * @zh
     * 当用户点击按钮后，按钮会缩放到一个值，这个值等于 Button 原始 scale * zoomScale。
     * 注意：不建议 zoomScale 的值小于 1, 否则缩放后如果触摸点在触摸区域外, 则会触发 touchCancel 事件。
     * 如果你需要这么做，你应该把 target 设置为另一个背景节点，而不是按钮节点。
     */
    get zoomScale(): number {
        return this.button.zoomScale
    }
    set zoomScale(value: number) {
        this.button.zoomScale = value
    }

    constructor(name?: string) {
        super(name);
        this.button = this.addComponent(Button).getComponent(Button)
    }
}


/**
 * @zh 背景图，内容从左到右
 */
@ccclass('STSpriteLTRNode')
export class STSpriteLTRNode extends STSpriteNode {
    /**
     * @zh 容器
     */
    layout: Layout;

    /**
     * @en
     * The left padding of layout, it only effect the layout in one direction.
     *
     * @zh
     * 容器内左边距，只会在一个布局方向上生效。
     */
    get paddingLeft(): number {
        return this.layout.paddingLeft
    }
    set paddingLeft(value: number) {
        this.layout.paddingLeft = value
    }
    /**
     * @en
     * The right padding of layout, it only effect the layout in one direction.
     *
     * @zh
     * 容器内右边距，只会在一个布局方向上生效。
     */
    get paddingRight(): number {
        return this.layout.paddingRight
    }
    set paddingRight(value: number) {
        this.layout.paddingRight = value
    }

    constructor(name?: string) {
        super(name);
        this.sprite.type = Sprite.Type.SLICED
        this.sprite.sizeMode = Sprite.SizeMode.CUSTOM

        this.layout = this.addComponent(Layout).getComponent(Layout)
        this.layout.type = Layout.Type.HORIZONTAL
        this.layout.resizeMode = Layout.ResizeMode.CONTAINER
        this.layout.horizontalDirection = Layout.HorizontalDirection.LEFT_TO_RIGHT
    }
}

@ccclass('STSliderNode')
export class STSliderNode extends STNode {

    /**
     * @en
     * The Slider Control.
     *
     * @zh
     * 滑动器组件。
     */
    slider: Slider;

    /**
     * @zh
     * 进度值返回方法 (number => {})
     */
    progressBlock: (value: number) => void = null;

    /**
     * @en
     * The current progress of the slider. The valid value is between 0-1.
     *
     * @zh
     * 当前进度值，该数值的区间是 0-1 之间。
     */
    get progress(): number {
        return this.slider.progress
    }
    set progress(value: number) {
        this.slider.progress = value
    }

    private handleNode: STSpriteNode;
    private onSlideHandler(slider: Slider) {
        if (this.progressBlock) {
            this.progressBlock(slider.progress)
        }
    }

    constructor(name?: string) {
        super(name);
        this.slider = this.addComponent(Slider).getComponent(Slider)
        this.handleNode = new STSpriteNode()
        this.slider.handle = this.handleNode.sprite
        this.slider.node.on("slide", this.onSlideHandler, this);
    }
}