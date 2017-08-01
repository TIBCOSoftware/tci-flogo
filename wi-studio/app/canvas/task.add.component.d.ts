import { ActivatedRoute } from "@angular/router";
import { CanvasService } from "./canvas.service";
import { PaletteService } from "./../shared/services/palette.service";
export declare class TaskAdd {
    private service;
    private paletteService;
    private route;
    activityCatalogReady: boolean;
    activityCatalog: {};
    selectedService: string;
    mainSectionName: string;
    constructor(service: CanvasService, paletteService: PaletteService, route: ActivatedRoute);
    ngOnInit(): void;
    getActivities(): void;
    buildSections(list: any): void;
    initializeServiceOverlay(): void;
    selectService(service: string): void;
    readonly services: Array<string>;
    addTask(activity: any): void;
    private getNodeParents(diagram, node);
    private defaultTaskIcon(taskIconError);
}
