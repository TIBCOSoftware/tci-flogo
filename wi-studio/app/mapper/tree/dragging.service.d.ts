export declare const TYPE_PARAM_FUNCTION = "mapper-param-function";
export declare const TYPE_PARAM_OUTPUT = "mapper-param-output";
export declare class DraggingService {
    type: string;
    data: any;
    dragStart(type: string, data: any): void;
    dragEnd(): void;
    accepts(type: string): boolean;
    getType(): string;
    getData(): any;
}
