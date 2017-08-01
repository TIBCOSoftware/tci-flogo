import { Observable } from "../../../common/rxjs-extensions";
import { Connection, ReadyState, Request, Response, BrowserXhr, ResponseOptions, RequestMethod, Http, RequestOptionsArgs, RequestOptions, BaseRequestOptions, XSRFStrategy, ConnectionBackend } from "@angular/http";
import { XHRStreamItem } from "../../../common/services/xhr.stream.item";
export declare class XHRStreamConnection implements Connection {
    private req;
    request: Request;
    response: Observable<Response>;
    readyState: ReadyState;
    chunks: Observable<XHRStreamItem>;
    constructor(req: Request, browserXHR: BrowserXhr, baseResponseOptions?: ResponseOptions);
}
export declare class XHRStreamBackEnd implements ConnectionBackend {
    private _browserXHR;
    private _baseResponseOptions;
    private _xsrfStrategy;
    constructor(_browserXHR: BrowserXhr, _baseResponseOptions: ResponseOptions, _xsrfStrategy: XSRFStrategy);
    createConnection(request: Request): XHRStreamConnection;
}
export declare class XHRStreamHttp extends Http {
    protected backend: XHRStreamBackEnd;
    protected defaultOptions: RequestOptions;
    constructor(backend: XHRStreamBackEnd, defaultOptions: RequestOptions);
    getChunks(url: any, options?: RequestOptionsArgs): Observable<XHRStreamItem>;
    uploadContribution(url: any, options?: RequestOptionsArgs): Observable<XHRStreamItem>;
    mergeOptions(defaultOpts: BaseRequestOptions, providedOpts: RequestOptionsArgs, method: RequestMethod, url: string): RequestOptions;
    isPresent(obj: any): boolean;
}
