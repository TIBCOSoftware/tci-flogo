import { IFlowDiagramTask } from "../app/task.model";
import { IFlowDiagramNode } from "./node.model";
import { IConnection } from "../connector";
export interface IFlowDiagramTaskDictionary {
    [index: string]: IFlowDiagramTask;
}
export interface IFlowDiagramNodeDictionary {
    [index: string]: IFlowDiagramNode;
}
export interface IConnectionDictionary {
    [index: string]: IConnection;
}
