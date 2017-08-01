import { IFlow } from "../app/flows";
import { Observable } from "rxjs/Observable";
import { IFunctionArgs, IFunctionContribution } from "../contrib";
import { STRING_MAP } from "../../types";
import { IAppModel } from "../index";
import { IMessaging } from "../../services/messaging";
export interface IParsedExpressionDetails {
    isSyntaxValid: boolean;
    functionReferences: string[];
    memberReferences: string[];
}
export interface IMapExpression {
    expression: String;
    mappings: STRING_MAP<IMapExpression>;
    parsedExpressionDetails: IParsedExpressionDetails;
    getExpression(): String;
    getMappings(): STRING_MAP<IMapExpression>;
}
export interface IMapping {
    mappings: STRING_MAP<IMapExpression>;
    getMappings(): STRING_MAP<IMapExpression>;
}
export interface IMappingFunction extends IFunctionContribution {
    getInputSchema(): any;
    getOutputSchema(): any;
    getFullyQualifiedName(): string;
    getName(): string;
    getArgs(): IFunctionArgs[];
    getArg(name: string): IFunctionArgs;
    getReturnType(): string;
}
export interface IMapFunctionsLookup {
    getFunctions(): Observable<STRING_MAP<IMappingFunction>>;
    isValidFunction(fqFunctionPath: string): boolean;
    getFunction(fqFunctionPath: string): IMappingFunction;
}
export declare enum EnumMapperErrorCodes {
    M_INVALID_IDENTIFIER = 4000,
    M_INVALID_FUNCTION = 4001,
    M_INVALID_TYPE = 4002,
    M_INVALID_SYNTAX = 4003,
}
export interface IMappingError {
    errorCode: EnumMapperErrorCodes;
    errorMsg: string;
    getErrorCode(): EnumMapperErrorCodes | number;
    getErrorMessage(): string;
    toString(): string;
}
export interface IParseLocation {
    getOffset(): number;
    getLine(): number;
    getColumn(): number;
    toString(): string;
}
export interface ITokenLocation {
    getStart(): IParseLocation;
    getEnd(): IParseLocation;
}
export interface IParseError extends IMappingError {
    getLocation(): ITokenLocation;
}
export interface IMapperResult {
    errors: IMappingError[];
    isValid(): boolean;
    getErrors(): IMappingError[];
}
export interface IMapContextValidator {
    validate(context: IMapperContext): IMapperResult;
}
export interface ISchemaProvider {
    getSchema(contextData: STRING_MAP<IAppModel | IFlow | any>): any;
}
export interface IParseToken {
    token: any;
    getType(): any;
    getId(): number;
    getValue(): string;
    getLocation(): IParseLocation;
}
export interface IParseTree {
    getToken(char_pos: number): IParseToken;
    getTree(): any;
}
export interface IParseResult extends IMapperResult {
    getParseTree(): IParseTree;
}
export interface IExpressionParser {
    parse(expression: string): IParseResult;
}
export interface IMapperContext {
    getId(): string;
    getContextData(): STRING_MAP<IAppModel | IFlow | any>;
    getMapping(): IMapping;
    getMapFunctionsProvider(): IMapFunctionsLookup;
    getMapContextValidator(): IMapContextValidator;
    getScopedOutputSchemaProvider(): ISchemaProvider;
    getContextInputSchemaProvider(): ISchemaProvider;
    getExpressionParser(): IExpressionParser;
    getParentContext(): IMapperContext;
    getChildContexts(): STRING_MAP<IMapperContext>;
    getMessagingService(): IMessaging;
}
