import { IAppModel } from "../models/app";
import { IFlow } from "../models/app";
import { STRING_MAP } from "../types";
export interface IRTApp {
    name: string;
    version: string;
    description: string;
    type: string;
    triggers: IRTTriggerInfo[];
    actions: IRTFlow[];
}
export interface IRTTriggerInfo {
    id: string;
    ref: string;
    settings: STRING_MAP<any>;
    handlers: IRTTriggerHandler[];
}
export interface IRTTriggerHandler {
    actionId: string;
    settings: STRING_MAP<any>;
    outputs: STRING_MAP<any>;
}
export interface IRTFlow {
    id: string;
    ref: string;
    data: IRTFlowDefinition;
}
export interface IRTFlowDefinition {
    flow: IRTFlowInfo;
}
export interface IRTFlowInfo {
    type: number;
    name: string;
    model: string;
    ref: string;
    attributes: IRTAttributes[];
    rootTask: IRTRootTask;
    errorHandlerTask?: IRTRootTask;
    explicitReply?: boolean;
}
export interface IRTAttributes {
    name: string;
    type: string;
    value: any;
}
export interface IRTRootTask {
    id: number;
    type: number;
    activityType: string;
    name: string;
    tasks: IRTTask[];
    links: IRTLink[];
}
export interface IRTTask {
    id: number;
    type: number;
    activityType: string;
    activityRef: string;
    name?: string;
    attributes: IRTAttributes[];
    inputMappings?: IRTMapping[];
    outputs: STRING_MAP<any>;
}
export interface IRTLink {
    id: number;
    type: number;
    from: number;
    to: number;
    name?: string;
    value?: any;
}
export interface IRTMapping {
    type?: number | string;
    value?: string;
    mapTo?: string;
    from?: string;
    to?: string;
    fields?: IRTMapping[];
}
export declare class CUIApp {
    static isJson(value: any): boolean;
    static triggerFlowToJSON(uiFlow: IFlow): IRTTriggerInfo;
    static flogoFlowToJSON(uiFlow: IFlow): IRTFlow;
    static uiModelToRtModel(uiApp: IAppModel): IRTApp;
}
