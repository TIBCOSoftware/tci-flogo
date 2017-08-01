export interface IManifest {
    name: string;
    description: string;
    version: string;
    type: string;
    volumesFrom?: string[];
    resources: IResources;
    endpoints?: IEndpoint[];
}
export interface IResources {
    physicalMemory: number;
    totalMemory: number;
    cpuQuota: number;
}
export interface IEndpoint {
    name?: string;
    pingable?: boolean;
    protocol: string;
    port: string;
    ping?: string;
    type?: string;
    spec?: ISpec;
    swagger?: any;
}
export interface ISpec {
    name: string;
    version: string;
}
