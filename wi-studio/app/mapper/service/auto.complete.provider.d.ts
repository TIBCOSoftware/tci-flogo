import { Observable } from "rxjs/Observable";
import { TreeNodeFactoryService } from "./tree-node-factory.service";
import { IMapperContext, IMappingFunction } from "./../../../common/models/mapper/map-model";
import { STRING_MAP } from "../../../common/types";
export declare class AutoCompleteProvider {
    private nodeFactory;
    constructor(nodeFactory: TreeNodeFactoryService);
    getRecommendations(context: IMapperContext, editorContent: string, offset: number): Observable<any>;
    getOutputSchema(context: IMapperContext): Observable<any>;
    getFunctionsData(context: IMapperContext): Observable<STRING_MAP<IMappingFunction>>;
}
