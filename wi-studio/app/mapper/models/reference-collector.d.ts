import { IReferenceCollector, PathPart } from "../../../common/models/mapper/expr-visitor";
export declare class ReferenceCollector implements IReferenceCollector {
    replaceRelativePathsWith: string;
    functions: any[];
    memberAccess: any[];
    constructor(replaceRelativePathsWith?: string);
    addFunctionReference(func: PathPart[]): void;
    addMemberReference(member: PathPart[]): void;
    getFunctionReferences(): any[];
    getMemberReferences(): any[];
    private processPath(parts);
}
