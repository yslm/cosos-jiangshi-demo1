//全局枚举

//卡片状态
export enum CardStateEnum {
    cooling, //冷却
    waitingSun, //等待太阳
    ready //准备完毕
}


export enum PlantStateEnum {
    Disable, //等待太阳
    Enable //准备完毕
}

export enum PlantTypeEnum {
    Peashooter, //豌豆射手
    Sunflower, //太阳花
    Wallnut, //坚果墙
    Chomper, //卷心菜
    CherryBomb, //樱桃炸弹
    PotatoMine, //土豆雷
    SnowPea, //寒冰射手
    Repeater, //双发射手
    ThreePeater, //三连射手
}