import { IFlow } from "../../../../common/models/app/flows";
import { IAppModel } from "../../../../common/models/app/app.model";
import { ContributionObservableHook } from "../../../../common/models/contribution_observable";
import { IFieldDefinition } from "../../../../common/models/contrib";
import { Observable } from "../../../../common/rxjs-extensions";
import { IValidationResult } from "../../../../common/models/validation";
import { AbstractValidationRule, IValidationContext, IValidationRule } from "../../../../common/models/vrules/validationrule";
export declare class TriggerHook implements ContributionObservableHook<IValidationResult> {
    private appContext;
    private flowContext;
    private triggerContext;
    constructor(appContext: IAppModel, flowContext: IFlow, triggerContext: any);
    hook(result: IValidationResult): void;
}
export declare class TriggerFieldsHook implements ContributionObservableHook<IValidationResult> {
    private appContext;
    private flowContext;
    private triggerContext;
    private attribute;
    constructor(appContext: IAppModel, flowContext: IFlow, triggerContext: any, attribute: IFieldDefinition);
    hook(result: IValidationResult): void;
}
export declare class TriggerValidationRule extends AbstractValidationRule implements IValidationRule {
    static newValidationRule(): IValidationRule;
    getContribHook(context: any): any;
    canValidate(context: IValidationContext): boolean;
    getContexts(context: IValidationContext): IValidationContext[];
    start(con: IValidationContext, contribService: any): Observable<IValidationResult>[];
    validate(context: IValidationContext): Observable<IValidationResult>;
    fieldValidation(field: any): Observable<IValidationResult>;
    isVisible(field: IFieldDefinition): boolean;
}
