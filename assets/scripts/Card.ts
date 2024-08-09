import { _decorator, CCInteger, Component, Node, Sprite } from 'cc';
import { CardStateEnum } from './types/Enums';
import { SunManager } from './manamger/SunManager';
const { ccclass, property } = _decorator;

@ccclass('Card')
export class Card extends Component {
    @property(Node)
    cardLight: Node = null

    @property(Node)
    cardGray: Node = null

    @property(Sprite)
    cardMask: Sprite = null

    @property({ type: CCInteger, tooltip: '卡片冷却时间' })
    cdTime: number = 2
    @property({ type: CCInteger, tooltip: '卡片阳光数量' })
    needSunNum: number = 50

    private cardState: CardStateEnum = CardStateEnum.cooling

    private cdTimer: number = 0


    start() {
        this.cdTimer = this.cdTime
    }

    update(deltaTime: number) {
        switch (this.cardState) {
            case CardStateEnum.cooling:
                this.coolingUpdate(deltaTime)
                break;
            case CardStateEnum.waitingSun:
                this.waitingSunUpdate()
                break;
            case CardStateEnum.ready:
                this.readyUpdate()
                break;


            default:
                break;
        }

    }
    coolingUpdate(dt: number) {
        // console.log("coolingUpdate");

        this.cdTimer -= dt
        // console.log(this.cdTimer);

        this.cardMask.fillRange = -(this.cdTimer / this.cdTime)
        if (this.cdTimer <= 0) {
            this.transform2WaitingSun()
        }

    }
    waitingSunUpdate() {
        // console.log('waitingSunUpdate', this.needSunNum, SunManager.Instance.sunNum);

        if (this.needSunNum <= SunManager.Instance.sunNum) {
            this.transform2Ready()
        }
    }

    readyUpdate() {
        //todo 待实现，
        if (this.needSunNum > SunManager.Instance.sunNum) {
            this.transform2WaitingSun()
        }

    }
    transform2WaitingSun() {
        this.cardState = CardStateEnum.waitingSun
        this.cardMask.node.active = true
        this.cardLight.active = false
        this.cardGray.active = true
    }
    transform2Ready() {
        this.cardState = CardStateEnum.ready
        this.cardMask.node.active = false
        this.cardLight.active = true
        this.cardGray.active = false
    }
    transform2Cooling() {
        this.cardState = CardStateEnum.cooling
        this.cdTimer = this.cdTime
        this.cardMask.node.active = true
        this.cardLight.active = false
        this.cardGray.active = true
    }
    onClick() {
        console.log("onClick");
        //todo,需要减去阳光，并且重新进入冷却状态
        SunManager.Instance.subSunNum(this.needSunNum)
        this.transform2Cooling()
        //所有的card都需要检测状态


    }
}


