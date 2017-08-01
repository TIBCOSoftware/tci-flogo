import { STRING_MAP } from "../types";
import { Http, Response } from "@angular/http";
import { Observable } from "../rxjs-extensions";
export declare const HTTP_METHOD: {
    GET: "GET";
    POST: "POST";
    PUT: "PUT";
    DELETE: "DELETE";
};
export declare type HTTP_METHOD = keyof typeof HTTP_METHOD;
export declare class CORSUtils {
    private http;
    private remoteUrl;
    private queryParams;
    private headers;
    private method;
    private data;
    static createRequest(http: Http, remoteUrl: string): CORSUtils;
    constructor(http: Http, remoteUrl: string);
    addQueryParams(param: string, value: string): CORSUtils;
    addHeader(header: string, value: string): CORSUtils;
    addMethod(method: HTTP_METHOD): CORSUtils;
    addBody(data: any): CORSUtils;
    send(): Observable<Response>;
    buildUrl(url: string, parameters: STRING_MAP<string>): string;
}
