import { Observable } from "../../../../common/rxjs-extensions";
import { AppModel } from "../../../../common/models/app/app.model";
import { IValidationResult } from "../../../../common/models/validation";
import { AbstractValidationRule, IValidationContext, IValidationRule } from "../../../../common/models/vrules/validationrule";
export declare class RestValidationRule extends AbstractValidationRule implements IValidationRule {
    static newValidationRule(): IValidationRule;
    getContribHook(context: IValidationContext): any;
    canValidate(context: IValidationContext): boolean;
    getContexts(context: IValidationContext): IValidationContext[];
    validate(context: IValidationContext): Observable<IValidationResult>;
    extractMethodAndPath(app: AppModel): any[];
    checkForReplyActivity(flow: any): boolean;
}
