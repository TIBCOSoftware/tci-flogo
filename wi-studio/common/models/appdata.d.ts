export interface AppData {
    user?: string;
    id?: string;
    applicationName: string;
    description?: string;
    flows?: FlowData[];
    timeCreated?: string;
    timeModified?: string;
}
export interface FlowData {
    user?: string;
    id?: string;
    appId?: string;
    applicationName?: string;
    version?: string;
    description?: string;
    uiFlow: any;
    createdTime?: number;
    lastUpdatedTime?: number;
}
