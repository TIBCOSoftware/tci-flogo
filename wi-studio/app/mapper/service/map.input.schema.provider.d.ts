import { ISchemaProvider } from "../../../common/models/mapper/map-model";
import { STRING_MAP } from "../../../common/types";
import { IAppModel } from "../../../common/models/app/app.model";
import { IFlow } from "../../../common/models/app/flows";
export declare class ContextInputSchemaProvider implements ISchemaProvider {
    private app;
    private flow;
    private node;
    private task;
    inputSchema: any;
    getSchema(contextData: STRING_MAP<IAppModel | IFlow | any>): any;
    getItemFromNode(node: any): void;
    private getInputSchema();
    private isJson(value);
}
