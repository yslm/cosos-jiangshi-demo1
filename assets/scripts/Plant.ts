import { _decorator, Component, Enum, Node } from 'cc';
const { ccclass, property } = _decorator;
import { PlantStateEnum, PlantTypeEnum } from './types/Enums';

//所有植物的基类

@ccclass('Plant')
export class Plant extends Component {
    private plantState: PlantStateEnum = PlantStateEnum.Disable;
    @property({ type: Enum(PlantTypeEnum), tooltip: '植物种类' })
    plantType: PlantTypeEnum;
    coolingTime: number = 0;

    start() {

    }

    update(deltaTime: number) {
        switch (this.plantState) {
            case PlantStateEnum.Disable:
                this.disableUpdate()
                break;
            case PlantStateEnum.Enable:
                this.enableUpdate()
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
}


