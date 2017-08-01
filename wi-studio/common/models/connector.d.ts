import { IConnectorContribution } from "./contrib";
export declare const AUTHENTICATION_TYPE: {
    BASIC: "BASIC";
    OAUTH1: "OAUTH1";
    OAUTH2: "OAUTH2";
    OAUTH2_TWOLEG: "OAUTH2_TWOLEG";
};
export declare type AUTHENTICATION_TYPE = keyof typeof AUTHENTICATION_TYPE;
export interface OAuth2Connection {
    user?: string;
    id?: string;
    category: string;
    name: string;
    description?: string;
    credential: {
        authType: string;
        auth_code?: string;
        token_endpoint?: string;
        auth_endpoint?: string;
        client_id?: string;
        client_secret?: string;
        [propName: string]: any;
    };
    appRefs?: IAppRef[];
    createdTime?: number;
    lastUpdatedTime?: number;
}
export interface OAuth2TwoLegConnection {
    user?: string;
    id?: string;
    category: string;
    name: string;
    description?: string;
    credential: {
        authType: string;
        client_id?: string;
        client_secret?: string;
        token_endpoint?: string;
        auth_endpoint?: string;
        [propName: string]: any;
    };
    appRefs?: IAppRef[];
    createdTime?: number;
    lastUpdatedTime?: number;
}
export interface BasicConnection {
    user?: string;
    id?: string;
    category: string;
    name: string;
    description?: string;
    credential: {
        authType: string;
        user?: string;
        password?: string;
        url?: string;
        [propName: string]: any;
    };
    appRefs?: IAppRef[];
    createdTime?: number;
    lastUpdatedTime?: number;
}
export interface IConnection {
    user?: string;
    id?: string;
    category: string;
    name: string;
    description?: string;
    credential: ICredential;
    appRefs?: IAppRef[];
    createdTime?: number;
    lastUpdatedTime?: number;
}
export interface ICredential {
    authType: string;
    user?: string;
    password?: string;
    url?: string;
    client_id?: string;
    client_secret?: string;
    auth_code?: string;
    token_endpoint?: string;
    auth_endpoint?: string;
    [propName: string]: any;
}
export interface IAppRef {
    appId: string;
    appName: string;
    count: number;
}
export interface ISalesforceoAuth {
    authorizationUrl: string;
    callbackUrl: string;
}
export declare class ConnectorUtils {
    static getConnections(connector_type?: string): IConnectorContribution[];
    static getConnection(connection_name: string): IConnectorContribution;
    static saveConnection(config: IConnectorContribution): void;
}
