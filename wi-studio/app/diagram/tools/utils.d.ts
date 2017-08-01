import { IFlowDiagramNodeDictionary, IFlowDiagramTaskDictionary } from "../../../common/models/diagram/dictionary.model";
export declare function IDEncode(id: string): string;
export declare function IDDecode(encodedId: string): string;
export declare function GenTaskID(items?: any): string;
export declare function GenBranchID(): string;
export declare function GenTriggerID(): string;
export declare function activitySchemaToTask(schema: any): any;
export declare function activitySchemaToTrigger(schema: any): any;
export declare function genBranchArrow(opts?: any): string;
export declare function genBranchLine(opts?: any): any;
export declare function normalizeTaskName(taskName: string): string;
export declare function parseMapping(automapping: string): {
    autoMap: string;
    isRoot: boolean;
    taskId: string;
    attributeName: string;
    path: string;
};
export declare function updateFlogoGlobalConfig(config: any): void;
export declare function resetFlogoGlobalConfig(): void;
export declare function formatServerConfiguration(config: any): {
    db: {
        protocol: any;
        host: any;
        port: any;
        name: any;
        label: any;
    };
    activities: {
        protocol: any;
        host: any;
        port: any;
        testPath: any;
        label: any;
        db: {
            port: any;
            name: any;
        };
    };
    triggers: {
        protocol: any;
        host: any;
        port: any;
        testPath: any;
        label: any;
        db: {
            port: any;
            name: any;
        };
    };
    engine: {
        protocol: any;
        host: any;
        port: any;
        testPath: any;
    };
    stateServer: {
        protocol: any;
        host: any;
        port: any;
        testPath: any;
    };
    flowServer: {
        protocol: any;
        host: any;
        port: any;
        testPath: any;
    };
};
export declare function getFlogoGlobalConfig(): any;
export declare function getURL(config: {
    protocol?: string;
    host?: string;
    port?: string;
}): string;
export declare function getDBURL(dbConfig: {
    port: string;
    protocol: string;
    host: string;
    name: string;
}): string;
export declare function copyToClipboard(element: HTMLElement): boolean;
export declare function notification(message: string, type: string, time?: number, settings?: any): Promise<{}>;
export declare function attributeTypeToString(inType: any): string;
export declare function updateBranchNodesRunStatus(nodes: IFlowDiagramNodeDictionary, tasks: IFlowDiagramTaskDictionary): void;
