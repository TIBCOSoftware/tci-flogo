import { Thenable, MarkedString, CancellationToken, LineRange, CompletionItem, CompletionList } from "./monaco.types";
export interface OffsetRange {
    startOffset: number;
    endOffset: number;
}
export interface Position extends monaco.IPosition {
    offset: number;
}
export interface ClientPosition {
    x: number;
    y: number;
}
export interface Hover {
    contents: MarkedString[];
    range: OffsetRange | LineRange;
}
export interface HoverProvider {
    provideHover(offset: Position, token: CancellationToken): Hover | Thenable<Hover>;
}
export interface CompletionProvider {
    provideCompletionItems(position: Position, token: CancellationToken): CompletionItem[] | Thenable<CompletionItem[]> | CompletionList | Thenable<CompletionList>;
}
export interface EditorError {
    message: string;
    location: OffsetRange;
}
