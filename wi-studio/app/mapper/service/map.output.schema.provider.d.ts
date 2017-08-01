import { IFlow } from "../../../common/models/app/flows";
import { IAppModel } from "../../../common/models/app/app.model";
import { ISchemaProvider } from "../../../common/models/mapper/map-model";
import { STRING_MAP } from "../../../common/types";
export declare class ScopedOutputSchemaProvider implements ISchemaProvider {
    private app;
    private flow;
    private node;
    private task;
    outputSchema: any;
    getSchema(contextData: STRING_MAP<IAppModel | IFlow | any>): any;
    traverseParentNodes(node: any): void;
    private getParentItem(id);
    private getOutputsSchema();
    private isJson(value);
}
