import { MapperTreeNode } from "../models/mapper-treenode.model";
export declare class TreeService {
    selectNode(nodes: MapperTreeNode[], selectedPath: string): MapperTreeNode[];
    traverseChildren(node: MapperTreeNode, onChild: (node: MapperTreeNode) => void): void;
    applyFilter(nodes: MapperTreeNode[], searchText?: string, selectedPath?: string): MapperTreeNode[];
    extractArrayParents(node: MapperTreeNode): MapperTreeNode[];
    updateTreeMappingStatus(node: MapperTreeNode): boolean;
    propagateMappingStatusToParents(node: MapperTreeNode, callingChildHasMapping?: boolean): void;
    private applyFilterToNode(node, matchDiscriminator, selectedPath?);
    private isMappedNode(node);
    private updateStyleClass(node, classMap);
    private visitChildren(node, visitor);
    private traverseParents(node, onParent);
}
