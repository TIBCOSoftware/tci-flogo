import { FieldModel } from "./field.model";
import { IFieldDefinition } from "../../../common/models/contrib";
export declare class FieldTextbox extends FieldModel {
    controlType: string;
    type: string;
    constructor(fieldData: IFieldDefinition);
    controlValidation(): void;
    private validatePathSlash();
    private validateInt();
}
