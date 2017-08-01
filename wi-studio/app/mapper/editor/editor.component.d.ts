import { OnInit, OnDestroy } from "@angular/core";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/do";
import "rxjs/add/operator/takeUntil";
import { MonacoEditorComponent } from "../../monaco-editor/monaco-editor.component";
import { EditorService } from "./editor.service";
export declare class EditorComponent implements OnInit, OnDestroy {
    private editorService;
    editor: MonacoEditorComponent;
    expression: string;
    private ngDestroy;
    constructor(editorService: EditorService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
