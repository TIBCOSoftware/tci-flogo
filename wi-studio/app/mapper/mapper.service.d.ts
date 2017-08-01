import { ReplaySubject } from "rxjs/ReplaySubject";
import "rxjs/add/observable/of";
import "rxjs/add/observable/zip";
import "rxjs/add/operator/combineLatest";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/first";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/withLatestFrom";
import { TreeNodeFactoryService } from "./service/tree-node-factory.service";
import { TreeService } from "./service/tree.service";
import { IMapperContext, ISchemaProvider, IMapFunctionsLookup, IMapExpression } from "../../common/models/mapper/map-model";
import { MapperTreeNode } from "./models/mapper-treenode.model";
export interface TreeState {
    filterTerm: string | null;
    nodes: MapperTreeNode[];
}
export interface CurrentSelection {
    node?: MapperTreeNode;
    expression?: string;
    errors?: any[];
    symbolTable?: any;
    mappings?: Mappings;
    mappingKey?: string;
    mapRelativeTo?: string;
}
export interface Mappings {
    [path: string]: IMapExpression;
}
export interface MapperState {
    context: IMapperContext;
    providers?: {
        outputsProvider: ISchemaProvider;
        functionsProvider: IMapFunctionsLookup;
    };
    hasMappings: boolean;
    mappings: Mappings;
    currentSelection?: CurrentSelection;
    inputs: TreeState;
    outputs: TreeState;
    functions: TreeState;
}
export interface OutputContext {
    tree: MapperTreeNode[];
    mappings: Mappings;
    mappingKey: string;
    mapRelativeTo: string;
    symbolTable: any;
}
export declare class MapperService {
    private nodeFactory;
    private treeService;
    state: ReplaySubject<MapperState>;
    private contextSrc;
    private updatesSrc;
    private filterInputsSrc;
    private filterOutputsSrc;
    private filterFunctionsSrc;
    private selectInputSrc;
    private expressionChangeSrc;
    constructor(nodeFactory: TreeNodeFactoryService, treeService: TreeService);
    setContext(context: IMapperContext): void;
    selectInput(node: MapperTreeNode): void;
    filterInputs(filterTerm: string): void;
    filterOutputs(filterTerm: string): void;
    filterFunctions(filterTerm: string): void;
    expressionChange(expression: string): void;
    private setupSelectInput();
    private setupContextChange();
    private setupExpressionChange();
    private updateMapping(mappings, path, expression, parsedExpressionDetails?);
    private hasMappings(mappings);
    private applyTreeFilter(filterTerm, treeState, currentSelection?);
    private parseExpression(currentSelection, relativeMapsTo?);
    private makeOutputContext(selectedNode, outputSchemas, allMappings);
    private extractLinkedOutputArrayPaths(arrayNodes, mappings);
    private getSubMappings(arrayNodes, mappings);
    private processArrayMapExpression(expression);
    private makeRelativeNodePath(childNode, parentNode);
    private getInitialState();
}
