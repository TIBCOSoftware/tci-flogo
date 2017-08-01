import { Observable } from "rxjs/Observable";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { Http } from "@angular/http";
import { XHRStreamHttp } from "../shared/services/xhrstream";
import { XHRStreamItem } from "../../common/services/xhrstream.item";
export declare class UploadService {
    private http;
    private httpStream;
    progress$: Observable<any>;
    progressObserver: ReplaySubject<any>;
    progress: number;
    constructor(http: Http, httpStream: XHRStreamHttp);
    uploadContribution(files: File[]): Observable<XHRStreamItem>;
    compile(category: string): Observable<any>;
}
