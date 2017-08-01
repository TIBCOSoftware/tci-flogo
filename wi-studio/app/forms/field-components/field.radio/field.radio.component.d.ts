import { FormGroup } from "@angular/forms";
import { FormFieldBaseComponent } from "../field.base/field.base.component";
import { EventEmitter } from "@angular/core";
import { FieldRadio, FieldRadioOption } from "../../field-models/field.radio.model";
export declare class FormFieldRadioComponent extends FormFieldBaseComponent {
    field: FieldRadio;
    form: FormGroup;
    valueChanged: EventEmitter<any>;
    constructor();
    modelChanged($event: FieldRadioOption): void;
    emitValue(): void;
}
