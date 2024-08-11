import { _decorator, Component, EventMouse, Node } from 'cc';
import { MouseManager } from './manamger/MouseManager';
import { Plant } from './Plant';
const { ccclass, property } = _decorator;

//cell脚本
@ccclass('Cell')
export class Cell extends Component {
    currentPlantNode: Node;
    protected onLoad(): void {
        this.node.on(Node.EventType.MOUSE_DOWN, this.onClick, this);
        this.node.on(Node.EventType.MOUSE_MOVE, this.onMouseMove, this);

    }
    protected onDestroy(): void {
        this.node.off(Node.EventType.MOUSE_DOWN, this.onClick, this);
        this.node.off(Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
    }

    onClick(e: EventMouse) {
        console.log('card click');

        //把植物种植在这儿
        MouseManager.Instance.onCellClick(this);
    }
    onMouseMove(e: EventMouse) {
        MouseManager.Instance.followCursor(e)
    }
    addPlant(plantNode: Node): boolean {
        if (this.currentPlantNode) {
            return false
        }
        //之前不存在，那么才可以添加上去
        this.currentPlantNode = plantNode
        this.currentPlantNode.setPosition(this.node.position)
        //让动画恢复
        plantNode.getComponent(Plant).transform2Enable()
        return true
    }
}


