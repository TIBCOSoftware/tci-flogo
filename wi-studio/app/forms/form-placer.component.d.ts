import { EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldModel } from "./field-models/field.model";
import { IFormCategory } from "./providers/categories.provider";
export declare class FormPlacerComponent {
    category: IFormCategory;
    form: FormGroup;
    field: FieldModel;
    fieldValueChanged: EventEmitter<FieldModel>;
    private componentReady;
    private schema;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    modelChanged($event: any): void;
    setValue($event: any): void;
    schemaHandle(): void;
}
