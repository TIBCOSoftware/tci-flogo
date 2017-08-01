import { IValidationError } from "../../../common/models/validation";
import { TCIServices } from "./../services/TCIServices";
import { Observable } from "rxjs/Observable";
export declare class ErrorsService {
    private tciService;
    randomGeneration: boolean;
    errors$: Observable<IValidationError[]>;
    private errorsSubject;
    private errors;
    private randomSub;
    constructor(tciService: TCIServices);
    startRandomGeneration(): void;
    stopRandomGeneration(): void;
    addError(error: IValidationError): void;
    clearErrors(): void;
    createRandomError(): IValidationError;
    getErrorMsgByField(_appId: string, _flowId: string, _taskId: string, _infoFieldName: string): string;
}
