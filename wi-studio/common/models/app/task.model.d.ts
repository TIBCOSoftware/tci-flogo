import { IMapping } from "../mapper/map-model";
import { TASK_TYPE } from "../../constants";
import { IActivityContribution, ITriggerContribution, IContributionDisplay, IFieldDefinition, IHandlerDefinition } from "../contrib";
export interface IFlowDiagramTask extends IActivityContribution, ITriggerContribution {
    id: string;
    type: string;
    title: string;
    description?: string;
    activityType?: string;
    triggerType?: string;
    inputMappings?: IMapping;
    tasks?: IFlowDiagramTask[];
    condition?: string;
    handler: IHandlerDefinition;
    settings: IFieldDefinition[];
    inputs: IFieldDefinition[];
    outputs: IFieldDefinition[];
    taskType: TASK_TYPE;
    display?: IContributionDisplay;
    s3Prefix?: string;
}
export declare class FlowDiagramTask implements IFlowDiagramTask {
    id: string;
    type: string;
    version: string;
    name: string;
    description: string;
    title: string;
    activityType: string;
    triggerType: string;
    inputMappings: IMapping;
    tasks: IFlowDiagramTask[];
    settings: IFieldDefinition[];
    inputs: IFieldDefinition[];
    outputs: IFieldDefinition[];
    handler: IHandlerDefinition;
    ref: string;
    taskType: TASK_TYPE;
    display: IContributionDisplay;
    s3Prefix: string;
    static genTaskID(): string;
    constructor(task?: any);
    getField(name: string): IFieldDefinition;
    update(task: any): void;
}
