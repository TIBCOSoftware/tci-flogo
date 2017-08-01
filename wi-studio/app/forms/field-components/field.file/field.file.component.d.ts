import { FormFieldBaseComponent } from "../field.base/field.base.component";
import { EventEmitter, OnInit } from "@angular/core";
import { FieldFile } from "../../field-models/field.file.model";
import { CanvasService } from "../../../canvas/canvas.service";
export declare class FormFieldFileComponent extends FormFieldBaseComponent implements OnInit {
    private canvasService;
    field: FieldFile;
    valueChanged: EventEmitter<any>;
    file: string;
    constructor(canvasService: CanvasService);
    ngOnInit(): void;
    changed(event: EventTarget): void;
    getBase64(file: any): void;
    getExtensions(): string;
    emitValue(): void;
}
