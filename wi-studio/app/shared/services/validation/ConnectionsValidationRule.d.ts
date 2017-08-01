import { Observable } from "../../../../common/rxjs-extensions";
import { IValidationResult } from "../../../../common/models/validation";
import { AbstractValidationRule, IValidationContext, IValidationRule } from "../../../../common/models/vrules/validationrule";
export declare class ConnectionsValidationRule extends AbstractValidationRule implements IValidationRule {
    static newValidationRule(): IValidationRule;
    getContribHook(context: IValidationContext): any;
    getContexts(context: IValidationContext): IValidationContext[];
    canValidate(context: IValidationContext): boolean;
    validate(context: IValidationContext): Observable<IValidationResult>;
}
