import { IFieldDefinition } from "../../../common/models/contrib";
export declare class FieldModel {
    name: string;
    displayName: string;
    description: string;
    type: string;
    controlType: string;
    taskField: IFieldDefinition;
    errorMsgs: string[];
    constructor(options: IFieldDefinition);
    private setControlType();
    value: any;
    readonly visible: boolean;
    readonly readonly: boolean;
    readonly valid: boolean;
    readonly hasErrors: boolean;
    private getBoolean(arg);
    hasValue(): boolean;
    controlValidation(): void;
    validate(): void;
    valueAttribute(): {
        inRoot: boolean;
        value: any;
    };
}
