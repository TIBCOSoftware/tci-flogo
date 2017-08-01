import { ScopedOutputSchemaProvider } from "../../../mapper/service/map.output.schema.provider";
import { ContextInputSchemaProvider } from "../../../mapper/service/map.input.schema.provider";
import { TCIServices } from "../TCIServices";
import { ContribService } from "../../../contrib/wi-contrib.service";
import { IValidationContext } from "../../../../common/models/vrules/validationrule";
import { IValidationResult } from "../../../../common/models/validation";
import { Observable } from "../../../../common/rxjs-extensions";
export declare class ValidationService {
    private tciService;
    private inputProvider;
    private outputProvider;
    private static id;
    errors: IValidationResult[];
    constructor(tciService: TCIServices, inputProvider: ContextInputSchemaProvider, outputProvider: ScopedOutputSchemaProvider);
    getAllErrors(): IValidationResult[];
    start(context: IValidationContext, contribService: ContribService): Observable<IValidationResult[]>;
}
