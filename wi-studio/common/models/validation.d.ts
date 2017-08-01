import { STRING_MAP } from "../types";
export interface IValidationError {
    errorCode: string;
    errorMsg: string;
    context?: STRING_MAP<string>;
    getErrorCode(): string;
    getErrorMessage(): string;
    toString(): string;
    setContext(context: STRING_MAP<string>): any;
}
export declare class ValidationError implements IValidationError {
    errorCode: string;
    errorMsg: string;
    context: STRING_MAP<string>;
    static newError(errorCode: string, errorMsg: string): IValidationError;
    constructor(errorCode: string, errorMsg: string, context?: STRING_MAP<string>);
    getErrorCode(): string;
    getErrorMessage(): string;
    toString(): string;
    setContext(context: STRING_MAP<string>): void;
}
export declare enum EnumValidationState {
    WI_READONLY = 2,
    WI_VISIBLE = 4,
    WI_VALID = 8,
}
export interface IValidationResult {
    state: EnumValidationState | number;
    errors: IValidationError[];
    isReadOnly(): boolean;
    isVisible(): boolean;
    isValid(): boolean;
    setReadOnly(res: boolean): IValidationResult;
    setVisible(res: boolean): IValidationResult;
    setValid(res: boolean): IValidationResult;
    setError(errorCode: string, errorMessage: string): IValidationResult;
    getErrors(): IValidationError[];
}
export declare class ValidationResult implements IValidationResult {
    state: EnumValidationState | number;
    errors: IValidationError[];
    static newValidationResult(errors?: IValidationError | IValidationError[]): IValidationResult;
    constructor(errors?: IValidationError | IValidationError[]);
    isReadOnly(): boolean;
    isVisible(): boolean;
    isValid(): boolean;
    setReadOnly(res: boolean): IValidationResult;
    setVisible(res: boolean): IValidationResult;
    setValid(res: boolean): IValidationResult;
    setError(errorCode: string, errorMessage: string): IValidationResult;
    getErrors(): IValidationError[];
}
