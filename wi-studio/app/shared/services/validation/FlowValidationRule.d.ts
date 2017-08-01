import { IAppModel } from "../../../../common/models/app/app.model";
import { IFlow } from "../../../../common/models/app/flows";
import { ContributionObservableHook } from "../../../../common/models/contribution_observable";
import { Observable } from "../../../../common/rxjs-extensions";
import { IValidationResult } from "../../../../common/models/validation";
import { AbstractValidationRule, IValidationContext, IValidationRule } from "../../../../common/models/vrules/validationrule";
export declare class FlowHook implements ContributionObservableHook<IValidationResult> {
    private appContext;
    private flowContext;
    constructor(appContext: IAppModel, flowContext: IFlow);
    hook(result: IValidationResult): void;
}
export declare class FlowValidationRule extends AbstractValidationRule implements IValidationRule {
    static newValidationRule(): IValidationRule;
    getContribHook(context: IValidationContext): FlowHook;
    getContexts(context: IValidationContext): IValidationContext[];
    canValidate(context: IValidationContext): boolean;
    validate(context: IValidationContext): Observable<IValidationResult>;
}
