import { EventEmitter, OnChanges, QueryList, SimpleChanges, AfterViewInit } from "@angular/core";
import { PerfectScrollbarDirective as ScrollbarDirective } from "ngx-perfect-scrollbar";
import { MapperTreeNode } from "../models/mapper-treenode.model";
import { DraggingService } from "./dragging.service";
import { IconsService } from "../service/icons.service";
export declare class TreeComponent implements OnChanges, AfterViewInit {
    private draggingService;
    private iconsService;
    treeNodes: MapperTreeNode[];
    searchTerm: string;
    selected: MapperTreeNode | null;
    dragType: string;
    hover: EventEmitter<MapperTreeNode>;
    leave: EventEmitter<any>;
    select: EventEmitter<MapperTreeNode>;
    search: EventEmitter<string>;
    scrollbars: QueryList<ScrollbarDirective>;
    private selectedBranch;
    constructor(draggingService: DraggingService, iconsService: IconsService);
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    onSelect(event: {
        node: MapperTreeNode;
    }): void;
    onCategoryExpand(event: any): void;
    onMouseHover(event: any): void;
    onMouseLeave(event: any): void;
    isNodeInSelectedBranch(node: MapperTreeNode): boolean;
    onDragStart(event: any, node: any): void;
    getIcon(node: MapperTreeNode): any;
    clearSearch(): void;
    onSearchChange(term: string): void;
    private extractNodePath(node);
    private updateScrollbars();
}
