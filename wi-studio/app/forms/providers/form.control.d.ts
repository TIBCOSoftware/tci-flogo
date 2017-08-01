import { FormGroup } from "@angular/forms";
import { IFormCategory } from "../providers/categories.provider";
import { FieldModel } from "../field-models/field.model";
export interface FieldsCollection {
    [key: string]: FieldModel[];
}
export declare class FormControlGenerator {
    private categories;
    categoriesGroup: FormGroup;
    fieldsCollection: FieldsCollection;
    constructor(categories: IFormCategory[]);
    private toFormGroup();
    private fieldModel(field);
}
