import { _decorator, Component, Node, isValid } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('STPopView')
export default class STPopView extends Component {
    /**
     * @zh 隐藏回调块方法
     */
    hideBlock: () => void = null;
    /**
     * @zh 显示
     */
    onShow() {
        this.node.active = true
    }
    /**
     * @zh 隐藏
     */
    onHide() {
        if (isValid(this.node)) {
            this.node.active = false
            if (this.hideBlock) {
                this.hideBlock()
            }
        }

    }
    constructor(name?: string) {
        super(name)
    }
}

