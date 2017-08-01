export declare enum ErrorType {
    Comment = 0,
    Alert = 1,
    Code = 2,
    Payment = 3,
}
export declare class Error {
    id: string;
    type: ErrorType;
    date: Date;
    message: string;
    constructor();
}
