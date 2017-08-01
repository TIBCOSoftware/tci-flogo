import { IConnection, ICredential, IAppRef } from "../models/connector";
export interface Serializable<T> {
    deserialize(inJson: Object): T;
}
export declare class Connections implements Serializable<Connections> {
    connection: IConnection[];
    deserialize(inJson: any): this;
}
export declare class DeserializeConnection implements Serializable<IConnection> {
    deserialize(inJson: any): IConnection;
}
export declare class DeserializeCredential implements Serializable<ICredential> {
    deserialize(inJson: any): ICredential;
}
export declare class DeserializeFlowRef implements Serializable<IAppRef> {
    deserialize(inJson: any): IAppRef;
}
