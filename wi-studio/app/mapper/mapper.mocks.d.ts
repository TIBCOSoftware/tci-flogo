export declare const inputs: {
    "schema": string;
    "type": string;
    "properties": {
        "code": {
            "type": string;
        };
        "result": {
            "type": string;
            "properties": {
                "message": {
                    "type": string;
                };
            };
        };
        "subObject": {
            "type": string;
            "properties": {
                "message": {
                    "type": string;
                };
                "code": {
                    "type": string;
                };
                "arr": {
                    "type": string;
                    "items": {
                        "type": string;
                        "properties": {
                            "prop": {
                                "type": string;
                            };
                        };
                    };
                };
            };
        };
        "other": {
            "type": string;
            "items": {
                "type": string;
                "properties": {
                    "id": {
                        "type": string;
                    };
                    "name": {
                        "type": string;
                    };
                };
            };
        };
    };
};
export declare const outputs: {
    "schema": string;
    "type": string;
    "properties": {
        "log": {
            "type": string;
            "properties": {
                "message": {
                    "type": string;
                };
            };
        };
        "reply": {
            "type": string;
            "properties": {
                "message": {
                    "type": string;
                };
            };
        };
        "restinvoke": {
            "type": string;
            "properties": {
                "error": {
                    "type": string;
                };
                "statusCode": {
                    "type": string;
                };
                "subObject": {
                    "type": string;
                    "properties": {
                        "message": {
                            "type": string;
                        };
                        "code": {
                            "type": string;
                        };
                    };
                };
                "other": {
                    "type": string;
                    "items": {
                        "type": string;
                        "properties": {
                            "id": {
                                "type": string;
                            };
                            "name": {
                                "type": string;
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare const mappings: {
    "result": {
        "expression": string;
    };
    "subObject.message": {
        "expression": string;
    };
};
