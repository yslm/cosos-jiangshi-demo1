import { _decorator, CCInteger, Component, Node, randomRange, tween, UITransform, v3, Vec3 } from "cc";
import { SunManager } from "./manamger/SunManager";
const { ccclass, property } = _decorator;

@ccclass("Sun")
export class Sun extends Component {
    @property(CCInteger)
    sunPoint: number = 50;

    private isClicked: boolean = false;
    protected start(): void {
        this.node.on(Node.EventType.TOUCH_START, this.touchStart, this);
    }
    touchStart() {
        //先加分
        if (this.isClicked) {
            return;
        }
        this.isClicked = true;

        /**
         * 然后移动到分数所在的节点位置
         * 需要获取到目标的位置，并且需要进行坐标系转换，分两步
         * 1，获取目标的世界坐标位置
         * 2，将目标的世界坐标位置转换为当前节点所在的父节点的本地坐标系
         */

        //测试了下,发现下面两种方式都可以实现
        //方式1
        // let targetWorldPos = SunManager.Instance.sunPointLabel.node.getWorldPosition();
        // tween(this.node).to(1, { worldPosition: targetWorldPos }, { easing: "sineOut" }).start();
        //方式2
        let targetWorldPos = SunManager.Instance.sunPointLabel.node.getComponent(UITransform).convertToWorldSpaceAR(v3(0, 0, 0));
        let targetLocalPos = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(targetWorldPos);
        //然后做缓动
        tween(this.node)
            .to(1, { position: targetLocalPos }, { easing: "sineOut" })
            .call(() => {
                SunManager.Instance.addSunNum(this.sunPoint);
                this.node.destroy();
                this.isClicked = false;
            })
            .start();
    }
    protected onDestroy(): void {
        this.node.off(Node.EventType.TOUCH_START, this.touchStart, this);
    }
    //阳光跳跃移动
    jumpTo() {
        let startPos = this.node.getPosition();
        let middlePos = startPos.clone().add(new Vec3(0, randomRange(20, 70), 0));
        let targetPos = startPos.clone().add(new Vec3(randomRange(-70, 70), 0, 0));
        tween(this.node).to(0.5, { position: middlePos }, { easing: "sineOut" }).to(0.5, { position: targetPos }, { easing: "sineIn" }).start();
    }
    //阳光自由下坠
    sunDrop() {
        let posX = this.node.position.x;
        tween(this.node)
            .to(5, { position: v3(posX, randomRange(205, -280), 0) }, { easing: "linear" })
            .call(() => {
                //如果到底了，没有点击，那么就消失
                this.scheduleOnce(() => {
                    this.node.destroy();
                }, 2);
            })
            .start();
    }
}
