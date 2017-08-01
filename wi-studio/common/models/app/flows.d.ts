import { IFlowDiagram } from "../diagram/diagram.model";
import { IFlowDiagramTaskDictionary, IConnectionDictionary } from "../diagram/dictionary.model";
import { STRING_MAP } from "../../index";
export interface IFlow {
    description: string;
    errorHandler: STRING_MAP<IFlow>;
    items: IFlowDiagramTaskDictionary;
    name: string;
    paths: IFlowDiagram;
    _id: string;
    connections: IConnectionDictionary;
}
export interface HandlerInfo {
    diagram: IFlowDiagram;
    tasks: IFlowDiagramTaskDictionary;
}
export declare class Flow {
    description: string;
    errorHandler: STRING_MAP<IFlow>;
    items: IFlowDiagramTaskDictionary;
    name: string;
    paths: IFlowDiagram;
    _id: string;
    connections: IConnectionDictionary;
    constructor(name: string, description: string);
}
