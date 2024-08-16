import { _decorator, CCInteger, Component, Node, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Bullet")
export class Bullet extends Component {
    @property(CCInteger)
    speed: number = 100;

    protected update(dt: number): void {
        // let pos = this.node.position.add(Vec3.RIGHT.multiplyScalar(this.speed * dt));
        // this.node.setPosition(pos);
        // console.log(this.node);
    }
    protected start(): void {
        let pos = this.node.position.add(Vec3.RIGHT.multiplyScalar(this.speed * 0.002));
        this.node.setPosition(pos);
    }
}
