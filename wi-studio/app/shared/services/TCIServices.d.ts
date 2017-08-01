import { AppMessaging } from "../../../common/services/messaging";
export declare class TCIServices {
    _window: any;
    constructor();
    readonly SandboxesSerivce: any;
    readonly ApplicationService: any;
    readonly DomainServiceApps: any;
    readonly AppMessaging: AppMessaging;
    getService(name: string): any;
}
