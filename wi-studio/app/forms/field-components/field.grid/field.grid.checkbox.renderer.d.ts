import { ICellRendererAngularComp } from "ag-grid-angular/main";
export declare class CheckboxRendererComponent implements ICellRendererAngularComp {
    private params;
    checkboxValue: string;
    agInit(params: any): void;
    refresh(params: any): void;
    private checkBoxValue(params);
}
