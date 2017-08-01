import { OnDestroy, OnInit } from "@angular/core";
import { MapperTreeNode } from "./models/mapper-treenode.model";
import { MapperService } from "./mapper.service";
import "rxjs/add/operator/do";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/map";
import "rxjs/add/operator/share";
export declare class InputListComponent implements OnInit, OnDestroy {
    private mapperService;
    treeNodes: MapperTreeNode[];
    selectedInput: MapperTreeNode;
    filterTerm: string;
    private ngUnsubscribe;
    constructor(mapperService: MapperService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onInputSelect(node: MapperTreeNode): void;
    onInputSearch(searchTerm: string): void;
}
