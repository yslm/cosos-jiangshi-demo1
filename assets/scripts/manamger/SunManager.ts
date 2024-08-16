import { _decorator, CCInteger, Component, find, instantiate, Label, Node, Prefab, randomRange, Vec3 } from "cc";
import { Sun } from "../Sun";
const { ccclass, property } = _decorator;

@ccclass("SunManager")
export class SunManager extends Component {
    private static _instance: SunManager = null;
    @property({ type: CCInteger })
    private sunPointNum: number = 0;

    @property({ type: Label, tooltip: "阳光数量" })
    sunPointLabel: Label = null;

    @property(Prefab)
    subPrefab: Prefab = null;
    //单例
    protected onLoad(): void {
        if (!SunManager._instance) {
            SunManager._instance = this;
        } else {
            this.node.destroy();
            return;
        }
    }

    protected start(): void {
        this.updateSunPointLabel();
        this.schedule(() => {
            this.produceNatureSun();
        }, 4);
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
        console.log("subSunNum", value);
        this.sunPointNum -= value;
        if (this.sunPointNum <= 0) {
            this.sunPointNum = 0;
        }
        this.updateSunPointLabel();
    }
    addSunNum(value: number) {
        this.sunPointNum += value;
        this.updateSunPointLabel();
    }
    //生产自然阳光
    produceNatureSun() {
        // this.addSunNum(50);
        let sunNode = instantiate(this.subPrefab);
        sunNode.parent = find("Canvas/ForeGround");
        sunNode.setPosition(new Vec3(randomRange(-400, 380), 410, 0));
        sunNode.getComponent(Sun).sunDrop();
    }
    updateSunPointLabel() {
        this.sunPointLabel.string = this.sunPointNum.toString();
    }
}
