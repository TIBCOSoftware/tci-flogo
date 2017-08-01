import { IFlowDiagramNode, FlowDiagramNode } from "../diagram/node.model";
import { IFlowDiagramTask } from "./task.model";
import { IFlow, Flow } from "./flows";
import { TASK_TYPE } from "../../constants";
export interface IAppModel {
    id: string;
    applicationName: string;
    version: string;
    modelVersion?: VERSION_TYPE;
    description?: string;
    flows?: IFlowDictionary;
    createdTime?: number;
    lastUpdatedTime?: number;
    isPushed?: boolean;
    appChanges?: number;
}
export interface IPostApp {
    app: AppModel;
    skipValidations?: boolean;
}
export declare enum VERSION_TYPE {
    VERSION_100 = 0,
}
export interface IFlowDictionary {
    [id: string]: IFlow;
}
export declare class AppModel implements IAppModel {
    id: string;
    version: string;
    applicationName: string;
    description?: string;
    flows?: IFlowDictionary;
    errorHandler?: IFlowDictionary;
    createdTime?: number;
    lastUpdatedTime?: number;
    modelVersion: VERSION_TYPE;
    isPushed?: boolean;
    appChanges?: number;
    constructor(data: any);
    addFlow(flow: IFlow): void;
    getFlow(id: string): IFlow;
    getFlows(): IFlowDictionary;
    deleteFLow(id: string): AppModel;
    addActivityToFlow(flowId: string, item: IFlowDiagramTask): void;
    addNodeToFlow(flowId: string, node: IFlowDiagramNode): void;
    setRoot(flowId: string, id: string): void;
    deleteActivity(flowId: string, itemId: string, deleteNonBranch?: boolean): AppModel;
    deleteNode(flowId: string, nodeId: string, deleteNonBranch?: boolean): this;
    addActivity(flowId: string, schema: any, activityType: TASK_TYPE, node: FlowDiagramNode, addTaskId?: boolean): string;
    addBranch(flowId: string, parentTaskId: string): string;
    getTaskNode(flowId: string, taskId: string): IFlowDiagramNode;
    getNodeTask(flowId: string, nodeId: string): IFlowDiagramTask;
    cleanNodes(flowId: string): void;
    repairRelations(flowId: string): void;
    addErrorHandler(flowId: string, errorTriggerData: any): IFlow;
    getFlowById(flowId: string): Flow;
}
