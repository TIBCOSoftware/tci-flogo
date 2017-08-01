import { IExpressionParser, IParseResult, EnumMapperErrorCodes, IMappingError, IParseTree, IParseToken, IParseError, IParseLocation, ITokenLocation } from "./map-model";
export declare class ParseLocation implements IParseLocation {
    private offset;
    private line;
    private column;
    static newLocation(offset: number, line: number, column: number): IParseLocation;
    constructor(offset: number, line: number, column: number);
    getOffset(): number;
    getLine(): number;
    getColumn(): number;
    toString(): string;
}
export declare class TokenLocation implements ITokenLocation {
    private start;
    private end;
    static newLocation(start: IParseLocation, end: IParseLocation): ITokenLocation;
    constructor(start: IParseLocation, end: IParseLocation);
    getStart(): IParseLocation;
    getEnd(): IParseLocation;
}
export declare class ParseError implements IParseError {
    private error;
    errorCode: EnumMapperErrorCodes;
    errorMsg: string;
    static newError(error: any): ParseError;
    constructor(error: any);
    getErrorCode(): EnumMapperErrorCodes | number;
    getErrorMessage(): string;
    getLocation(): ITokenLocation;
    toString(): string;
}
export declare class ParseTree implements IParseTree {
    private tree;
    static newTree(pTree: any): IParseTree;
    constructor(tree: any);
    getTree(): any;
    getToken(char_pos: number): IParseToken;
}
export declare class ParseResult implements IParseResult {
    private result;
    errors: IMappingError[];
    static newResult(result: any, error?: any): IParseResult;
    constructor(result: any, error?: any);
    isValid(): boolean;
    getErrors(): IMappingError[];
    getParseTree(): IParseTree;
}
export declare class ExpressionParser implements IExpressionParser {
    parse(expr: string): IParseResult;
}
