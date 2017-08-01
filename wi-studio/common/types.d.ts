/// <reference types="core-js" />
/// <reference types="lodash" />
export declare type STRING_MAP<P> = Map<string, P>;
export declare type ENUM_MAP<E, P> = Map<E, P>;
export declare function strEnum<T extends string>(o: Array<T>): {
    [K in T]: K;
};
export declare type ARRAY_STR_ARRAY = [string[]];
export declare const JSON_TYPE: {
    any: "any";
    array: "array";
    boolean: "boolean";
    integer: "integer";
    number: "number";
    object: "object";
    string: "string";
};
export declare type JSON_TYPE = keyof typeof JSON_TYPE;
export declare const JSON_FORMAT: {
    object: "object";
    int32: "int32";
    uint32: "uint32";
    double: "double";
    float: "float";
    byte: "byte";
    date: "date";
    date_time: "date_time";
    int64: "int64";
    uint64: "uint64";
    email: "email";
    hostname: "hostname";
    ipv4: "ipv4";
    ipv6: "ipv6";
    uri: "uri";
    uri_reference: "uri_reference";
    uri_template: "uri_template";
    json_pointer: "json_pointer";
};
export declare type JSON_FORMAT = keyof typeof JSON_FORMAT;
export declare const GOLANG_TYPE: {
    any: "any";
    array: "array";
    boolean: "boolean";
    integer: "integer";
    number: "number";
    object: "object";
    string: "string";
    complex_object: "complex_object";
};
export declare type GOLANG_TYPE = keyof typeof GOLANG_TYPE;
export interface JSONSCHEMATypeInfo {
    type: JSON_TYPE;
    format?: JSON_FORMAT;
    pattern?: string;
    min?: number;
    max?: number;
}
export declare type JSON_SCHEMA_TYPE = JSONSCHEMATypeInfo;
export declare function RTtoJSONTypeMap(rtType: GOLANG_TYPE): JSON_SCHEMA_TYPE;
