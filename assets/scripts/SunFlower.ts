import { _decorator, animation, CCFloat, Component, find, instantiate, Node, Prefab } from "cc";
import { Plant } from "./Plant";
const { ccclass, property } = _decorator;

@ccclass("SunFlower")
export class SunFlower extends Plant {
    @property(Prefab)
    subPrefab: Prefab;
    @property(CCFloat)
    produceDuration: number = 0;

    private produceTimer: number = 0;
    private deltaTime: number = 0;
    private anim: animation.AnimationController;
    protected onLoad(): void {
        this.anim = this.getComponent(animation.AnimationController);
    }
    update(deltaTime: number) {
        super.update(deltaTime);
        this.deltaTime = deltaTime;
    }
    enableUpdate() {
        // throw new Error('Method not implemented.');
        super.enableUpdate();
        this.produceTimer += this.deltaTime;
        if (this.produceTimer >= this.produceDuration) {
            this.anim.setValue("isGrowing", true);
            this.produceTimer = 0;
        }
    }

    SunBorn(arg) {
        console.log("SunBorn====>", arg);
        let sunNode = instantiate(this.subPrefab);
        sunNode.parent = find("Canvas/ForeGround");
        sunNode.setPosition(this.node.position);
    }
}
