import { OnChanges, SimpleChanges } from "@angular/core";
import { IconsService } from "./service/icons.service";
import { MapperTreeNode } from "./models/mapper-treenode.model";
export declare class BreadcrumbsComponent implements OnChanges {
    private iconsService;
    inputNode: MapperTreeNode;
    branch: MapperTreeNode[];
    constructor(iconsService: IconsService);
    ngOnChanges(changes: SimpleChanges): void;
    getIcon(node: MapperTreeNode): any;
    private extractBranch(node);
}
