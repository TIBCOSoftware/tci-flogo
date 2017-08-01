import { IFlow } from "../../../../common/models/app/flows";
import { IAppModel } from "../../../../common/models/app/app.model";
import { IFlowDiagramNode } from "../../../../common/models/diagram/node.model";
import { Observable } from "../../../../common/rxjs-extensions";
import { IValidationResult } from "../../../../common/models/validation";
import { AbstractValidationRule, IValidationContext, IValidationRule } from "../../../../common/models/vrules/validationrule";
import { ContributionObservableHook } from "../../../../common/models/contribution_observable";
export declare class NodeHook implements ContributionObservableHook<IValidationResult> {
    private appContext;
    private flowContext;
    private nodeContext;
    constructor(appContext: IAppModel, flowContext: IFlow, nodeContext: IFlowDiagramNode);
    hook(result: IValidationResult): void;
}
export declare class NodeValidationRule extends AbstractValidationRule implements IValidationRule {
    static newValidationRule(): IValidationRule;
    getContribHook(context: IValidationContext): any;
    canValidate(context: IValidationContext): boolean;
    getContexts(context: IValidationContext): IValidationContext[];
    start(con: IValidationContext, contribService: any): Observable<IValidationResult>[];
    validate(context: IValidationContext): Observable<IValidationResult>;
    getFlowContext(mainFlow: IFlow, flow: IFlow, context: IValidationContext): IValidationContext[];
}
