import { ElementRef } from "@angular/core";
import { IFlowDiagramTask } from "../../../../common/models/app/task.model";
export declare class TaskIconProvider {
    private el;
    taskIconProvider: IFlowDiagramTask;
    private failed;
    constructor(el: ElementRef);
    ngOnInit(): void;
}
