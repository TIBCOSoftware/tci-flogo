import { TreeNode } from "primeng/components/common/api";
export interface MapperTreeNode extends TreeNode {
    path?: string;
    snippet?: string;
    level?: number;
    dataType?: string;
    memberType?: string;
    isVisible?: boolean;
    isSelectable?: boolean;
}
