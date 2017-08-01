export declare class DndDirective {
    private hiddenFileInput;
    private filesChangeEmiter;
    private background;
    constructor();
    onDragOver(evt: any): void;
    onDragLeave(evt: any): void;
    onClick(evt: any): void;
    onDrop(evt: any): void;
    createHiddenInput(): void;
}
