import { IMapExpression, IParsedExpressionDetails } from "./../../../common/models/mapper/map-model";
import { STRING_MAP } from "../../../common/index";
export declare class MapExpression implements IMapExpression {
    expression: String;
    mappings: STRING_MAP<IMapExpression>;
    parsedExpressionDetails: IParsedExpressionDetails;
    getExpression(): String;
    getMappings(): STRING_MAP<IMapExpression>;
}
