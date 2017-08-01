import { Observable } from "../../../common/rxjs-extensions";
import { XHRStreamHttp } from "./xhrstream";
import { XHRStreamItem } from "../../../common/services/xhr.stream.item";
export declare class XHRStreamService {
    private http;
    private itemsUrl;
    constructor(http: XHRStreamHttp);
    getItem(): Observable<XHRStreamItem>;
}
