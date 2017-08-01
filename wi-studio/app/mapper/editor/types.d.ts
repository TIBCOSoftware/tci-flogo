export interface InsertEvent {
    text: string;
    replaceTokenAtPosition?: {
        x: number;
        y: number;
    };
}
export interface EditorContext {
    expression: string;
}
