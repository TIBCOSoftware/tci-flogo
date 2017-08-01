import { Observable } from "rxjs/Observable";
import { Http, Response } from "@angular/http";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
export declare class MarketooAuthService {
    private _http;
    constructor(_http: Http);
    postConnectionData(connectionsURL: string, connectionsData: any): Observable<Response>;
    updateConnectionData(connectionsData: any, connectionId: string): Observable<Response>;
    deleteConnectionData(connectionId: string): Observable<Response>;
    handleServerError(error: Response): ErrorObservable<string | Response>;
}
