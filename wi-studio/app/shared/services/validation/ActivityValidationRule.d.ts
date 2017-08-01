import { IFlow } from "../../../../common/models/app/flows";
import { IAppModel } from "../../../../common/models/app/app.model";
import { IFieldDefinition } from "../../../../common/models/contrib";
import { Observable } from "../../../../common/rxjs-extensions";
import { IValidationResult } from "../../../../common/models/validation";
import { AbstractValidationRule, IValidationContext, IValidationRule } from "../../../../common/models/vrules/validationrule";
import { ContributionObservableHook } from "../../../../common/models/contribution_observable";
export declare class ActivityHook implements ContributionObservableHook<IValidationResult> {
    private appContext;
    private flowContext;
    private activityContext;
    constructor(appContext: IAppModel, flowContext: IFlow, activityContext: any);
    hook(result: IValidationResult): void;
}
export declare class ActivityFieldsHook implements ContributionObservableHook<IValidationResult> {
    private appContext;
    private flowContext;
    private activityContext;
    private attribute;
    constructor(appContext: IAppModel, flowContext: IFlow, activityContext: any, attribute?: IFieldDefinition);
    hook(result: IValidationResult): void;
}
export declare class ActivityValidationRule extends AbstractValidationRule implements IValidationRule {
    static newValidationRule(): IValidationRule;
    getContribHook(context: any): any;
    canValidate(context: IValidationContext): boolean;
    getContexts(context: IValidationContext): IValidationContext[];
    private setFlowContext(flow, context);
    start(con: IValidationContext, contribService: any): Observable<IValidationResult>[];
    validate(context: IValidationContext): Observable<IValidationResult>;
    fieldValidation(field: any): Observable<IValidationResult>;
    isVisible(field: IFieldDefinition): boolean;
}
