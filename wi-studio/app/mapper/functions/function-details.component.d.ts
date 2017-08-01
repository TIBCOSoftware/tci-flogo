import { QueryList, SimpleChanges } from "@angular/core";
import { PerfectScrollbarDirective as ScrollbarDirective } from "ngx-perfect-scrollbar";
import { MapperTreeNode } from "../models/mapper-treenode.model";
export declare class FunctionDetailsComponent {
    name: string;
    help: MapperTreeNode;
    scrollbars: QueryList<ScrollbarDirective>;
    removeEndLine(str: any): any;
    ngOnChanges(changes: SimpleChanges): void;
    private updateScrollbars();
}
