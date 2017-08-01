import { IFlowDiagramRootNode } from "./node.model";
import { IFlowDiagramNodeDictionary, IFlowDiagramTaskDictionary } from "./dictionary.model";
export interface IFlowDiagram {
    root: IFlowDiagramRootNode;
    nodes: IFlowDiagramNodeDictionary;
    MAX_ROW_LEN?: number;
}
export declare const DEFAULT_MAX_ROW_LEN = 5;
export declare class FlowDiagramTMP implements IFlowDiagram {
    private tasks;
    private elm;
    private diagramType;
    root: IFlowDiagramRootNode;
    nodes: IFlowDiagramNodeDictionary;
    MAX_ROW_LEN: number;
    static getEmptyDiagram(diagramType?: string): IFlowDiagram;
    constructor(diagram: IFlowDiagram, tasks: IFlowDiagramTaskDictionary, elm?: HTMLElement, diagramType?: string);
    updateDiagram(diagram: IFlowDiagram): Promise<FlowDiagramTMP>;
}
export declare class FlowDiag implements IFlowDiagram {
    root: IFlowDiagramRootNode;
    nodes: IFlowDiagramNodeDictionary;
    MAX_ROW_LEN?: number;
}
