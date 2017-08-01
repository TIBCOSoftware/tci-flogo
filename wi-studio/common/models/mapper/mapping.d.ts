import { IMapping, IMapExpression } from "./map-model";
import { STRING_MAP } from "../../types";
export declare class Mapping implements IMapping {
    mappings: STRING_MAP<IMapExpression>;
    getMappings(): STRING_MAP<IMapExpression>;
}
