import { _decorator, Animation, animation, Component, Enum } from "cc";
const { ccclass, property } = _decorator;
import { PlantStateEnum, PlantTypeEnum } from "./types/Enums";

//所有植物的基类

@ccclass("Plant")
export class Plant extends Component {
    private plantState: PlantStateEnum = PlantStateEnum.Disable;
    @property({ type: Enum(PlantTypeEnum), tooltip: "植物种类" })
    plantType: PlantTypeEnum;
    coolingTime: number = 0;

    start() {
        // this.plantState = PlantStateEnum.Disable
        this.transform2Disable();
    }

    update(deltaTime: number) {
        switch (this.plantState) {
            case PlantStateEnum.Disable:
                this.disableUpdate();
                break;
            case PlantStateEnum.Enable:
                this.enableUpdate();
                break;

            default:
                break;
        }
    }
    enableUpdate() {
        // throw new Error('Method not implemented.');
    }
    disableUpdate() {
        // throw new Error('Method not implemented.');
    }
    transform2Enable() {
        this.plantState = PlantStateEnum.Enable;
        if (this.node.getComponent(animation.AnimationController)) {
            this.node.getComponent(animation.AnimationController).enabled = true;
        } else if (this.node.getComponent(Animation)) {
            this.node.getComponent(Animation).enabled = true;
        }
    }
    transform2Disable() {
        this.plantState = PlantStateEnum.Disable;
        // this.node.getComponent(animation.AnimationController).enabled = false;
        if (this.node.getComponent(animation.AnimationController)) {
            this.node.getComponent(animation.AnimationController).enabled = false;
        } else if (this.node.getComponent(Animation)) {
            this.node.getComponent(Animation).enabled = false;
        }
    }
}
