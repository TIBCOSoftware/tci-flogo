import { STRING_MAP } from "../types";
export declare function flogoIDEncode(id: string): string;
export declare function flogoIDDecode(encodedId: string): string;
export declare function btoa_se(str: any): any;
export declare function atob_se(str: any): string;
export declare function convertTaskID(taskID: string): number;
export declare class Guid {
    static newGuid(): string;
}
export declare function strMapToObj<P>(strMap: STRING_MAP<P>): any;
export declare function objToStrMap<P>(obj: any): STRING_MAP<P>;
export declare function strMapToJson<P>(strMap: STRING_MAP<P>): string;
export declare function jsonStrToStrMap<P>(jsonStr: string): STRING_MAP<P>;
export declare function jsonToStrMap<P>(jsonStr: any): STRING_MAP<P>;
