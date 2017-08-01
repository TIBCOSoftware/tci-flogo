import { EventEmitter } from "@angular/core";
import { TreeNode } from "primeng/components/common/api";
export declare class WITreeComponent {
    treeValue: TreeNode[];
    mouseOver: EventEmitter<{}>;
    doubleClick: EventEmitter<{}>;
    over(node: any): void;
    dblClick(node: any): void;
}
