import { IValidationResult, IValidationError } from "./validation";
import { Observable } from "../../common/rxjs-extensions";
export declare const CONTRIBUTION_TYPE: {
    trigger: "trigger";
    activity: "activity";
    connector: "connector";
    function: "function";
};
export declare type CONTRIBUTION_TYPE = keyof typeof CONTRIBUTION_TYPE;
export declare class ContributionTypeConverter {
    static fromString(val: string): CONTRIBUTION_TYPE;
    static toString(ctype: CONTRIBUTION_TYPE): string;
}
export declare type MODULE_CONTRIBUTION<T> = {
    name: string;
    type: CONTRIBUTION_TYPE;
    route: string;
    routePath: string;
    files: string[];
    service: T;
};
export declare type FUNCTION_CONTRIBUTION<T> = {
    name: string;
    category: string;
    type: CONTRIBUTION_TYPE;
    function: T;
};
export declare type CONTRIBUTION_LOAD_RESULT = {
    status: string;
    data: any;
};
export interface IContributionContext {
    changelist?: string[];
    appId?: string;
}
export declare const DisplayFieldType: {
    connection: "connection";
    dropdown: "dropdown";
    table: "table";
    texteditor: "texteditor";
    fileselector: "fileselector";
    connectiondata: "connectiondata";
    button: "button";
    params: "params";
};
export declare type DisplayFieldType = keyof typeof DisplayFieldType;
export declare const ButtonType: {
    button: "button";
    submit: "submit";
    reset: "reset";
};
export declare type ButtonType = keyof typeof ButtonType;
export declare const ButtonStyle: {
    default: "default";
    primary: "primary";
    success: "success";
    info: "info";
    warning: "warning";
    danger: "danger";
};
export declare type ButtonStyle = keyof typeof ButtonStyle;
export interface IFieldDisplay {
    name: string;
    type?: DisplayFieldType;
    fileExtensions?: string[];
    mappable?: boolean;
    syntax?: string;
    schema?: string;
    visible?: boolean;
    buttonType?: ButtonType;
    buttonStyle?: ButtonStyle;
    readonly?: boolean;
    valid?: boolean;
    uri?: string;
}
export declare const FieldType: {
    boolean: "boolean";
    number: "number";
    string: "string";
    complex_object: "complex_object";
};
export declare type FieldType = keyof typeof FieldType;
export interface IFieldDefinition {
    name: string;
    type: FieldType;
    value?: any;
    required?: boolean;
    allowed?: string[];
    section?: string;
    description: string;
    display?: IFieldDisplay;
}
export interface IContributionDisplay {
    name: string;
    category: string;
    visible?: boolean;
    smallIcon?: string;
    largeIcon?: string;
    description: string;
    sections?: string[];
}
export declare const DEFAULT_CONTRIBUTION_CATEGORY = "General";
export interface IHandlerDefinition {
    settings: IFieldDefinition[];
}
export interface ITriggerContribution extends IContributionContext {
    name: string;
    title: string;
    version: string;
    type: string;
    ref: string;
    display?: IContributionDisplay;
    settings: IFieldDefinition[];
    handler: IHandlerDefinition;
    outputs: IFieldDefinition[];
    getField(name: string): IFieldDefinition;
}
export interface IActivityContribution extends IContributionContext {
    name: string;
    title: string;
    version: string;
    type: string;
    ref: string;
    display?: IContributionDisplay;
    inputs: IFieldDefinition[];
    outputs: IFieldDefinition[];
    getField(name: string): IFieldDefinition;
}
export interface IActionDefinition {
    name: string;
    display?: IFieldDisplay;
}
export interface IConnectorContribution extends IContributionContext {
    name: string;
    title: string;
    version: string;
    type: string;
    ref: string;
    display?: IContributionDisplay;
    settings: IFieldDefinition[];
    actions: IActionDefinition[];
}
export interface IFunctionArgs {
    name: string;
    type: string;
}
export interface IFunctionContribution {
    name: string;
    category?: string;
    args: IFunctionArgs[];
    return: string;
}
export declare type IContributionTypes = IContributionContext | ITriggerContribution | IActivityContribution | IConnectorContribution;
export interface IContribValidationProvider {
    validate(context: IContributionTypes): IValidationResult | Observable<IValidationResult>;
}
export interface IContribFieldProvider {
    getFieldValue(context: IContributionTypes): any | Observable<any>;
}
export interface IContribActionProvider {
    handleAction(context: IContributionTypes): any | Observable<any>;
}
export interface IContributionHandler {
    value: (fieldName: string, context: IContributionTypes) => Observable<any> | any;
    validate: (fieldName: string, context: IContributionTypes) => Observable<IValidationResult> | IValidationResult;
    action?: (actionId: string, context: IContributionTypes) => Observable<IActionResult> | IActionResult;
}
export interface IActionResult {
    success: boolean;
    result: IValidationError | any;
    isSuccess(): boolean;
    setSuccess(state: boolean): IActionResult;
    setResult(data: IValidationError | any): IActionResult;
    getResult(): IValidationError | any;
}
export declare class ActionResult implements IActionResult {
    success: boolean;
    result: IValidationError | any;
    static newActionResult(data?: IValidationError | any): IActionResult;
    private constructor(result?);
    isSuccess(): boolean;
    setSuccess(state: boolean): IActionResult;
    setResult(result?: IValidationError | any): IActionResult;
    getResult(): any;
}
export declare const IServiceContributionType: {
    Provider: "Provider";
    Handler: "Handler";
};
export declare type IServiceContributionType = keyof typeof IServiceContributionType;
export interface IBaseServiceContribution {
    getType(): IServiceContributionType;
}
export interface IWiServiceProviderContribution extends IBaseServiceContribution {
    getFieldProvider(fieldName: string): IContribFieldProvider;
    getValidationProvider(fieldName: string): IContribValidationProvider;
    getActionHandler(fieldName: string): IContribActionProvider;
}
export interface IWiServiceHandlerContribution extends IBaseServiceContribution, IContributionHandler {
}
export interface IWiServiceContribution extends IWiServiceHandlerContribution, IWiServiceProviderContribution {
}
