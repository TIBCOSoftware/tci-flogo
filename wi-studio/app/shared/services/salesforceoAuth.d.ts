import { Observable } from "rxjs/Observable";
import { Http, Response } from "@angular/http";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
export declare class SalesforceoAuthService {
    private _http;
    constructor(_http: Http);
    getoAuthUrl(oAuthURL: string): Observable<Response>;
    getClientID(configUri: string, oAuthURL: string): Observable<Response>;
    postConnectionData(connectionsURL: string, connectionsData: any): Observable<Response>;
    updateConnectionData(connectionsData: any, connectionId: string): Observable<Response>;
    deleteConnectionData(connectionId: string): Observable<Response>;
    handleServerError(error: Response): ErrorObservable<string | Response>;
}
