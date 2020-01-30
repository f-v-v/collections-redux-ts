import { IUser } from "./user";
import { Ipermissions } from "./permissions";

export interface IUserCollection extends IUser, Ipermissions {
}