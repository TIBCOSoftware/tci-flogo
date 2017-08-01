import { IFlowDiagram } from "./diagram.model";
import { FLOW_DIAGRAM_NODE_TYPE } from "../../constants";
export interface IFlowDiagramNode {
    id: string;
    taskID?: string;
    type: FLOW_DIAGRAM_NODE_TYPE;
    children: string[];
    parents: string[];
    subProc: IFlowDiagram[];
}
export interface IFlowDiagramRootNode {
    is: string;
}
export declare class FlowDiagramNode implements IFlowDiagramNode {
    id: string;
    taskID: string;
    type: FLOW_DIAGRAM_NODE_TYPE;
    children: string[];
    parents: string[];
    subProc: IFlowDiagram[];
    constructor(node?: IFlowDiagramNode);
    update(node: IFlowDiagramNode): Promise<FlowDiagramNode>;
    linkToParents(nodeIDs: string[]): Promise<boolean>;
    linkToChildren(nodeIDs: string[]): Promise<boolean>;
    static genNodeID(): string;
}
