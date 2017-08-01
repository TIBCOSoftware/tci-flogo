import { Injector } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { WiServiceHandlerContribution, IValidationResult, IActivityContribution, IActionResult } from "../../wi-contrib";
export declare class RestContributionHandler extends WiServiceHandlerContribution {
    constructor(injector: Injector, http: Http);
    value: (fieldName: string, context: IActivityContribution) => any;
    validate: (fieldName: string, context: IActivityContribution) => IValidationResult | Observable<IValidationResult>;
    myValidator(fieldName: string, context: IActivityContribution): Observable<IValidationResult> | IValidationResult;
    xvalidate: (fieldName: string, context: IActivityContribution) => (Observable<IValidationResult> | IValidationResult);
    action: (actionId: string, context: IActivityContribution) => IActionResult | Observable<IActionResult>;
}
