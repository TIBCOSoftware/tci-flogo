export declare const EXPRESSION_FOR_EACH: RegExp;
export interface ArrayMappingInfo {
    isForEach: boolean;
    params: string[];
    node?: any;
    fullLinkedPath?: string;
}
export declare class ArrayMappingHelper {
    static processExpressionForEach(expression: string): ArrayMappingInfo;
    static applyExpressionForEach(variable: string): string;
}
