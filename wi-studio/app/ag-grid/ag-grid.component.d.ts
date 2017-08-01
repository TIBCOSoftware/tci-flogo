import { EventEmitter } from "@angular/core";
import { GridOptions } from "ag-grid/main";
export declare class AgGridComponent {
    gridOptions: GridOptions;
    onChange: EventEmitter<{}>;
    private onCellValueChanged($event);
    private onCellEditingStop();
    private addHeader();
}
