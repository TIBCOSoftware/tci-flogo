import { TCIServices } from "./../TCIServices";
import { ScopedOutputSchemaProvider } from "./../../../mapper/service/map.output.schema.provider";
import { ContextInputSchemaProvider } from "./../../../mapper/service/map.input.schema.provider";
import { IFlow } from "../../../../common/models/app/flows";
import { IAppModel } from "../../../../common/models/app/app.model";
import { Observable } from "../../../../common/rxjs-extensions";
import { IValidationResult } from "../../../../common/models/validation";
import { AbstractValidationRule, IValidationContext, IValidationRule } from "../../../../common/models/vrules/validationrule";
import { ContributionObservableHook } from "../../../../common/models/contribution_observable";
export declare class MapperHook implements ContributionObservableHook<IValidationResult> {
    private appContext;
    private flowContext;
    private activityContext;
    constructor(appContext: IAppModel, flowContext: IFlow, activityContext: any);
    hook(result: IValidationResult): void;
}
export declare class MapperValidationRule extends AbstractValidationRule implements IValidationRule {
    private inputProvider;
    private outputProvider;
    private tciService;
    constructor(inputProvider: ContextInputSchemaProvider, outputProvider: ScopedOutputSchemaProvider, tciService: TCIServices);
    static newValidationRule(inputProvider: any, outputProvider: any, tciService: any): IValidationRule;
    getContribHook(context: IValidationContext): any;
    canValidate(context: IValidationContext): boolean;
    getContexts(context: IValidationContext): IValidationContext[];
    start(con: IValidationContext, contribService: any): Observable<IValidationResult>[];
    getNode(flow: IFlow, taskId: string): any;
    validate(context: IValidationContext): Observable<IValidationResult>;
    handleArrayMapping(mappings: any, parents: any, currentScope: any, context: any, outputSchema: any, result: any): any;
}
