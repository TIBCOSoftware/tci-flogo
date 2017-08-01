import { UploadService } from "./upload.service";
import { Router } from "@angular/router";
export declare class UploadComponent {
    private uploadService;
    private route;
    display: boolean;
    fileList: any;
    placeholder: boolean;
    invalidFiles: any;
    validation: {
        hasGo: boolean;
        hasTs: boolean;
        hasModule: boolean;
        hasJson: boolean;
        isZip: boolean;
        valid: boolean;
    };
    isValid: boolean;
    progress: number;
    status: string;
    result: any;
    messages: any[];
    constructor(uploadService: UploadService, route: Router);
    uploadFiles(): void;
    compileAndUploadFiles(): void;
    onFilesChange(fileList: Array<File>): void;
}
