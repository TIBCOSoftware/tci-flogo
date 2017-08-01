export declare enum FLOW_DIAGRAM_NODE_TYPE {
    NODE_PADDING = 0,
    NODE_HOLDER = 1,
    NODE_ADD = 2,
    NODE_ROOT = 3,
    NODE_ROOT_NEW = 4,
    NODE = 5,
    NODE_BRANCH = 6,
    NODE_LINK = 7,
    NODE_SUB_PROC = 8,
    NODE_LOOP = 9,
    NODE_ROOT_ERROR_NEW = 10,
}
export declare enum FLOW_DIAGRAM_FLOW_LINK_TYPE {
    DEFAULT = 0,
    BRANCH = 1,
    LABELED = 2,
}
export declare enum FLOW_DIAGRAM_NODE_MENU_ITEM_TYPE {
    ADD_BRANCH = 0,
    SELECT_TRANSFORM = 1,
    DELETE = 2,
}
export declare const FLOW_DIAGRAM_DEBUG: boolean;
export declare const FLOW_DIAGRAM_VERBOSE: boolean;
export declare enum TASK_TYPE {
    TASK_ROOT = 0,
    TASK = 1,
    TASK_BRANCH = 2,
    TASK_SUB_PROC = 3,
    TASK_LOOP = 4,
}
export declare enum PROCESS_TYPE {
    DEFAULT = 1,
}
export declare enum TASK_ATTRIBUTE_TYPE {
    STRING = 0,
    INTEGER = 1,
    NUMBER = 2,
    BOOLEAN = 3,
    OBJECT = 4,
    ARRAY = 5,
    PARAMS = 6,
    ANY = 7,
    COMPLEX_OBJECT = 8,
    SCHEMA = 9,
    FILE = 10,
    PASSWORD = 11,
}
export declare const PROCESS_MODELS: {
    "DEFAULT": string;
};
export declare const ERROR_ROOT_NAME = "__error-trigger";
export declare const DEFAULT_VALUES_OF_TYPES: {
    [key: number]: any;
};
export declare const AUTOMAPPING_FORMAT: RegExp;
export declare function getDefaultValue(type: TASK_ATTRIBUTE_TYPE): any;
export declare const APP_MESSAGING_VALUES: {
    FLOW_CHANGED: string;
    ADD_TASK: string;
    ADD_TASK_DONE: string;
    UNSELECTED_TASK: string;
    TASK_DELETED: string;
    TASK_SELECTED: string;
    CLOSE_PALETTE: string;
    OPEN_TASK_PROPERTIES: string;
    DIAGRAM_FLOW_RENDERED: string;
    TASK_NAME_UPDATED: string;
    UPDATE_MAPPING: string;
    BRANCH_SELECTED: string;
    NODE_ADD: string;
    TASK_FIELD_CHANGED: string;
};
export declare const SUPPORTED_REST_VERBS: string[];
export declare enum EnumValidationContext {
    APPLICATION = 0,
    FLOW = 1,
    ACTIVITY = 2,
    TRIGGER = 3,
    CONNECTOR = 4,
    SECTION = 5,
    NODE = 6,
    FLOW_IS_MAIN = 7,
}
export declare const DEFAULT_TASK_CATEGORY = "General";
