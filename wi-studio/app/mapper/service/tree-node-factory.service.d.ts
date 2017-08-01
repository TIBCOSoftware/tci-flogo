import { TreeNode } from "primeng/components/common/api";
import { MapperTreeNode } from "../models/mapper-treenode.model";
import { ArrayMappingInfo } from "../models/array-mapping";
export declare class TreeNodeFactoryService {
    fromJsonSchema(schema: any, visitor?: (treeNode: TreeNode, level: number, path: string) => any): MapperTreeNode[];
    applyArrayFilterToJsonSchema(schema: any, mappedArrayChain: ArrayMappingInfo[], path?: string, isInFilterPath?: boolean): any;
    fromFunctions(functionMap: any): {}[];
    fromJsonSchemaToSymbolTable(from: any, level?: number): {};
    fromFunctionsToSymbolTable(functionMap: any): {};
    private makeTreeNodes(from, visitor, params);
    private linkCurrentContextToParent(key, mappings);
    private traverseMappings(mappings, flatten?);
    flatMappings(mappings: any): any;
    private isObject(value);
}
