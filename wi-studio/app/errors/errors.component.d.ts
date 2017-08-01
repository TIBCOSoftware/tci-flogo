import { IValidationError } from "../../common/models/validation";
import { OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { ErrorsService } from "../shared/errors/index";
import { Router, ActivatedRoute } from "@angular/router";
import { CanvasService } from "./../canvas/canvas.service";
export declare class ErrorsComponent implements OnInit, OnDestroy {
    private errorService;
    private _router;
    private _activeRoute;
    private _canvasService;
    expanded: boolean;
    expandedState: string;
    errors: IValidationError[];
    errorSub: Subscription;
    sandboxId: string;
    constructor(errorService: ErrorsService, _router: Router, _activeRoute: ActivatedRoute, _canvasService: CanvasService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    toggleErrorPanel(): void;
    errorSelected(error: any): void;
}
