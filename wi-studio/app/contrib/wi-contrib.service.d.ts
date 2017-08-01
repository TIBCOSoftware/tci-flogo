import { ComponentFactoryResolver, SystemJsNgModuleLoader, Compiler, Injector } from "@angular/core";
import { Http } from "@angular/http";
import { WiModuleContributionMap } from "./wi-contrib.map";
import { IWiServiceContribution } from "../../common/models/contrib";
export declare class ContribService {
    private _injector;
    private http;
    private resolver;
    private loader;
    private compiler;
    config: WiModuleContributionMap;
    constructor(_injector: Injector, http: Http, resolver: ComponentFactoryResolver, loader: SystemJsNgModuleLoader, compiler: Compiler);
    init(http: Http): void;
    private getModuleFileName(files);
    getContributionModules(): any;
    getContributionService(name: string): IWiServiceContribution;
}
