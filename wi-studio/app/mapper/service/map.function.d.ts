import { IFunctionArgs } from "../../../common/models/contrib";
import { IMappingFunction } from "../../../common/models/mapper/map-model";
export declare class MappingFunction implements IMappingFunction {
    name: string;
    category?: string;
    args: IFunctionArgs[];
    return: string;
    getInputSchema(): any;
    getOutputSchema(): any;
    getFullyQualifiedName(): string;
    getName(): string;
    getArgs(): IFunctionArgs[];
    getArg(name: string): IFunctionArgs;
    getReturnType(): string;
}
