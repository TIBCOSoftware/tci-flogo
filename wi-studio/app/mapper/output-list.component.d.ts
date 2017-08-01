import { EventEmitter, OnInit, OnDestroy } from "@angular/core";
import { MapperTreeNode } from "./models/mapper-treenode.model";
import { MapperService } from "./mapper.service";
import { EditorService } from "./editor/editor.service";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/takeUntil";
export declare class OutputListComponent implements OnInit, OnDestroy {
    private mapperService;
    private editorService;
    treeNodes: MapperTreeNode[];
    filterTerm: string;
    dragType: string;
    selectNode: EventEmitter<MapperTreeNode>;
    private ngDestroy;
    constructor(mapperService: MapperService, editorService: EditorService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onOutputSelect(node: MapperTreeNode): void;
    onSearchChange(searchTerm: string): void;
}
