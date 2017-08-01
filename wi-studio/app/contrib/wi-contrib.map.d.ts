/// <reference types="core-js" />
/// <reference types="lodash" />
import { MODULE_CONTRIBUTION } from "../../common/index";
import { IWiServiceContribution } from "../../index";
export declare class WiModuleContributionMap {
    private static id;
    private static _instance;
    private _moduleMap;
    private constructor();
    static getInstance(): WiModuleContributionMap;
    moduleMap: Map<string, MODULE_CONTRIBUTION<IWiServiceContribution>>;
}
