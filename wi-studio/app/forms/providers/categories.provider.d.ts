import { FlowDiagramTask } from "../../../common/models/app/task.model";
import { DisplayFieldType } from "../../../index";
import { IFieldDefinition } from "../../../common/models/contrib";
export interface ITaskv2Display {
    name: string;
    visible?: boolean;
    category?: string;
    smallIcon?: string;
    largeIcon?: string;
    type?: DisplayFieldType;
    selection?: string;
    fileExtensions?: string[];
    syntax?: string;
    schema?: string;
    section?: string;
    mappable?: boolean;
    readonly?: boolean;
}
export interface IFlowDiagramTaskAttribute extends IFieldDefinition {
    name: string;
    type: any;
    value?: any;
    title?: string;
    placeholder?: string;
    required?: boolean;
    display?: ITaskv2Display;
    allowed?: string[];
}
export interface IFormCategoryField {
    field: IFieldDefinition;
    source: string;
}
export interface IFormCategory {
    title: string;
    direction: string;
    fields: IFormCategoryField[];
    visible: boolean;
}
export declare const DEFCATS: {
    configuration: {
        title: string;
    };
    input_settings: {
        title: string;
    };
    input: {
        title: string;
    };
    output_settings: {
        title: string;
    };
    output: {
        title: string;
    };
};
export declare class CategoriesProvider {
    private task;
    categories: FormCategory[];
    private categoriesTitles;
    constructor(task: FlowDiagramTask);
    private addFieldToCategory(title, field, direction);
    private getCategoryByTitle(title);
    private identifySections(field, attrName);
}
export declare class FormCategory implements IFormCategory {
    title: string;
    direction: string;
    fields: IFormCategoryField[];
    constructor(options: {
        title: string;
        direction?: string;
        fields?: IFormCategoryField[];
    });
    readonly visible: boolean;
    setDirection(direction: string): this;
    addField(fieldData: IFormCategoryField): this;
}
