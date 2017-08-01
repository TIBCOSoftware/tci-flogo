import { PipeTransform } from "@angular/core";
export declare class SearchFilterPipe implements PipeTransform {
    transform(items: any[], field: string, value: string): any[];
}
