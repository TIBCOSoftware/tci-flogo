import { ContribService } from "../../contrib/wi-contrib.service";
import { Observable } from "../../../common/rxjs-extensions";
import { Http, Response } from "@angular/http";
import { AppModel, IPostApp } from "../../../common/models/app/app.model";
import { AppMessaging } from "../../../common/services/messaging";
export declare class FlowService {
    private validationService;
    private http;
    private contribService;
    _msg: AppMessaging;
    constructor(validationService: any, http: Http, contribService: ContribService);
    saveApp(app: AppModel, skipValidations?: boolean): void;
    getAppDetails(id: any): Observable<Response>;
    getConfiguration(): Observable<Response>;
    postApp(data: IPostApp): Observable<Response>;
    private handleServerError(error);
}
