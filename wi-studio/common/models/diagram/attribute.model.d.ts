import { TASK_ATTRIBUTE_TYPE } from "../../constants";
export interface IFlowDiagramTaskAttribute {
    name: string;
    type: TASK_ATTRIBUTE_TYPE;
    value: string;
    title?: string;
    description?: string;
    placeholder?: string;
    required?: boolean;
    validation?: "";
    validationMessage?: "";
    relatedTo?: "";
    child?: IFlowDiagramTaskAttribute[];
    wi?: any;
}
export interface IFlowDiagramTaskAttributes {
    inputs?: IFlowDiagramTaskAttribute[];
    outputs?: IFlowDiagramTaskAttribute[];
}
