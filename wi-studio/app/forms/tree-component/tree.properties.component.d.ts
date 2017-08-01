import { OnInit } from "@angular/core";
import { TreeNode } from "primeng/components/common/api";
export declare class TreePropertiesComponent implements OnInit {
    task: any;
    ioItemToMatch: any;
    errorsFound: boolean;
    trees: TreeNode[];
    ngOnInit(): void;
    private getTreesModel();
    private getTreesIOProperties(_ioProperties);
    private addPropertyTree(trees, _treeValue, _ioProperty);
    private getTreeValue(_ioProperty);
    private getTreeRegularValue(_ioProperty);
    private isComplexObject(_ioProperty);
    private matchToCurrentIOItem(_ioProperty);
    private isJson(value);
}
