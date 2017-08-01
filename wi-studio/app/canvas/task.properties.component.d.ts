import { ActivatedRoute } from "@angular/router";
import { CanvasService } from "../canvas/canvas.service";
import { AppModel } from "../../common/models/app/app.model";
import { Flow } from "../../common/models/app/flows";
import { FlowDiagramTask } from "../../common/models/app/task.model";
export declare class TaskPropertiesComponent {
    private canvasService;
    private route;
    app: AppModel;
    flow: Flow;
    task: FlowDiagramTask;
    subscriptionsDone: boolean;
    isAlive: boolean;
    taskTitle: string;
    taskTitleHasError: boolean;
    taskTitleErrorMsg: string;
    constructor(canvasService: CanvasService, route: ActivatedRoute);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    setTaskUtils(): void;
    setTask(task: any): void;
    setAppData(): void;
    taskFieldValueChanged($event: AppModel): void;
}
