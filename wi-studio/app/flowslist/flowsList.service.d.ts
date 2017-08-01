import { AppModel } from "../../common/models/app/app.model";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "../../common/rxjs-extensions";
export declare class FlowsListService {
    private http;
    httpHeaders: Headers;
    httpOptions: RequestOptions;
    constructor(http: Http);
    getFlowsList(id: string): Observable<any>;
    putApp(app: AppModel): Observable<any>;
    getMetaData(id: string): Observable<any>;
    createApp(app: AppModel): Observable<any>;
    pushApp(app: AppModel): Observable<any>;
}
