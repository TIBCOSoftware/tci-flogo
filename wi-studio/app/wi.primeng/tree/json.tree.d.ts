import { TreeNode } from "primeng/components/common/api";
export declare class JSONNode implements TreeNode {
    root: JSONNode | string;
    name: string;
    dataType: string;
    label?: string;
    data?: any;
    icon?: any;
    expandedIcon?: any;
    collapsedIcon?: any;
    children?: TreeNode[];
    leaf?: boolean;
    expanded?: boolean;
    type?: string;
    parent?: TreeNode;
    partialSelected?: boolean;
    styleClass?: string;
    draggable?: boolean;
    droppable?: boolean;
    selectable?: boolean;
    constructor(root: JSONNode | string, name: string, dataType: string);
    hasChildren(): boolean;
    setIcon(iconCss: string): void;
}
export declare class JsonTree extends JSONNode {
    jsonObj: any;
    constructor(jsonObj: any);
    parse(parent: JSONNode, json: any): void;
    private getMemberType(branches);
    private getBranches(json);
}
