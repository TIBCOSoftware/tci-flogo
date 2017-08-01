export declare class ContributionHelper {
    static jsonToSchema(json: any[]): any;
    static extractJsonFromPath(path: string): string;
    static validateSchema(value: string): {
        error: boolean;
        msg: any;
    };
}
