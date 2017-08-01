import { Observable } from "rxjs/Observable";
import { Http, Response } from "@angular/http";
export declare class PaletteService {
    private http;
    constructor(http: Http);
    getSchemasFromServer(): Observable<any>;
    getContributionFunctionsFromServer(): Observable<any>;
    getBuisinessObjects(connectionUrl: string, connectionId: string): Observable<any>;
    handleServerError(error: Response): Observable<string | Response>;
}
