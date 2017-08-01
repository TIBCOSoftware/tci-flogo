import { ModuleWithProviders } from "@angular/core";
export interface ModuleConfig {
    pathToMonacoSrc?: string;
}
export declare class MonacoEditorModule {
    static forRoot(config?: ModuleConfig): ModuleWithProviders;
}
