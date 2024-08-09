import { _decorator, CCInteger, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SunManager')
export class SunManager extends Component {
    private static _instance: SunManager = null;
    @property({ type: CCInteger })
    private sunPointNum: number = 0;

    @property({ type: Label, tooltip: '阳光数量' })
    sunPointLabel: Label = null;
    //单例
    protected onLoad(): void {
        if (!SunManager._instance) {
            SunManager._instance = this;
        } else {
            this.node.destroy();
            return
        }
    }

    protected start(): void {
        this.updateSunPointLabel()
    }
    static get Instance() {
        return this._instance;
    }
    get sunNum() {
        return this.sunPointNum;
    }
    // set sunNum(value: number) {
    //     this.sunPointNum -= value;
    // }
    subSunNum(value: number) {
        console.log('subSunNum', value);
        this.sunPointNum -= value
        this.updateSunPointLabel()

    }
    updateSunPointLabel() {
        this.sunPointLabel.string = this.sunPointNum.toString();
    }
}


