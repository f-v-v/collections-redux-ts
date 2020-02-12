export interface IIdCollection {
    id: number;
}
export interface ICollection_ {
    name: string;
    type: number;
    questions: number;
    active:boolean;
}
export interface ICollection extends IIdCollection, ICollection_ {
}