import { AfterViewInit } from "@angular/core";
import { ICellEditorAngularComp } from "ag-grid-angular/main";
export declare class GridCheckboxComponent implements ICellEditorAngularComp, AfterViewInit {
    private params;
    value: string;
    private cancelBeforeStart;
    input: any;
    agInit(params: any): void;
    getValue(): any;
    toggle(): void;
    ngAfterViewInit(): void;
}
