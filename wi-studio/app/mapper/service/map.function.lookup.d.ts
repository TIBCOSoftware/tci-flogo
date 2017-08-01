import { Observable } from "rxjs/Observable";
import { PaletteService } from "../../shared/services/palette.service";
import { IMapFunctionsLookup, IMappingFunction } from "../../../common/models/mapper/map-model";
import { STRING_MAP } from "../../../index";
export declare class FunctionsLookup implements IMapFunctionsLookup {
    private _paletteService;
    constructor(_paletteService: PaletteService);
    getFunctions(): Observable<STRING_MAP<IMappingFunction>>;
    isValidFunction(fqFunctionPath: string): boolean;
    getFunction(fqFunctionPath: string): IMappingFunction;
}
