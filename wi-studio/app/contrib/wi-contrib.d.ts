export * from "../../common/models/validation";
export * from "../../common/models/contrib";
export * from "../../common/models/connector";
export * from "../../common/models/corsutils";
import { IValidationResult } from "../../common/models/validation";
import { IContribValidationProvider, IContribFieldProvider, IContributionTypes, IWiServiceHandlerContribution, IWiServiceProviderContribution, IServiceContributionType, IBaseServiceContribution, IContribActionProvider, IActionResult } from "../../common/models/contrib";
import { Http } from "@angular/http";
import { Type, Injector } from "@angular/core";
import { Observable } from "../../common/rxjs-extensions";
export declare abstract class AbstractContribValidationProvider implements IContribValidationProvider {
    abstract validate(context: IContributionTypes): IValidationResult | Observable<IValidationResult>;
}
export interface IContribValidationProviderMap {
    field: string;
    useClass: Type<IContribValidationProvider>;
}
export declare abstract class AbstractContribFieldProvider implements IContribFieldProvider {
    abstract getFieldValue(context: IContributionTypes): any | Observable<any>;
}
export interface IContribFieldProviderMap {
    field: string;
    useClass: Type<IContribFieldProvider>;
}
export interface IContribActionProviderMap {
    field: string;
    useClass: Type<IContribActionProvider>;
}
export declare abstract class AbstractActionProvider implements IContribActionProvider {
    abstract handleAction(context: IContributionTypes): any | Observable<any>;
}
export interface WiContribMetaData {
    validationProviders?: IContribValidationProviderMap[];
    fieldProviders?: IContribFieldProviderMap[];
    actionProviders?: IContribActionProviderMap[];
}
export declare abstract class WiServiceContribution implements IBaseServiceContribution {
    private _injector;
    private _http;
    constructor(_injector?: Injector, _http?: Http);
    getType(): IServiceContributionType;
    protected getAnnotations(): WiContribMetaData;
    protected getInjector(): Injector;
    protected getHttp(): Http;
}
export declare abstract class WiServiceProviderContribution extends WiServiceContribution implements IWiServiceProviderContribution {
    constructor(injector?: Injector, http?: Http);
    getFieldProvider(fieldName: string): IContribFieldProvider;
    getValidationProvider(fieldName: string): IContribValidationProvider;
    getActionHandler(fieldName: string): IContribActionProvider;
}
export declare abstract class WiServiceHandlerContribution extends WiServiceContribution implements IWiServiceHandlerContribution {
    constructor(injector?: Injector, http?: Http);
    value: (fieldName: string, context: IContributionTypes) => Observable<any> | any;
    validate: (fieldName: string, context: IContributionTypes) => Observable<IValidationResult> | IValidationResult;
    action?: (actionId: string, context: IContributionTypes) => Observable<IActionResult> | IActionResult;
}
export declare function WiContrib(metadata: WiContribMetaData): (target: Function) => void;
