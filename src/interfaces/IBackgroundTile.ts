import IPosition from "./IPosition";

export default interface IBackgroundTile {
    position: IPosition;
    width: number;
    height: number;
    color: string;
    path: IPosition[];
}