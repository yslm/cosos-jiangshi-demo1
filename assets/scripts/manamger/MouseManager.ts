import { _decorator, Component, EventMouse, input, Input, instantiate, Node, Vec3 } from 'cc';
import { PlantTypeEnum } from '../types/Enums';
import { Plant } from '../Plant';
const { ccclass, property } = _decorator;

//所有的鼠标点击管理类，单利
@ccclass('MouseManager')
export class MouseManager extends Component {
    @property([Plant])
    plantPrefabs: Plant[] = [];

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

    onMouseMove(e: EventMouse) {

        if (this.currentPlantNode) {
            let pos = e.getUILocation()
            let worldPos = new Vec3(pos.x, pos.y, 0)
            this.currentPlantNode.setWorldPosition(worldPos)
        }

    }

    static get Instance() {
        return this._instance;
    }

    addPlant(plantType: PlantTypeEnum): boolean {
        if (this.currentPlantNode) {
            return false
        }
        let plantPrefab = this.getPlantPrefab(plantType)
        if (plantPrefab) {
            this.currentPlantNode = instantiate(plantPrefab.node)
            this.currentPlantNode.parent = this.node.parent
            let pos = this.currentPlantNode.getPosition()
            this.currentPlantNode.setPosition(pos.x + 100, pos.y - 100, 0)
            return true
        } else {
            console.log('没有这个植物');
            return false
        }
    }
    getPlantPrefab(plantType: PlantTypeEnum) {
        for (let plant of this.plantPrefabs) {
            if (plant.plantType == plantType) {
                return plant;
            }
        }
    }
}


