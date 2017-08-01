import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";
export declare class ConnectionsService {
    private http;
    constructor(http: Http);
    getConnections(): Observable<any>;
    getConnectionsById(connectionId: string): Observable<any>;
    getConnectors(): Observable<any>;
    private handleServerError(error);
}
