import { IValidationResult } from "../validation";
import { Observable } from "../../../common/rxjs-extensions";
import { ContributionObservableHook } from "../contribution_observable";
import { EnumValidationContext } from "../../constants";
import { ENUM_MAP } from "../../types";
export interface IValidationContext {
    getElements(ectx: EnumValidationContext): any;
    addElement(ectx: EnumValidationContext, context: any): void;
}
export declare class ValidationContext implements IValidationContext {
    elements: ENUM_MAP<EnumValidationContext, any>;
    static newContext(): IValidationContext;
    constructor(elements?: ENUM_MAP<EnumValidationContext, any>);
    addElement(ectx: EnumValidationContext, context: any): void;
    getElements(ectx: EnumValidationContext): any;
}
export interface IValidationRule {
    canValidate(context: IValidationContext): boolean;
    start(context: IValidationContext, contribService: any): Observable<IValidationResult>[];
    validate(context: IValidationContext): Observable<IValidationResult>;
}
export declare abstract class AbstractValidationRule implements IValidationRule {
    validationObservables: Observable<IValidationResult>[];
    rules: IValidationRule[];
    constructor(rules?: IValidationRule[]);
    start(con: IValidationContext, contribService: any): Observable<IValidationResult>[];
    canValidate(context: IValidationContext): boolean;
    abstract getContexts(context: IValidationContext): IValidationContext[];
    abstract validate(context: IValidationContext): Observable<IValidationResult>;
    abstract getContribHook(context: IValidationContext): ContributionObservableHook<IValidationResult>;
}
