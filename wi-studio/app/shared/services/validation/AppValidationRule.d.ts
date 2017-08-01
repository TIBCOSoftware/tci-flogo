import { IAppModel } from "../../../../common/models/app/app.model";
import { ContributionObservableHook } from "../../../../common/models/contribution_observable";
import { Observable } from "../../../../common/rxjs-extensions";
import { IValidationResult } from "../../../../common/models/validation";
import { AbstractValidationRule, IValidationContext, IValidationRule } from "../../../../common/models/vrules/validationrule";
export declare class AppHook implements ContributionObservableHook<IValidationResult> {
    private appContext;
    constructor(appContext: IAppModel);
    hook(result: IValidationResult): void;
}
export declare class AppValidationRule extends AbstractValidationRule implements IValidationRule {
    constructor(rules: IValidationRule[]);
    static newValidationRule(inputProvider: any, outputProvider: any, tciService: any): IValidationRule;
    getContexts(context: IValidationContext): IValidationContext[];
    getContribHook(context: IValidationContext): AppHook;
    canValidate(context: IValidationContext): boolean;
    validate(context: IValidationContext): Observable<IValidationResult>;
}
