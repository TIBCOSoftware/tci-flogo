import { OnInit } from "@angular/core";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/takeUntil";
import { EditorService } from "../editor/editor.service";
import { MapperTreeNode } from "../models/mapper-treenode.model";
import { MapperService } from "../mapper.service";
export declare class FunctionsComponent implements OnInit {
    private mapperService;
    private editorService;
    help: MapperTreeNode;
    name: string;
    functions: MapperTreeNode[];
    filterTerm: string;
    dragType: string;
    private ngDestroy;
    constructor(mapperService: MapperService, editorService: EditorService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onSelect(node: MapperTreeNode): void;
    onHover(node: MapperTreeNode): void;
    onSearch(searchTerm: string): void;
}
