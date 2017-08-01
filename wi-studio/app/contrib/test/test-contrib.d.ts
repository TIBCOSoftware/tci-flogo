import { Observable } from "../../../common/rxjs-extensions";
import { IActivityContribution, IContributionContext } from "./../../../common/models/contrib";
import { AbstractContribFieldProvider, AbstractContribValidationProvider } from "../wi-contrib";
import { IValidationResult } from "../../../common/models/validation";
export declare class Field1Provider extends AbstractContribFieldProvider {
    getFieldValue(context: IActivityContribution): Observable<string[]>;
}
export declare class Field1ValidationProvider extends AbstractContribValidationProvider {
    validate(context: IContributionContext): Observable<IValidationResult>;
}
export declare class TestContribService {
}
