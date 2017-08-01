import { IMapContextValidator, IMapperResult, IMapperContext } from "./../../../common/models/mapper/map-model";
export declare class MapContextValidator implements IMapContextValidator {
    validate(context: IMapperContext): IMapperResult;
}
