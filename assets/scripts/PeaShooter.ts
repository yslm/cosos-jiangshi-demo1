import { _decorator, CCInteger, Component, Node } from "cc";
import { Plant } from "./Plant";
const { ccclass, property } = _decorator;

@ccclass("PeaShooter")
export class PeaShooter extends Plant {
    @property(CCInteger)
    shootDuration: number = 2;

    private shootTimer: number = 0;
    enableUpdate(): void {
        super.enableUpdate();
        if (this.shootTimer >= this.shootDuration) {
            this.shootTimer = 0;
            this.shoot();
        }
    }
    update(deltaTime: number): void {
        super.update(deltaTime);
        this.shootTimer += deltaTime;
    }
    shoot() {
        console.log("发射");
    }
}
