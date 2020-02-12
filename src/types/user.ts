export interface IIdUser {
    id: number;
}
export interface IUser_{
    name: string;
}
export interface IUser extends IIdUser, IUser_ {
}