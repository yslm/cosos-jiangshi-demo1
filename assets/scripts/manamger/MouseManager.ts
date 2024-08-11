import { _decorator, Component, EventMouse, find, input, Input, instantiate, Node, Prefab, Vec3 } from 'cc';
import { PlantTypeEnum } from '../types/Enums';
// import { Plant } from '../Plant';
import { Cell } from '../Cell';
import { Card } from '../Card';
import { Plant } from '../Plant';
const { ccclass, property } = _decorator;

//所有的鼠标点击管理类，单利
@ccclass('MouseManager')
export class MouseManager extends Component {
    @property([Prefab])
    plantPrefabs: Prefab[] = [];

    private static _instance: MouseManager = null;
    private currentPlantNode: Node

    //单例
    protected onLoad(): void {
        if (!MouseManager._instance) {
            MouseManager._instance = this;
        } else {
            this.node.destroy();
            return
        }
        input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this)

    }
    protected onDestroy(): void {
        input.off(Input.EventType.MOUSE_MOVE, this.onMouseMove, this)

    }

    onMouseMove(e: EventMouse) {

        this.followCursor(e)

    }
    followCursor(e: EventMouse) {
        if (this.currentPlantNode) {
            let pos = e.getUILocation()
            let worldPos = new Vec3(pos.x, pos.y, 0)
            this.currentPlantNode.setWorldPosition(worldPos)
        }
    }

    static get Instance() {
        return this._instance;
    }

    addPlant(plantType: PlantTypeEnum, e: EventMouse): boolean {
        if (this.currentPlantNode) {
            return false
        }
        let plantNode = this.getPlantPrefab(plantType)
        if (plantNode) {
            this.currentPlantNode = plantNode
            this.currentPlantNode.parent = find('Canvas/GameWrap')
            // plantNode.parent = find('Canvas/GameWrap')
            // this.currentPlantNode = instantiate(plantPrefab)
            // this.currentPlantNode.parent = this.node.parent
            let pos = this.currentPlantNode.getPosition()
            //初始设置一个很远的位置
            // this.currentPlantNode.setPosition(pos.x - 1000, pos.y - 1000, 0)
            this.followCursor(e)
            return true
        } else {
            console.log('没有这个植物');
            return false
        }
    }
    getPlantPrefab(plantType: PlantTypeEnum): Node {
        for (let plantPrefab of this.plantPrefabs) {
            let node = instantiate(plantPrefab)
            if (node.getComponent(Plant).plantType == plantType) {
                return node;
            } else {
                node.destroy()
            }
        }
    }
    onCellClick(cell: Cell) {
        if (!this.currentPlantNode) {
            return
        }
        //这儿还需要防止在一个地方重复种植，在cell脚本里面做判断
        //设置植物的位置
        // this.currentPlantNode.setPosition(cell.node.position)
        let flag = cell.addPlant(this.currentPlantNode)
        //如果种植成功，才能释放当前植物
        if (flag) {
            this.currentPlantNode = null
        }

    }
}


